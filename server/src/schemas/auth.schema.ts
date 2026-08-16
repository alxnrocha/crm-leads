import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(100),
  email: z.string().email('Debe proporcionar un correo electrónico válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres').max(100),
  role: z.enum(['admin', 'sales']).optional().default('sales'),
  avatar_url: z.string().url('URL de avatar no válida').optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Debe proporcionar un correo electrónico válido'),
  password: z.string().min(1, 'La contraseña es obligatoria'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
