import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth-store';
import { useOfertaStore } from '../../stores/ofertaStore';
import { AuthTemplate } from '../templates/AuthTemplate';
import { OfertaCard } from '../molecules/OfertaCard';

const MisOfertasPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { misOfertas, isLoading, cargarMisOfertas, eliminarOferta } = useOfertaStore();

  useEffect(() => {
    if (user) {
      cargarMisOfertas(user.id);
    }
  }, [user, cargarMisOfertas]);

  const handleEliminar = async (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta oferta?')) {
      await eliminarOferta(id);
    }
  };

  if (isLoading) {
    return (
      <AuthTemplate title="Mis ofertas" subtitle="Cargando tus ofertas...">
        <div className="loading-spinner">Cargando...</div>
      </AuthTemplate>
    );
  }

  return (
    <AuthTemplate title="Mis ofertas" subtitle="Gestiona tus vacantes">
      <div className="mis-ofertas-header">
        <button onClick={() => navigate('/crear-oferta')} className="crear-oferta-btn">
          + Crear nueva oferta
        </button>
      </div>

      {misOfertas.length === 0 ? (
        <div className="mis-ofertas-empty">
          <p>No tienes ofertas publicadas</p>
          <button onClick={() => navigate('/crear-oferta')} className="crear-oferta-empty-btn">
            + Crear primera oferta
          </button>
        </div>
      ) : (
        <div className="ofertas-grid">
          {misOfertas.map((oferta) => (
            <OfertaCard
              key={oferta.id}
              oferta={oferta}
              showActions={true}
              onEdit={() => navigate(`/editar-oferta/${oferta.id}`)}
              onDelete={() => handleEliminar(oferta.id)}
              onView={() => navigate(`/oferta/${oferta.id}`)}
            />
          ))}
        </div>
      )}
    </AuthTemplate>
  );
};

export default MisOfertasPage;
