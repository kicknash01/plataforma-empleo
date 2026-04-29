import { z } from 'zod';

export const editarCandidatoSchema = z.object({
  nombre: z
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede tener más de 100 caracteres'),

  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Email inválido'),

  telefono: z
    .string()
    .optional(),

  direccion: z
    .string()
    .optional(),

  experiencia: z
    .number({
      invalid_type_error: 'Los años de experiencia deben ser un número',
    })
    .min(0, 'Los años de experiencia no pueden ser negativos')
    .max(50, 'Los años de experiencia no pueden superar 50')
    .optional(),

  areaTrabajo: z
    .string()
    .optional(),

  descripcion: z
    .string()
    .max(500, 'La descripción no puede tener más de 500 caracteres')
    .optional(),
});

export type EditarCandidatoFormData = z.infer<typeof editarCandidatoSchema>;
