import { Request, Response, NextFunction } from 'express';
import { Stage, Lead, sequelize } from '../models/index.js';
import { CreateStageInput, UpdateStageInput, ReorderStagesInput } from '../schemas/stage.schema.js';

export const getStages = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const stages = await Stage.findAll({
      order: [['order_index', 'ASC']],
      include: [
        {
          model: Lead,
          as: 'leads',
          attributes: ['id', 'value_amount'],
        },
      ],
    });

    const formattedStages = stages.map((stage) => {
      const stageData = stage.toJSON() as {
        id: number;
        name: string;
        order_index: number;
        color: string;
        is_won: boolean;
        is_lost: boolean;
        leads?: { id: number; value_amount: number }[];
      };
      const leadCount = stageData.leads?.length || 0;
      const totalValue =
        stageData.leads?.reduce((acc, curr) => acc + Number(curr.value_amount || 0), 0) || 0;

      return {
        id: stageData.id,
        name: stageData.name,
        order_index: stageData.order_index,
        color: stageData.color,
        is_won: stageData.is_won,
        is_lost: stageData.is_lost,
        lead_count: leadCount,
        total_value: totalValue,
      };
    });

    res.status(200).json({
      stages: formattedStages,
    });
  } catch (error) {
    next(error);
  }
};

export const getStageById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const stage = await Stage.findByPk(id);

    if (!stage) {
      res.status(404).json({ error: 'Not Found', message: 'Etapa no encontrada.' });
      return;
    }

    res.status(200).json({ stage });
  } catch (error) {
    next(error);
  }
};

export const createStage = async (
  req: Request<object, object, CreateStageInput>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, color, is_won, is_lost } = req.body;
    let { order_index } = req.body;

    if (order_index === undefined) {
      const maxOrder = await Stage.max<number, Stage>('order_index');
      order_index = (maxOrder || 0) + 1;
    }

    const stage = await Stage.create({
      name,
      order_index,
      color: color || '#6366f1',
      is_won: is_won || false,
      is_lost: is_lost || false,
    });

    res.status(201).json({
      message: 'Etapa creada correctamente.',
      stage,
    });
  } catch (error) {
    next(error);
  }
};

export const updateStage = async (
  req: Request<{ id: string }, object, UpdateStageInput>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const stage = await Stage.findByPk(id);

    if (!stage) {
      res.status(404).json({ error: 'Not Found', message: 'Etapa no encontrada.' });
      return;
    }

    await stage.update(req.body);

    res.status(200).json({
      message: 'Etapa actualizada correctamente.',
      stage,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteStage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const stage = await Stage.findByPk(id);

    if (!stage) {
      res.status(404).json({ error: 'Not Found', message: 'Etapa no encontrada.' });
      return;
    }

    const associatedLeads = await Lead.count({ where: { stage_id: id } });
    if (associatedLeads > 0) {
      res.status(400).json({
        error: 'Bad Request',
        message: `No se puede eliminar la etapa porque contiene ${associatedLeads} prospectos activos. Mueva los prospectos antes de eliminarla.`,
      });
      return;
    }

    await stage.destroy();

    res.status(200).json({
      message: 'Etapa eliminada correctamente.',
    });
  } catch (error) {
    next(error);
  }
};

export const reorderStages = async (
  req: Request<object, object, ReorderStagesInput>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const transaction = await sequelize.transaction();
  try {
    const { stages } = req.body;

    for (const item of stages) {
      await Stage.update(
        { order_index: item.order_index },
        { where: { id: item.id }, transaction }
      );
    }

    await transaction.commit();

    res.status(200).json({
      message: 'Orden de etapas actualizado correctamente.',
    });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};
