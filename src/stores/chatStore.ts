// src/stores/chatStore.ts

import { create } from 'zustand';
import type { Conversacion, Mensaje } from '../schemas/mensajeSchema';
import { chatService } from '../services/chatService';

interface ChatState {
  conversaciones: Conversacion[];
  mensajesActuales: Mensaje[];
  conversacionActiva: Conversacion | null;
  isLoading: boolean;
  isLoadingMensajes: boolean;
  error: string | null;

  cargarConversaciones: (usuarioId: number, rol: 'candidato' | 'empresa') => Promise<void>;
  cargarMensajes: (conversacionId: string) => Promise<void>;
  enviarMensaje: (mensaje: Omit<Mensaje, 'id' | 'fecha'>) => Promise<void>;
  seleccionarConversacion: (conversacion: Conversacion | null) => void;
  limpiarError: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  conversaciones: [],
  mensajesActuales: [],
  conversacionActiva: null,
  isLoading: false,
  isLoadingMensajes: false,
  error: null,

  cargarConversaciones: async (usuarioId, rol) => {
    set({ isLoading: true, error: null });
    try {
      const conversaciones = await chatService.getConversaciones(usuarioId, rol);
      set({ conversaciones, isLoading: false });
    } catch {
      set({ error: 'Error al cargar conversaciones', isLoading: false });
    }
  },

  cargarMensajes: async (conversacionId) => {
    set({ isLoadingMensajes: true, error: null });
    try {
      const mensajes = await chatService.getMensajes(conversacionId);
      set({ mensajesActuales: mensajes, isLoadingMensajes: false });
    } catch {
      set({ error: 'Error al cargar mensajes', isLoadingMensajes: false });
    }
  },

  // ✅ FUNCIÓN CORREGIDA - Sin duplicación de mensajes
  enviarMensaje: async (mensaje) => {
    // Generar ID temporal único
    const tempId = `temp-${Date.now()}-${Math.random()}`;

    // Crear mensaje temporal optimista
    const mensajeTemp: Mensaje = {
      ...mensaje,
      id: tempId,
      fecha: new Date(),
    };

    // Agregar mensaje temporal (solo UNA vez)
    set((state) => ({
      mensajesActuales: [...state.mensajesActuales, mensajeTemp],
    }));

    try {
      // Enviar al servidor
      const nuevoMensaje = await chatService.enviarMensaje(mensaje);

      // Reemplazar el mensaje temporal por el real
      set((state) => ({
        mensajesActuales: state.mensajesActuales.map(m =>
          m.id === tempId ? nuevoMensaje : m
        ),
      }));

      // Actualizar la conversación en la lista
      set((state) => ({
        conversaciones: state.conversaciones.map(conv =>
          conv.id === mensaje.conversacionId
            ? { ...conv, ultimoMensaje: mensaje.contenido, ultimoMensajeFecha: new Date() }
            : conv
        ),
      }));
    } catch {
      // Si falla, eliminar el mensaje temporal
      set((state) => ({
        mensajesActuales: state.mensajesActuales.filter(m => m.id !== tempId),
        error: 'Error al enviar mensaje',
      }));
    }
  },

  seleccionarConversacion: (conversacion) => {
    set({ conversacionActiva: conversacion });
  },

  limpiarError: () => set({ error: null }),
}));
