import React from 'react';
import { InputField } from '../molecules/InputField';
import { PasswordInput } from '../molecules/PasswordInput';

interface BasicFieldsProps {
  formData: {
    nombre: string;
    email: string;
    password: string;
    confirmPassword: string;
    edad: string;
  };
  errors: Record<string, string>;
  handleChange: (name: string, value: string) => void;
  validateField: (name: string, value: string) => void;
}

export const RegisterCandidatoBasicFields: React.FC<BasicFieldsProps> = ({
  formData,
  errors,
  handleChange,
  validateField,
}) => {
  return (
    <>
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

      <PasswordInput
        value={formData.password}
        onChange={(value) => handleChange('password', value)}
        onBlur={() => validateField('password', formData.password)}
        error={errors.password}
      />

      <PasswordInput
        value={formData.confirmPassword}
        onChange={(value) => handleChange('confirmPassword', value)}
        onBlur={() => validateField('confirmPassword', formData.confirmPassword)}
        error={errors.confirmPassword}
      />

      <InputField
        label="🎂 Edad"
        type="number"
        placeholder="25"
        value={formData.edad}
        onChange={(value) => handleChange('edad', value)}
        onBlur={() => validateField('edad', formData.edad)}
        error={errors.edad}
      />
    </>
  );
};
