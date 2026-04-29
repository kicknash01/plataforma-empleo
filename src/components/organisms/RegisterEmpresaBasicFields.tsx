import React from 'react';
import { InputField } from '../molecules/InputField';
import { PasswordInput } from '../molecules/PasswordInput';

interface BasicFieldsProps {
  formData: {
    nombreEmpresa: string;
    email: string;
    password: string;
    confirmPassword: string;
    rut: string;
    telefono: string;
    direccion: string;
  };
  errors: Record<string, string>;
  handleChange: (name: string, value: string) => void;
  validateField: (name: string, value: string) => void;
}

export const RegisterEmpresaBasicFields: React.FC<BasicFieldsProps> = ({
  formData,
  errors,
  handleChange,
  validateField,
}) => {
  return (
    <>
      <InputField
        label="🏢 Nombre de la empresa"
        type="text"
        placeholder="Mi Empresa S.A."
        value={formData.nombreEmpresa}
        onChange={(value) => handleChange('nombreEmpresa', value)}
        onBlur={() => validateField('nombreEmpresa', formData.nombreEmpresa)}
        error={errors.nombreEmpresa}
      />

      <InputField
        label="📧 Correo electrónico"
        type="email"
        placeholder="contacto@miempresa.com"
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
        label="📄 RUT"
        type="text"
        placeholder="12345678-9"
        value={formData.rut}
        onChange={(value) => handleChange('rut', value)}
        onBlur={() => validateField('rut', formData.rut)}
        error={errors.rut}
      />

      <InputField
        label="📞 Teléfono"
        type="tel"
        placeholder="+56 2 1234 5678"
        value={formData.telefono}
        onChange={(value) => handleChange('telefono', value)}
        onBlur={() => validateField('telefono', formData.telefono)}
        error={errors.telefono}
      />

      <InputField
        label="📍 Dirección"
        type="text"
        placeholder="Santiago, Chile"
        value={formData.direccion}
        onChange={(value) => handleChange('direccion', value)}
        onBlur={() => validateField('direccion', formData.direccion)}
        error={errors.direccion}
      />
    </>
  );
};
