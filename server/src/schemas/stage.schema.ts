import { z } from 'zod';

export const createStageSchema = z.object({
  name: z.string().min(2, 'El nombre de la etapa debe tener al menos 2 caracteres').max(50),
  order_index: z.number().int().nonnegative().optional(),
  color: z
    .string()
    .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Color hexadecimal inválido')
    .optional()
    .default('#6366f1'),
  is_won: z.boolean().optional().default(false),
  is_lost: z.boolean().optional().default(false),
});

export const updateStageSchema = createStageSchema.partial();

export const reorderStagesSchema = z.object({
  stages: z
    .array(
      z.object({
        id: z.number().int().positive('ID de etapa inválido'),
        order_index: z.number().int().nonnegative('El índice debe ser positivo'),
      })
    )
    .min(1, 'Debe enviar al menos una etapa para reordenar'),
});

export type CreateStageInput = z.infer<typeof createStageSchema>;
export type UpdateStageInput = z.infer<typeof updateStageSchema>;
export type ReorderStagesInput = z.infer<typeof reorderStagesSchema>;
