import { Request, Response, NextFunction } from 'express';
import { Op, WhereOptions } from 'sequelize';
import { Lead, Stage, User, LeadSource, Activity, LeadAttributes } from '../models/index.js';
import {
  CreateLeadInput,
  UpdateLeadInput,
  UpdateLeadStageInput,
  QueryLeadsInput,
} from '../schemas/lead.schema.js';

export const getLeads = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const q = req.query as unknown as QueryLeadsInput;
    const {
      page = 1,
      limit = 20,
      search,
      stage_id,
      priority,
      source_id,
      user_id,
      min_value,
      max_value,
      sort_by = 'created_at',
      sort_order = 'DESC',
    } = q;

    const where: WhereOptions<LeadAttributes> = {};

    if (search) {
      const searchPattern = `%${search}%`;
      Object.assign(where, {
        [Op.or]: [
          { company_name: { [Op.like]: searchPattern } },
          { contact_name: { [Op.like]: searchPattern } },
          { email: { [Op.like]: searchPattern } },
          { phone: { [Op.like]: searchPattern } },
        ],
      });
    }

    if (stage_id) where.stage_id = stage_id;
    if (priority) where.priority = priority;
    if (source_id) where.source_id = source_id;
    if (user_id) where.user_id = user_id;

    if (min_value !== undefined || max_value !== undefined) {
      const valueFilter: Record<symbol, number> = {};
      if (min_value !== undefined) valueFilter[Op.gte] = min_value;
      if (max_value !== undefined) valueFilter[Op.lte] = max_value;
      where.value_amount = valueFilter as unknown as number;
    }

    const offset = (Number(page) - 1) * Number(limit);

    const { count, rows } = await Lead.findAndCountAll({
      where,
      limit: Number(limit),
      offset,
      order: [[sort_by, sort_order.toUpperCase()]],
      include: [
        { model: Stage, as: 'stage', attributes: ['id', 'name', 'color', 'is_won', 'is_lost'] },
        { model: User, as: 'assigned_user', attributes: ['id', 'name', 'email', 'avatar_url'] },
        { model: LeadSource, as: 'source', attributes: ['id', 'name'] },
      ],
    });

    res.status(200).json({
      leads: rows,
      pagination: {
        total: count,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(count / Number(limit)),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getLeadById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const lead = await Lead.findByPk(id, {
      include: [
        { model: Stage, as: 'stage', attributes: ['id', 'name', 'color', 'is_won', 'is_lost'] },
        { model: User, as: 'assigned_user', attributes: ['id', 'name', 'email', 'avatar_url'] },
        { model: LeadSource, as: 'source', attributes: ['id', 'name'] },
        {
          model: Activity,
          as: 'activities',
          include: [{ model: User, as: 'user', attributes: ['id', 'name', 'avatar_url'] }],
        },
      ],
      order: [[{ model: Activity, as: 'activities' }, 'created_at', 'DESC']],
    });

    if (!lead) {
      res.status(404).json({ error: 'Not Found', message: 'Prospecto no encontrado.' });
      return;
    }

    res.status(200).json({ lead });
  } catch (error) {
    next(error);
  }
};

export const createLead = async (
  req: Request<object, object, CreateLeadInput>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      company_name,
      contact_name,
      email,
      phone,
      stage_id,
      source_id,
      user_id,
      value_amount = 0,
      priority = 'medium',
      notes,
    } = req.body;

    const assignedUserId = user_id || (req.user ? req.user.id : null);

    const lead = await Lead.create({
      company_name,
      contact_name,
      email,
      phone: phone || null,
      stage_id,
      source_id: source_id || null,
      user_id: assignedUserId,
      value_amount,
      priority,
      notes: notes || null,
    });

    const populatedLead = await Lead.findByPk(lead.id, {
      include: [
        { model: Stage, as: 'stage' },
        { model: User, as: 'assigned_user', attributes: ['id', 'name', 'email', 'avatar_url'] },
        { model: LeadSource, as: 'source' },
      ],
    });

    res.status(201).json({
      message: 'Prospecto creado exitosamente.',
      lead: populatedLead,
    });
  } catch (error) {
    next(error);
  }
};

export const updateLead = async (
  req: Request<{ id: string }, object, UpdateLeadInput>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const lead = await Lead.findByPk(id);

    if (!lead) {
      res.status(404).json({ error: 'Not Found', message: 'Prospecto no encontrado.' });
      return;
    }

    await lead.update(req.body);

    const updatedLead = await Lead.findByPk(id, {
      include: [
        { model: Stage, as: 'stage' },
        { model: User, as: 'assigned_user', attributes: ['id', 'name', 'email', 'avatar_url'] },
        { model: LeadSource, as: 'source' },
      ],
    });

    res.status(200).json({
      message: 'Prospecto actualizado exitosamente.',
      lead: updatedLead,
    });
  } catch (error) {
    next(error);
  }
};

export const updateLeadStage = async (
  req: Request<{ id: string }, object, UpdateLeadStageInput>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const { stage_id } = req.body;

    const lead = await Lead.findByPk(id);
    if (!lead) {
      res.status(404).json({ error: 'Not Found', message: 'Prospecto no encontrado.' });
      return;
    }

    const stageExists = await Stage.findByPk(stage_id);
    if (!stageExists) {
      res.status(404).json({ error: 'Not Found', message: 'La etapa destino no existe.' });
      return;
    }

    await lead.update({ stage_id });

    res.status(200).json({
      message: 'Etapa del prospecto actualizada correctamente.',
      lead: {
        id: lead.id,
        stage_id: lead.stage_id,
        stage_name: stageExists.name,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteLead = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const lead = await Lead.findByPk(id);

    if (!lead) {
      res.status(404).json({ error: 'Not Found', message: 'Prospecto no encontrado.' });
      return;
    }

    await lead.destroy();

    res.status(200).json({
      message: 'Prospecto eliminado exitosamente.',
    });
  } catch (error) {
    next(error);
  }
};
