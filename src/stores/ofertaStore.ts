import { create } from 'zustand';
import type { Oferta, CrearOfertaFormData } from '../schemas/ofertaSchema';
import { ofertaService } from '../services/ofertaService';

interface OfertaState {
  // Estados
  ofertas: Oferta[];
  misOfertas: Oferta[];
  ofertaActual: Oferta | null;
  isLoading: boolean;
  error: string | null;

  // Acciones
  cargarOfertas: () => Promise<void>;
  cargarMisOfertas: (empresaId: number) => Promise<void>;
  cargarOferta: (id: string) => Promise<void>;
  crearOferta: (data: CrearOfertaFormData, empresaId: number, empresaNombre: string) => Promise<boolean>;
  actualizarOferta: (id: string, data: Partial<Oferta>) => Promise<boolean>;
  eliminarOferta: (id: string) => Promise<boolean>;
  limpiarError: () => void;
}

export const useOfertaStore = create<OfertaState>((set) => ({
  // Estado inicial
  ofertas: [],
  misOfertas: [],
  ofertaActual: null,
  isLoading: false,
  error: null,

  // Cargar todas las ofertas (para candidatos)
  cargarOfertas: async () => {
    set({ isLoading: true, error: null });
    try {
      const ofertas = await ofertaService.getOfertas();
      set({ ofertas, isLoading: false });
    } catch {
      set({ error: 'Error al cargar ofertas', isLoading: false });
    }
  },

  // Cargar ofertas de una empresa específica
  cargarMisOfertas: async (empresaId) => {
    set({ isLoading: true, error: null });
    try {
      const misOfertas = await ofertaService.getOfertasByEmpresa(empresaId);
      set({ misOfertas, isLoading: false });
    } catch {
      set({ error: 'Error al cargar tus ofertas', isLoading: false });
    }
  },

  // Cargar una oferta por ID
  cargarOferta: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const oferta = await ofertaService.getOfertaById(id);
      set({ ofertaActual: oferta, isLoading: false });
    } catch {
      set({ error: 'Error al cargar la oferta', isLoading: false });
    }
  },

  // Crear una nueva oferta
  crearOferta: async (data, empresaId, empresaNombre) => {
    set({ isLoading: true, error: null });
    try {
      const nuevaOferta = await ofertaService.crearOferta(data, empresaId, empresaNombre);
      set((state) => ({
        misOfertas: [...state.misOfertas, nuevaOferta],
        ofertas: [...state.ofertas, nuevaOferta],
        isLoading: false,
      }));
      return true;
    } catch {
      set({ error: 'Error al crear la oferta', isLoading: false });
      return false;
    }
  },

  // Actualizar una oferta existente
  actualizarOferta: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      const ofertaActualizada = await ofertaService.actualizarOferta(id, data);
      set((state) => ({
        misOfertas: state.misOfertas.map(o => o.id === id ? ofertaActualizada : o),
        ofertas: state.ofertas.map(o => o.id === id ? ofertaActualizada : o),
        ofertaActual: ofertaActualizada,
        isLoading: false,
      }));
      return true;
    } catch {
      set({ error: 'Error al actualizar la oferta', isLoading: false });
      return false;
    }
  },

  // Eliminar una oferta
  eliminarOferta: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await ofertaService.eliminarOferta(id);
      set((state) => ({
        misOfertas: state.misOfertas.filter(o => o.id !== id),
        ofertas: state.ofertas.filter(o => o.id !== id),
        ofertaActual: state.ofertaActual?.id === id ? null : state.ofertaActual,
        isLoading: false,
      }));
      return true;
    } catch {
      set({ error: 'Error al eliminar la oferta', isLoading: false });
      return false;
    }
  },

  // Limpiar error
  limpiarError: () => set({ error: null }),
}));
