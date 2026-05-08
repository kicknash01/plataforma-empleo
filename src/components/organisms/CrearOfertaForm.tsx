import React from 'react';
import { InputField } from '../molecules/InputField';
import { TextareaField } from '../molecules/TextareaField';
import { Button } from '../atoms/Button';
import { ErrorAlert } from '../molecules/ErrorAlert';
import { useOfertaForm } from '../../hooks/useOfertaForm';
import type { CrearOfertaFormData } from '../../schemas/ofertaSchema';  // ← IMPORTAR TIPO

interface CrearOfertaFormProps {
  onSubmit: (data: CrearOfertaFormData) => void;  // ← CORREGIDO: usar el tipo
  isLoading?: boolean;
  serverError?: string | null;
  onClearError?: () => void;
}

export const CrearOfertaForm: React.FC<CrearOfertaFormProps> = ({
  onSubmit,
  isLoading = false,
  serverError,
  onClearError,
}) => {
  const { formData, errors, handleChange, validateField, validateAll } = useOfertaForm();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (validateAll()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="crear-oferta-form">
      <ErrorAlert message={serverError ?? null} onClose={onClearError || (() => { })} />

      <InputField
        label="📌 Título del puesto"
        type="text"
        placeholder="Ej: Desarrollador React Junior"
        value={formData.titulo}
        onChange={(value) => handleChange('titulo', value)}
        onBlur={() => validateField('titulo', formData.titulo)}
        error={errors.titulo}
      />

      <TextareaField
        label="📝 Descripción del puesto"
        value={formData.descripcion}
        onChange={(value) => handleChange('descripcion', value)}
        placeholder="Describe las responsabilidades del puesto..."
        rows={4}
        error={errors.descripcion}
        maxLength={2000}
        showCounter={true}
      />

      <TextareaField
        label="🔧 Requisitos"
        value={formData.requisitos}
        onChange={(value) => handleChange('requisitos', value)}
        placeholder="Tecnologías requeridas, años de experiencia..."
        rows={4}
        error={errors.requisitos}
        maxLength={1000}
        showCounter={true}
      />

      <InputField
        label="📍 Ubicación"
        type="text"
        placeholder="Ej: Santiago, Chile (Remoto)"
        value={formData.ubicacion}
        onChange={(value) => handleChange('ubicacion', value)}
        onBlur={() => validateField('ubicacion', formData.ubicacion)}
        error={errors.ubicacion}
      />

      <div className="form-group">
        <label className="form-label">💼 Tipo de trabajo</label>
        <select
          value={formData.tipoTrabajo}
          onChange={(e) => handleChange('tipoTrabajo', e.target.value)}
          className="form-select"
        >
          <option value="remoto">Remoto</option>
          <option value="presencial">Presencial</option>
          <option value="hibrido">Híbrido</option>
        </select>
      </div>

      <div className="form-row">
        <InputField
          label="💰 Salario mínimo (CLP)"
          type="number"
          placeholder="0"
          value={formData.salarioMin.toString()}
          onChange={(value) => handleChange('salarioMin', Number(value))}
          onBlur={() => validateField('salarioMin', formData.salarioMin)}
          error={errors.salarioMin}
        />
        <InputField
          label="💰 Salario máximo (CLP)"
          type="number"
          placeholder="0"
          value={formData.salarioMax.toString()}
          onChange={(value) => handleChange('salarioMax', Number(value))}
          onBlur={() => validateField('salarioMin', formData.salarioMin)}
          error={errors.salarioMax}
        />
      </div>

      <Button type="submit" disabled={isLoading} variant="success">
        {isLoading ? 'Publicando...' : 'Publicar oferta'}
      </Button>
    </form>
  );
};
