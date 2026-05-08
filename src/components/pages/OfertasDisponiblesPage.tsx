import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOfertaStore } from '../../stores/ofertaStore';
import { AuthTemplate } from '../templates/AuthTemplate';
import { OfertaCard } from '../molecules/OfertaCard';

const OfertasDisponiblesPage: React.FC = () => {
  const navigate = useNavigate();
  const { ofertas, isLoading, cargarOfertas } = useOfertaStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [tipoFilter, setTipoFilter] = useState<string>('');

  useEffect(() => {
    cargarOfertas();
  }, [cargarOfertas]);

  // Filtrar ofertas por búsqueda y tipo
  const ofertasFiltradas = ofertas.filter((oferta) => {
    const matchesSearch = oferta.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      oferta.empresaNombre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTipo = tipoFilter === '' || oferta.tipoTrabajo === tipoFilter;
    return matchesSearch && matchesTipo;
  });

  if (isLoading) {
    return (
      <AuthTemplate title="Ofertas de trabajo" subtitle="Cargando vacantes...">
        <div className="loading-spinner">Cargando...</div>
      </AuthTemplate>
    );
  }

  return (
    <AuthTemplate title="Ofertas de trabajo" subtitle="Encuentra tu próximo empleo">
      {/* Filtros */}
      <div className="ofertas-filtros">
        <input
          type="text"
          placeholder="Buscar por título o empresa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="ofertas-search"
        />
        <select
          value={tipoFilter}
          onChange={(e) => setTipoFilter(e.target.value)}
          className="ofertas-tipo-filter"
        >
          <option value="">Todos los tipos</option>
          <option value="remoto">Remoto</option>
          <option value="presencial">Presencial</option>
          <option value="hibrido">Híbrido</option>
        </select>
      </div>

      {ofertasFiltradas.length === 0 ? (
        <div className="ofertas-empty">
          <p>No hay ofertas disponibles</p>
          <p className="ofertas-empty-sub">Vuelve más tarde para nuevas oportunidades</p>
        </div>
      ) : (
        <div className="ofertas-grid">
          {ofertasFiltradas.map((oferta) => (
            <OfertaCard
              key={oferta.id}
              oferta={oferta}
              showActions={false}
              onView={() => navigate(`/oferta/${oferta.id}`)}
            />
          ))}
        </div>
      )}
    </AuthTemplate>
  );
};

export default OfertasDisponiblesPage;
