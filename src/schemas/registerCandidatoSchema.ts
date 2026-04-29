import { z } from 'zod'

export const registerCandidatoSchema = z.object({
  nombre: z
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede tener mas de 100 caracteres'),

  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Email invalido'),

  password: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),

  confirmPassword: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),

  edad: z
    .number({
      required_error: 'La edad es requerida',
      invalid_type_error: 'La edad debe ser un número',
    })
    .min(18, 'Debes ser meyor de 18 años')
    .max(100, 'Edad inválida'),

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
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

export type RegisterCandidatoFormData = z.infer<typeof registerCandidatoSchema>;

// Opciones para el área de trabajo
export const areasTrabajo = [
  'Frontend',
  'Backend',
  'FullStack',
  'Mobile',
  'DevOps',
  'Data Science',
  'QA/Tester',
  'UX/UI',
  'Product Manager',
  'Otro',
];
