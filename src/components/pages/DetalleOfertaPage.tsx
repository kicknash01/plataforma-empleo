import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth-store';
import { useOfertaStore } from '../../stores/ofertaStore';
import { AuthTemplate } from '../templates/AuthTemplate';
import '../../css/pages/DetalleOfertaPage.css'
const DetalleOfertaPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { ofertaActual, isLoading, cargarOferta } = useOfertaStore();

  useEffect(() => {
    if (id) {
      cargarOferta(id);
    }
  }, [id, cargarOferta]);

  const formatSalario = (salario: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(salario);
  };

  const getTipoTrabajoLabel = (tipo: string) => {
    const tipos: Record<string, string> = {
      remoto: 'Remoto',
      presencial: 'Presencial',
      hibrido: 'Híbrido',
    };
    return tipos[tipo] || tipo;
  };

  if (isLoading) {
    return (
      <AuthTemplate title="Detalle oferta" subtitle="Cargando información...">
        <div className="loading-spinner">Cargando...</div>
      </AuthTemplate>
    );
  }

  if (!ofertaActual) {
    return (
      <AuthTemplate title="Detalle oferta" subtitle="Oferta no encontrada">
        <div className="detalle-error">
          <p>La oferta que buscas no existe</p>
          <button onClick={() => navigate(-1)} className="detalle-back-btn">
            ← Volver
          </button>
        </div>
      </AuthTemplate>
    );
  }

  return (
    <AuthTemplate title={ofertaActual.titulo} subtitle={`Publicado por ${ofertaActual.empresaNombre}`}>
      <div className="detalle-oferta">
        <div className="detalle-info">
          <div className="detalle-info-row">
            <span className="detalle-label">📍 Ubicación:</span>
            <span>{ofertaActual.ubicacion}</span>
          </div>
          <div className="detalle-info-row">
            <span className="detalle-label">💼 Tipo:</span>
            <span className={`detalle-tipo ${ofertaActual.tipoTrabajo}`}>
              {getTipoTrabajoLabel(ofertaActual.tipoTrabajo)}
            </span>
          </div>
          <div className="detalle-info-row">
            <span className="detalle-label">💰 Salario:</span>
            <span>{formatSalario(ofertaActual.salarioMin)} - {formatSalario(ofertaActual.salarioMax)}</span>
          </div>
          <div className="detalle-info-row">
            <span className="detalle-label">📅 Publicada:</span>
            <span>{new Date(ofertaActual.fechaPublicacion).toLocaleDateString('es-CL')}</span>
          </div>
          <div className="detalle-info-row">
            <span className="detalle-label">📌 Estado:</span>
            <span className={`detalle-estado ${ofertaActual.estado}`}>
              {ofertaActual.estado === 'activa' ? 'Activa' : 'Cerrada'}
            </span>
          </div>
        </div>

        <div className="detalle-seccion">
          <h3>📝 Descripción del puesto</h3>
          <p>{ofertaActual.descripcion}</p>
        </div>

        <div className="detalle-seccion">
          <h3>🔧 Requisitos</h3>
          <p>{ofertaActual.requisitos}</p>
        </div>

        <div className="detalle-actions">
          <button onClick={() => navigate(-1)} className="detalle-back-btn">
            ← Volver
          </button>
          {user?.rol === 'candidato' && ofertaActual.estado === 'activa' && (
            <button className="detalle-aplicar-btn">
              📝 Aplicar ahora
            </button>
          )}
          {user?.rol === 'empresa' && user.id === ofertaActual.empresaId && (
            <button onClick={() => navigate(`/editar-oferta/${ofertaActual.id}`)} className="detalle-editar-btn">
              ✏️ Editar oferta
            </button>
          )}
        </div>
      </div>
    </AuthTemplate>
  );
};

export default DetalleOfertaPage;
