import { z } from 'zod';

// Esquema para validar una oferta de trabajo
export const ofertaSchema = z.object({
  id: z.string(),
  empresaId: z.number(),
  empresaNombre: z.string(),
  titulo: z.string().min(5, 'El título debe tener al menos 5 caracteres'),
  descripcion: z.string().min(20, 'La descripción debe tener al menos 20 caracteres'),
  requisitos: z.string().min(10, 'Los requisitos deben tener al menos 10 caracteres'),
  ubicacion: z.string().min(3, 'La ubicación es requerida'),
  tipoTrabajo: z.enum(['remoto', 'presencial', 'hibrido']),
  salarioMin: z.number().min(0, 'El salario mínimo no puede ser negativo'),
  salarioMax: z.number().min(0, 'El salario máximo no puede ser negativo'),
  fechaPublicacion: z.date(),
  estado: z.enum(['activa', 'cerrada']),
});

export type Oferta = z.infer<typeof ofertaSchema>;

// Opciones para el tipo de trabajo
export const tiposTrabajo = [
  { value: 'remoto', label: 'Remoto' },
  { value: 'presencial', label: 'Presencial' },
  { value: 'hibrido', label: 'Híbrido' },
];

// Esquema para CREAR una oferta (sin los campos que se generan automáticamente)
export const crearOfertaSchema = ofertaSchema.omit({
  id: true,
  empresaId: true,
  empresaNombre: true,
  fechaPublicacion: true,
  estado: true,
});

export type CrearOfertaFormData = z.infer<typeof crearOfertaSchema>;
