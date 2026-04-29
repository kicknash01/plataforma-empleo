import React from 'react';
import { InputField } from '../molecules/InputField';
import { SelectField } from '../molecules/SelectField';
import { TextareaField } from '../molecules/TextareaField';

interface OptionalFieldsProps {
  formData: {
    sitioWeb: string;
    tamanio: string;
    sector: string;
    descripcion: string;
  };
  errors: Record<string, string>;
  handleChange: (name: string, value: string) => void;
  validateField: (name: string, value: string) => void;
  tamanioOptions: Array<{ value: string; label: string }>;
  sectorOptions: Array<{ value: string; label: string }>;
}

export const RegisterEmpresaOptionalFields: React.FC<OptionalFieldsProps> = ({
  formData,
  errors,
  handleChange,
  validateField,
  tamanioOptions,
  sectorOptions,
}) => {
  return (
    <>
      <InputField
        label="🌐 Sitio web (opcional)"
        type="url"
        placeholder="https://www.miempresa.com"
        value={formData.sitioWeb}
        onChange={(value) => handleChange('sitioWeb', value)}
        onBlur={() => validateField('sitioWeb', formData.sitioWeb)}
        error={errors.sitioWeb}
      />

      <SelectField
        label="📊 Tamaño de la empresa (opcional)"
        value={formData.tamanio}
        onChange={(value) => handleChange('tamanio', value)}
        options={tamanioOptions}
        placeholder="Selecciona el tamaño"
        error={errors.tamanio}
      />

      <SelectField
        label="🏭 Sector (opcional)"
        value={formData.sector}
        onChange={(value) => handleChange('sector', value)}
        options={sectorOptions}
        placeholder="Selecciona el sector"
        error={errors.sector}
      />

      <TextareaField
        label="📝 Descripción de la empresa"
        value={formData.descripcion}
        onChange={(value) => handleChange('descripcion', value)}
        placeholder="Describe qué hace tu empresa, misión, visión, valores..."
        rows={5}
        error={errors.descripcion}
        maxLength={1000}
        showCounter={true}
      />
    </>
  );
};
