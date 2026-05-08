import React from 'react';
import type { Oferta } from '../../schemas/ofertaSchema';

interface OfertaCardProps {
  oferta: Oferta;
  showActions?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
}

export const OfertaCard: React.FC<OfertaCardProps> = ({
  oferta,
  showActions = false,
  onEdit,
  onDelete,
  onView,
}) => {
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

  const getEstadoClass = (estado: string) => {
    return estado === 'activa' ? 'estado-activa' : 'estado-cerrada';
  };

  return (
    <div className="oferta-card">
      <div className="oferta-card-header">
        <h3>{oferta.titulo}</h3>
      </div>

      <div className="oferta-card-empresa">
        <span>{oferta.empresaNombre}</span>
      </div>

      <div className="oferta-card-info">
        <span className="oferta-ubicacion">{oferta.ubicacion}</span>
        <span className={`oferta-tipo ${getTipoTrabajoLabel(oferta.tipoTrabajo).toLowerCase()}`}>
          {getTipoTrabajoLabel(oferta.tipoTrabajo)}
        </span>
      </div>

      <div className="oferta-card-salario">
        {formatSalario(oferta.salarioMin)} - {formatSalario(oferta.salarioMax)}
      </div>

      <p className="oferta-card-descripcion">
        {oferta.descripcion.length > 120
          ? `${oferta.descripcion.substring(0, 120)}...`
          : oferta.descripcion}
      </p>

      <div className="oferta-card-footer">
        <span className={`oferta-estado ${getEstadoClass(oferta.estado)}`}>
          {oferta.estado === 'activa' ? 'Activa' : 'Cerrada'}
        </span>
        <button onClick={onView} className="oferta-btn-ver">
          Ver detalles
        </button>
      </div>

      {showActions && (
        <div className="oferta-card-actions">
          <button onClick={onEdit} className="oferta-btn-editar">
            Editar
          </button>
          <button onClick={onDelete} className="oferta-btn-eliminar">
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
};
