import type { Oferta, CrearOfertaFormData } from '../schemas/ofertaSchema';

// Datos MOCK iniciales
const MOCK_OFERTAS: Oferta[] = [
  {
    id: '1',
    empresaId: 2,
    empresaNombre: 'Tech Solutions S.A.',
    titulo: 'Desarrollador React Junior',
    descripcion: 'Buscamos un desarrollador React con ganas de aprender y crecer en un equipo dinámico.',
    requisitos: 'Conocimientos en React, TypeScript, HTML/CSS. Experiencia mínima 1 año.',
    ubicacion: 'Santiago, Chile (Remoto)',
    tipoTrabajo: 'remoto',
    salarioMin: 1200000,
    salarioMax: 1500000,
    fechaPublicacion: new Date('2025-04-01'),
    estado: 'activa',
  },
  {
    id: '2',
    empresaId: 2,
    empresaNombre: 'Tech Solutions S.A.',
    titulo: 'Backend Developer Node.js',
    descripcion: 'Buscamos backend developer con experiencia en Node.js y bases de datos.',
    requisitos: 'Node.js, Express, MongoDB, TypeScript.',
    ubicacion: 'Santiago, Chile (Híbrido)',
    tipoTrabajo: 'hibrido',
    salarioMin: 1400000,
    salarioMax: 1800000,
    fechaPublicacion: new Date('2025-04-15'),
    estado: 'activa',
  },
  {
    id: '3',
    empresaId: 3,
    empresaNombre: 'Digital Agency',
    titulo: 'Frontend Developer',
    descripcion: 'Buscamos frontend developer con experiencia en React y diseño responsivo.',
    requisitos: 'React, CSS, HTML, experiencia con Figma.',
    ubicacion: 'Remoto',
    tipoTrabajo: 'remoto',
    salarioMin: 1400000,
    salarioMax: 1800000,
    fechaPublicacion: new Date('2025-04-20'),
    estado: 'activa',
  },
];

// Base de datos mutable
const db = {
  ofertas: [...MOCK_OFERTAS],
};

export const ofertaService = {
  // Obtener TODAS las ofertas (para candidatos)
  getOfertas: async (): Promise<Oferta[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...db.ofertas];
  },

  // Obtener ofertas de una empresa específica
  getOfertasByEmpresa: async (empresaId: number): Promise<Oferta[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return db.ofertas.filter(o => o.empresaId === empresaId);
  },

  // Obtener una oferta por ID
  getOfertaById: async (id: string): Promise<Oferta | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return db.ofertas.find(o => o.id === id) || null;
  },

  // Crear una nueva oferta
  crearOferta: async (data: CrearOfertaFormData, empresaId: number, empresaNombre: string): Promise<Oferta> => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const nuevaOferta: Oferta = {
      ...data,
      id: `${Date.now()}`,
      empresaId,
      empresaNombre,
      fechaPublicacion: new Date(),
      estado: 'activa',
    };

    db.ofertas.push(nuevaOferta);
    console.log('Oferta creada:', nuevaOferta);
    return nuevaOferta;
  },

  // Actualizar una oferta existente
  actualizarOferta: async (id: string, data: Partial<Oferta>): Promise<Oferta> => {
    await new Promise(resolve => setTimeout(resolve, 800));

    const index = db.ofertas.findIndex(o => o.id === id);
    if (index === -1) throw new Error('Oferta no encontrada');

    db.ofertas[index] = { ...db.ofertas[index], ...data };
    console.log('Oferta actualizada:', db.ofertas[index]);
    return db.ofertas[index];
  },

  // Eliminar una oferta
  eliminarOferta: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 800));

    const index = db.ofertas.findIndex(o => o.id === id);
    if (index === -1) throw new Error('Oferta no encontrada');

    db.ofertas.splice(index, 1);
    console.log('Oferta eliminada:', id);
  },
};
