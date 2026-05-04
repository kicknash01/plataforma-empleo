import type { Mensaje, Conversacion } from '../schemas/mensajeSchema';

// Datos MOCK de conversaciones (simulan lo que vendría de una base de datos)
const MOCK_CONVERSACIONES: Conversacion[] = [
  {
    id: 'conv-1',
    candidatoId: 1,
    candidatoNombre: 'Candidato Demo',
    empresaId: 2,
    empresaNombre: 'Tech Solutions S.A.',
    ultimoMensaje: 'Hola, ¿cuándo sería la entrevista?',
    ultimoMensajeFecha: new Date('2025-04-28T10:30:00'),
    mensajesNoLeidos: 2,
  },
  {
    id: 'conv-2',
    candidatoId: 1,
    candidatoNombre: 'Candidato Demo',
    empresaId: 3,
    empresaNombre: 'Digital Agency',
    ultimoMensaje: 'Gracias por postular',
    ultimoMensajeFecha: new Date('2025-04-27T15:20:00'),
    mensajesNoLeidos: 0,
  },
];

// Datos MOCK de mensajes por conversación
const MOCK_MENSAJES: Record<string, Mensaje[]> = {
  'conv-1': [
    {
      id: 'msg-1',
      conversacionId: 'conv-1',
      emisorId: 2,
      emisorNombre: 'Tech Solutions S.A.',
      emisorRol: 'empresa',
      contenido: 'Hemos revisado tu postulación, ¡te queremos entrevistar!',
      fecha: new Date('2025-04-28T09:00:00'),
      leido: true,
    },
    {
      id: 'msg-2',
      conversacionId: 'conv-1',
      emisorId: 1,
      emisorNombre: 'Candidato Demo',
      emisorRol: 'candidato',
      contenido: '¡Excelente! ¿Cuándo estarían disponibles?',
      fecha: new Date('2025-04-28T09:15:00'),
      leido: true,
    },
    {
      id: 'msg-3',
      conversacionId: 'conv-1',
      emisorId: 1,
      emisorNombre: 'Candidato Demo',
      emisorRol: 'candidato',
      contenido: 'Hola, ¿cuándo sería la entrevista?',
      fecha: new Date('2025-04-28T10:30:00'),
      leido: false,
    },
  ],
  'conv-2': [
    {
      id: 'msg-4',
      conversacionId: 'conv-2',
      emisorId: 3,
      emisorNombre: 'Digital Agency',
      emisorRol: 'empresa',
      contenido: 'Gracias por aplicar al puesto de Frontend',
      fecha: new Date('2025-04-27T15:20:00'),
      leido: true,
    },
  ],
};

export const chatService = {
  // Obtener todas las conversaciones de un usuario
  getConversaciones: async (usuarioId: number, rol: 'candidato' | 'empresa'): Promise<Conversacion[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    // Filtrar según el rol del usuario
    let conversaciones = [...MOCK_CONVERSACIONES];

    if (rol === 'candidato') {
      conversaciones = conversaciones.filter(c => c.candidatoId === usuarioId);
    } else {
      conversaciones = conversaciones.filter(c => c.empresaId === usuarioId);
    }

    return conversaciones;
  },

  // Obtener mensajes de una conversación
  getMensajes: async (conversacionId: string): Promise<Mensaje[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_MENSAJES[conversacionId] || [];
  },

  // Enviar un mensaje
  enviarMensaje: async (mensaje: Omit<Mensaje, 'id' | 'fecha'>): Promise<Mensaje> => {
    await new Promise(resolve => setTimeout(resolve, 200));

    const nuevoMensaje: Mensaje = {
      ...mensaje,
      id: `msg-${Date.now()}`,
      fecha: new Date(),
    };

    // Agregar al MOCK
    if (!MOCK_MENSAJES[mensaje.conversacionId]) {
      MOCK_MENSAJES[mensaje.conversacionId] = [];
    }
    MOCK_MENSAJES[mensaje.conversacionId].push(nuevoMensaje);

    // Actualizar la conversación correspondiente
    const conversacion = MOCK_CONVERSACIONES.find(c => c.id === mensaje.conversacionId);
    if (conversacion) {
      conversacion.ultimoMensaje = mensaje.contenido;
      conversacion.ultimoMensajeFecha = new Date();
      if (mensaje.emisorRol === 'empresa') {
        conversacion.mensajesNoLeidos++;
      }
    }

    return nuevoMensaje;
  },

  // Marcar mensajes como leídos
  marcarComoLeidos: async (conversacionId: string, usuarioId: number): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 200));

    const mensajes = MOCK_MENSAJES[conversacionId] || [];

    mensajes.forEach(mensaje => {
      if (mensaje.emisorId !== usuarioId) {
        mensaje.leido = true;
      }
    });

    const conversacion = MOCK_CONVERSACIONES.find(c => c.id === conversacionId);
    if (conversacion) {
      conversacion.mensajesNoLeidos = 0;
    }
  },
};
