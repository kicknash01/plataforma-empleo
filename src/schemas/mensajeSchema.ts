import { z } from 'zod';

export const mensajeSchema = z.object({
  id: z.string(),
  conversacionId: z.string(),
  emisorId: z.number(),
  emisorNombre: z.string(),
  emisorRol: z.enum(['candidato', 'empresa']),
  contenido: z.string().min(1, 'El mensaje no puede estar vacío'),
  fecha: z.date(),
  leido: z.boolean(),
});

export type Mensaje = z.infer<typeof mensajeSchema>;

export const conversacionSchema = z.object({
  id: z.string(),
  candidatoId: z.number(),
  candidatoNombre: z.string(),
  empresaId: z.number(),
  empresaNombre: z.string(),
  ultimoMensaje: z.string(),
  ultimoMensajeFecha: z.date(),
  mensajesNoLeidos: z.number(),
});

export type Conversacion = z.infer<typeof conversacionSchema>;
