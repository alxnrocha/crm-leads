import { z } from 'zod';

export const createLeadSchema = z.object({
  company_name: z.string().min(2, 'El nombre de empresa debe tener al menos 2 caracteres').max(150),
  contact_name: z
    .string()
    .min(2, 'El nombre de contacto debe tener al menos 2 caracteres')
    .max(100),
  email: z.string().email('Debe proporcionar un correo electrónico válido'),
  phone: z.string().max(30).optional().nullable(),
  stage_id: z.number().int().positive('ID de etapa inválido'),
  source_id: z.number().int().positive('ID de fuente inválido').optional().nullable(),
  user_id: z.number().int().positive('ID de comercial inválido').optional().nullable(),
  value_amount: z.number().nonnegative('El valor no puede ser negativo').optional().default(0),
  priority: z.enum(['low', 'medium', 'high']).optional().default('medium'),
  notes: z.string().max(2000).optional().nullable(),
});

export const updateLeadSchema = createLeadSchema.partial();

export const updateLeadStageSchema = z.object({
  stage_id: z.number().int().positive('ID de etapa inválido'),
});

export const queryLeadsSchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(20),
  search: z.string().optional(),
  stage_id: z.coerce.number().int().positive().optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  source_id: z.coerce.number().int().positive().optional(),
  user_id: z.coerce.number().int().positive().optional(),
  min_value: z.coerce.number().nonnegative().optional(),
  max_value: z.coerce.number().nonnegative().optional(),
  sort_by: z
    .enum(['created_at', 'value_amount', 'company_name', 'priority'])
    .optional()
    .default('created_at'),
  sort_order: z.enum(['ASC', 'DESC', 'asc', 'desc']).optional().default('DESC'),
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
export type UpdateLeadInput = z.infer<typeof updateLeadSchema>;
export type UpdateLeadStageInput = z.infer<typeof updateLeadStageSchema>;
export type QueryLeadsInput = z.infer<typeof queryLeadsSchema>;
