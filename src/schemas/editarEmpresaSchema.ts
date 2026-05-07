import { z } from 'zod';

export const editarEmpresaSchema = z.object({
  nombreEmpresa: z
    .string()
    .min(3, 'El nombre de la empresa debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede tener más de 100 caracteres'),

  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Email inválido'),

  rif: z
    .string()
    .min(9, 'RUT inválido (ejemplo: rif:12345678)')
    .max(12, 'RUT inválido')
    .regex(/^\d{7,8}-[\dkK]$/, 'Formato de RUT inválido'),

  telefono: z
    .string()
    .min(8, 'El teléfono debe tener al menos 8 dígitos'),

  direccion: z
    .string()
    .min(5, 'La dirección es requerida'),

  descripcion: z
    .string()
    .min(20, 'La descripción debe tener al menos 20 caracteres')
    .max(1000, 'La descripción no puede tener más de 1000 caracteres'),

  sitioWeb: z
    .string()
    .url('Debe ser una URL válida')
    .optional()
    .or(z.literal('')),

  tamaño: z
    .string()
    .optional(),

  sector: z
    .string()
    .optional(),
});

export type EditarEmpresaFormData = z.infer<typeof editarEmpresaSchema>;

export const tamaniosEmpresa = [
  { value: '1-10', label: '1-10 empleados' },
  { value: '11-50', label: '11-50 empleados' },
  { value: '51-200', label: '51-200 empleados' },
  { value: '201-500', label: '201-500 empleados' },
  { value: '501+', label: 'Más de 500 empleados' },
];

export const sectoresEmpresa = [
  { value: 'tecnologia', label: 'Tecnología' },
  { value: 'salud', label: 'Salud' },
  { value: 'educacion', label: 'Educación' },
  { value: 'finanzas', label: 'Finanzas' },
  { value: 'comercio', label: 'Comercio' },
  { value: 'construccion', label: 'Construcción' },
  { value: 'turismo', label: 'Turismo' },
  { value: 'consultoria', label: 'Consultoría' },
  { value: 'otro', label: 'Otro' },
];
