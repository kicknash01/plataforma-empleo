import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth-store';
import { useOfertaStore } from '../../stores/ofertaStore';
import { AuthTemplate } from '../templates/AuthTemplate';
import { EditarOfertaForm } from '../organisms/EditarOfertaForm';
import type { Oferta } from '../../schemas/ofertaSchema';

const EditarOfertaPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { ofertaActual, isLoading, cargarOferta, actualizarOferta } = useOfertaStore();

  useEffect(() => {
    if (id) {
      cargarOferta(id);
    }
  }, [id, cargarOferta]);

  const handleSubmit = async (data: Oferta) => {
    if (!id) return;
    const success = await actualizarOferta(id, data);
    if (success) {
      navigate(`/oferta/${id}`);
    }
  };

  if (isLoading) {
    return (
      <AuthTemplate title="Editar oferta" subtitle="Cargando información...">
        <div className="loading-spinner">Cargando...</div>
      </AuthTemplate>
    );
  }

  if (!ofertaActual) {
    return (
      <AuthTemplate title="Editar oferta" subtitle="Oferta no encontrada">
        <div className="detalle-error">
          <p>La oferta que buscas no existe</p>
          <button onClick={() => navigate('/mis-ofertas')} className="detalle-back-btn">
            ← Volver a mis ofertas
          </button>
        </div>
      </AuthTemplate>
    );
  }

  if (user?.id !== ofertaActual.empresaId) {
    return (
      <AuthTemplate title="Editar oferta" subtitle="Acceso denegado">
        <div className="detalle-error">
          <p>No tienes permiso para editar esta oferta</p>
          <button onClick={() => navigate('/mis-ofertas')} className="detalle-back-btn">
            ← Volver a mis ofertas
          </button>
        </div>
      </AuthTemplate>
    );
  }

  return (
    <AuthTemplate title="Editar oferta" subtitle="Modifica los datos de la vacante">
      <EditarOfertaForm
        ofertaActual={ofertaActual}
        onSubmit={handleSubmit}
        onCancel={() => navigate(`/oferta/${id}`)}
      />
    </AuthTemplate>
  );
};

export default EditarOfertaPage;
