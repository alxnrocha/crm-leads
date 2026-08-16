import { Request, Response, NextFunction } from 'express';
import { Op, WhereOptions } from 'sequelize';
import { Activity, Lead, User, ActivityAttributes } from '../models/index.js';
import {
  CreateActivityInput,
  UpdateActivityInput,
  QueryActivitiesInput,
} from '../schemas/activity.schema.js';

export const getActivities = async (
  req: Request<object, object, object, QueryActivitiesInput>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { page = 1, limit = 20, lead_id, user_id, type, status = 'all' } = req.query;

    const where: WhereOptions<ActivityAttributes> = {};

    if (lead_id) where.lead_id = lead_id;
    if (user_id) where.user_id = user_id;
    if (type) where.type = type;

    if (status === 'pending') {
      where.completed_at = { [Op.is]: null } as unknown as Date;
    } else if (status === 'completed') {
      where.completed_at = { [Op.not]: null } as unknown as Date;
    }

    const offset = (Number(page) - 1) * Number(limit);

    const { count, rows } = await Activity.findAndCountAll({
      where,
      limit: Number(limit),
      offset,
      order: [['created_at', 'DESC']],
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'avatar_url'] },
        { model: Lead, as: 'lead', attributes: ['id', 'company_name', 'contact_name'] },
      ],
    });

    res.status(200).json({
      activities: rows,
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

export const createActivity = async (
  req: Request<object, object, CreateActivityInput>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { lead_id, type, summary, scheduled_at, completed_at } = req.body;

    const lead = await Lead.findByPk(lead_id);
    if (!lead) {
      res.status(404).json({ error: 'Not Found', message: 'Prospecto no encontrado.' });
      return;
    }

    const userId = req.user ? req.user.id : null;

    const activity = await Activity.create({
      lead_id,
      user_id: userId,
      type,
      summary,
      scheduled_at: scheduled_at ? new Date(scheduled_at) : null,
      completed_at: completed_at ? new Date(completed_at) : null,
    });

    const populatedActivity = await Activity.findByPk(activity.id, {
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'avatar_url'] },
        { model: Lead, as: 'lead', attributes: ['id', 'company_name', 'contact_name'] },
      ],
    });

    res.status(201).json({
      message: 'Actividad registrada correctamente.',
      activity: populatedActivity,
    });
  } catch (error) {
    next(error);
  }
};

export const updateActivity = async (
  req: Request<{ id: string }, object, UpdateActivityInput>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const { type, summary, scheduled_at, completed_at, is_completed } = req.body;

    const activity = await Activity.findByPk(id);
    if (!activity) {
      res.status(404).json({ error: 'Not Found', message: 'Actividad no encontrada.' });
      return;
    }

    const updates: Partial<ActivityAttributes> = {};
    if (type !== undefined) updates.type = type;
    if (summary !== undefined) updates.summary = summary;
    if (scheduled_at !== undefined)
      updates.scheduled_at = scheduled_at ? new Date(scheduled_at) : null;

    if (is_completed !== undefined) {
      updates.completed_at = is_completed ? new Date() : null;
    } else if (completed_at !== undefined) {
      updates.completed_at = completed_at ? new Date(completed_at) : null;
    }

    await activity.update(updates);

    const updatedActivity = await Activity.findByPk(id, {
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'avatar_url'] },
        { model: Lead, as: 'lead', attributes: ['id', 'company_name', 'contact_name'] },
      ],
    });

    res.status(200).json({
      message: 'Actividad actualizada correctamente.',
      activity: updatedActivity,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteActivity = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const activity = await Activity.findByPk(id);

    if (!activity) {
      res.status(404).json({ error: 'Not Found', message: 'Actividad no encontrada.' });
      return;
    }

    await activity.destroy();

    res.status(200).json({
      message: 'Actividad eliminada correctamente.',
    });
  } catch (error) {
    next(error);
  }
};
