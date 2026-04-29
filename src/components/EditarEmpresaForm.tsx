import React from 'react';
import { InputField } from './molecules/InputField';
import { TextareaField } from './molecules/TextareaField';
import { Button } from './atoms/Button';
import { ErrorAlert } from './molecules/ErrorAlert';
import type { EditarEmpresaFormData } from '../schemas/editarEmpresaSchema';
import '../css/pages/EditarPerfilEmpresa.css';
interface EditarEmpresaFormProps {
  formData: EditarEmpresaFormData;
  errors: Record<string, string>;
  isSaving: boolean;
  serverError: string | null;
  tamanioOptions: Array<{ value: string; label: string }>;
  sectorOptions: Array<{ value: string; label: string }>;
  onSubmit: (event: React.SyntheticEvent) => void;
  onCancel: () => void;
  handleChange: (name: string, value: string) => void;
  validateField: (name: string, value: string | number) => void;
}

export const EditarEmpresaForm: React.FC<EditarEmpresaFormProps> = ({
  formData,
  errors,
  isSaving,
  serverError,
  tamanioOptions,
  sectorOptions,
  onSubmit,
  onCancel,
  handleChange,
  validateField,
}) => {
  return (
    <form onSubmit={onSubmit} className="editar-empresa-form">
      <ErrorAlert message={serverError} onClose={() => { }} />

      {/* Nombre de la empresa */}
      <InputField
        label="🏢 Nombre de la empresa"
        type="text"
        placeholder="Mi Empresa S.A."
        value={formData.nombreEmpresa}
        onChange={(value) => handleChange('nombreEmpresa', value)}
        onBlur={() => validateField('nombreEmpresa', formData.nombreEmpresa)}
        error={errors.nombreEmpresa}
      />

      {/* Email */}
      <InputField
        label="📧 Correo electrónico"
        type="email"
        placeholder="contacto@miempresa.com"
        value={formData.email}
        onChange={(value) => handleChange('email', value)}
        onBlur={() => validateField('email', formData.email)}
        error={errors.email}
      />

      {/* RUT */}
      <InputField
        label="📄 RUT"
        type="text"
        placeholder="12345678-9"
        value={formData.rut}
        onChange={(value) => handleChange('rut', value)}
        onBlur={() => validateField('rut', formData.rut)}
        error={errors.rut}
      />

      {/* Teléfono */}
      <InputField
        label="📞 Teléfono"
        type="tel"
        placeholder="+56 2 1234 5678"
        value={formData.telefono}
        onChange={(value) => handleChange('telefono', value)}
        onBlur={() => validateField('telefono', formData.telefono)}
        error={errors.telefono}
      />

      {/* Dirección */}
      <InputField
        label="📍 Dirección"
        type="text"
        placeholder="Santiago, Chile"
        value={formData.direccion}
        onChange={(value) => handleChange('direccion', value)}
        onBlur={() => validateField('direccion', formData.direccion)}
        error={errors.direccion}
      />

      {/* Sitio web (opcional) */}
      <InputField
        label="🌐 Sitio web (opcional)"
        type="url"
        placeholder="https://www.miempresa.com"
        value={formData.sitioWeb || ''}
        onChange={(value) => handleChange('sitioWeb', value)}
        onBlur={() => validateField('sitioWeb', formData.sitioWeb || '')}
        error={errors.sitioWeb}
      />

      {/* Tamaño de la empresa */}
      <div className="form-group">
        <label className="form-label">📊 Tamaño de la empresa</label>
        <select
          value={formData.tamanio || ''}
          onChange={(e) => handleChange('tamanio', e.target.value)}
          className="form-select"
        >
          <option value="">Selecciona el tamaño</option>
          {tamanioOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Sector */}
      <div className="form-group">
        <label className="form-label">🏭 Sector</label>
        <select
          value={formData.sector || ''}
          onChange={(e) => handleChange('sector', e.target.value)}
          className="form-select"
        >
          <option value="">Selecciona el sector</option>
          {sectorOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Descripción */}
      <TextareaField
        label="📝 Descripción de la empresa"
        value={formData.descripcion}
        onChange={(value) => handleChange('descripcion', value)}
        placeholder="Describe qué hace tu empresa, misión, visión, valores..."
        rows={5}
        error={errors.descripcion}
        maxLength={1000}
        showCounter={true}
        onBlur={() => validateField('descripcion', formData.descripcion)}
      />

      <div className="form-buttons">
        <Button type="button" variant="danger" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="success" disabled={isSaving}>
          {isSaving ? 'Guardando...' : 'Guardar cambios'}
        </Button>
      </div>
    </form>
  );
};
