import React from 'react';
import { InputField } from '../molecules/InputField';
import { SelectField } from '../molecules/SelectField';
import { TextareaField } from '../molecules/TextareaField';

interface OptionalFieldsProps {
  formData: {
    telefono: string;
    direccion: string;
    experiencia: string;
    areaTrabajo: string;
    descripcion: string;
  };
  errors: Record<string, string>;
  handleChange: (name: string, value: string) => void;
  validateField: (name: string, value: string) => void;
  areaOptions: Array<{ value: string; label: string }>;
}

export const RegisterCandidatoOptionalFields: React.FC<OptionalFieldsProps> = ({
  formData,
  errors,
  handleChange,
  validateField,
  areaOptions,
}) => {
  return (
    <>
      <InputField
        label="📞 Teléfono (opcional)"
        type="tel"
        placeholder="+56 9 1234 5678"
        value={formData.telefono}
        onChange={(value) => handleChange('telefono', value)}
        onBlur={() => validateField('telefono', formData.telefono)}
        error={errors.telefono}
      />

      <InputField
        label="📍 Dirección (opcional)"
        type="text"
        placeholder="Santiago, Chile"
        value={formData.direccion}
        onChange={(value) => handleChange('direccion', value)}
        onBlur={() => validateField('direccion', formData.direccion)}
        error={errors.direccion}
      />

      <InputField
        label="💼 Años de experiencia (opcional)"
        type="number"
        placeholder="3"
        value={formData.experiencia}
        onChange={(value) => handleChange('experiencia', value)}
        onBlur={() => validateField('experiencia', formData.experiencia)}
        error={errors.experiencia}
      />

      <SelectField
        label="🛠️ Área de trabajo (opcional)"
        value={formData.areaTrabajo}
        onChange={(value) => handleChange('areaTrabajo', value)}
        options={areaOptions}
        placeholder="Selecciona un área"
        error={errors.areaTrabajo}
      />

      <TextareaField
        label="📝 Descripción profesional (opcional)"
        value={formData.descripcion}
        onChange={(value) => handleChange('descripcion', value)}
        placeholder="Cuéntanos sobre tu experiencia, habilidades y objetivos..."
        rows={4}
        error={errors.descripcion}
        maxLength={500}
        showCounter={true}
      />
    </>
  );
};
