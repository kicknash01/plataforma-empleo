import React from 'react';
import { InputField } from './molecules/InputField';
import { TextareaField } from './molecules/TextareaField';
import { Button } from './atoms/Button';
import { ErrorAlert } from './molecules/ErrorAlert';
import type { EditarCandidatoFormData } from '../schemas/editarCandidatoSchema';

interface EditarPerfilFormProps {
  formData: EditarCandidatoFormData;
  errors: Record<string, string>;
  isSaving: boolean;
  serverError: string | null;
  areaOptions: Array<{ value: string; label: string }>;
  onSubmit: (event: React.SyntheticEvent) => void;
  onCancel: () => void;
  handleChange: (name: string, value: string) => void;
  validateField: (name: string, value: string | number) => void;
}

export const EditarPerfilForm: React.FC<EditarPerfilFormProps> = ({
  formData,
  errors,
  isSaving,
  serverError,
  areaOptions,
  onSubmit,
  onCancel,
  handleChange,
  validateField,
}) => {
  return (
    <form onSubmit={onSubmit} className="editar-perfil-form">
      <ErrorAlert message={serverError} onClose={() => { }} />

      <InputField
        label="👤 Nombre completo"
        type="text"
        placeholder="Juan Pérez"
        value={formData.nombre}
        onChange={(value) => handleChange('nombre', value)}
        onBlur={() => validateField('nombre', formData.nombre)}
        error={errors.nombre}
      />

      <InputField
        label="📧 Correo electrónico"
        type="email"
        placeholder="juan@ejemplo.com"
        value={formData.email}
        onChange={(value) => handleChange('email', value)}
        onBlur={() => validateField('email', formData.email)}
        error={errors.email}
      />

      <InputField
        label="📞 Teléfono (opcional)"
        type="tel"
        placeholder="+56 9 1234 5678"
        value={formData.telefono || ''}
        onChange={(value) => handleChange('telefono', value)}
        onBlur={() => { }}
        error={errors.telefono}
      />

      <InputField
        label="📍 Dirección (opcional)"
        type="text"
        placeholder="Santiago, Chile"
        value={formData.direccion || ''}
        onChange={(value) => handleChange('direccion', value)}
        onBlur={() => { }}
        error={errors.direccion}
      />

      <InputField
        label="💼 Años de experiencia"
        type="number"
        placeholder="3"
        value={formData.experiencia?.toString() || ''}
        onChange={(value) => handleChange('experiencia', value)}
        onBlur={() => validateField('experiencia', formData.experiencia?.toString() || '')}
        error={errors.experiencia}
      />

      <div className="form-group">
        <label className="form-label">🛠️ Área de trabajo</label>
        <select
          value={formData.areaTrabajo || ''}
          onChange={(e) => handleChange('areaTrabajo', e.target.value)}
          className="form-select"
        >
          <option value="">Selecciona un área</option>
          {areaOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <TextareaField
        label="📝 Descripción profesional"
        value={formData.descripcion || ''}
        onChange={(value) => handleChange('descripcion', value)}
        placeholder="Cuéntanos sobre tu experiencia, habilidades y objetivos..."
        rows={4}
        error={errors.descripcion}
        maxLength={500}
        showCounter={true}
        onBlur={() => validateField('descripcion', formData.descripcion || '')}
      />

      <div className="form-buttons">
        <Button type="button" variant="danger" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary" disabled={isSaving}>
          {isSaving ? 'Guardando...' : 'Guardar cambios'}
        </Button>
      </div>
    </form>
  );
};
