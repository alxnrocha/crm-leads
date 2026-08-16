import { z } from 'zod';

export const createActivitySchema = z.object({
  lead_id: z.number().int().positive('ID de prospecto inválido'),
  type: z.enum(['call', 'meeting', 'email', 'note'], {
    errorMap: () => ({ message: 'Tipo de actividad inválido (call, meeting, email, note)' }),
  }),
  summary: z.string().min(2, 'El resumen debe tener al menos 2 caracteres').max(255),
  scheduled_at: z.string().datetime().optional().nullable(),
  completed_at: z.string().datetime().optional().nullable(),
});

export const updateActivitySchema = z.object({
  type: z.enum(['call', 'meeting', 'email', 'note']).optional(),
  summary: z.string().min(2).max(255).optional(),
  scheduled_at: z.string().datetime().optional().nullable(),
  completed_at: z.string().datetime().optional().nullable(),
  is_completed: z.boolean().optional(),
});

export const queryActivitiesSchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(20),
  lead_id: z.coerce.number().int().positive().optional(),
  user_id: z.coerce.number().int().positive().optional(),
  type: z.enum(['call', 'meeting', 'email', 'note']).optional(),
  status: z.enum(['all', 'pending', 'completed']).optional().default('all'),
});

export type CreateActivityInput = z.infer<typeof createActivitySchema>;
export type UpdateActivityInput = z.infer<typeof updateActivitySchema>;
export type QueryActivitiesInput = z.infer<typeof queryActivitiesSchema>;
