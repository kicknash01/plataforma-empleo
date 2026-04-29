import React, { useState, useCallback } from 'react';
import { Button } from '../atoms/Button';
import { ErrorAlert } from '../molecules/ErrorAlert';
import { RegisterEmpresaBasicFields } from './RegisterEmpresaBasicFields';
import { RegisterEmpresaOptionalFields } from './RegisterEmpresaOptionalFields';
import { useEmpresaValidation } from '../../hooks/useEmpresaValidation';
import { tamaniosEmpresa, sectoresEmpresa, type RegisterEmpresaFormData } from '../../schemas/registerEmpresaSchema';
import '../../css/organisms/RegisterEmpresaForm.css';

interface RegisterEmpresaFormProps {
  onSubmit: (data: RegisterEmpresaFormData) => void;
  isLoading?: boolean;
  serverError?: string | null;
  onClearError?: () => void;
}

const INITIAL_FORM_DATA = {
  nombreEmpresa: '',
  email: '',
  password: '',
  confirmPassword: '',
  rut: '',
  telefono: '',
  direccion: '',
  descripcion: '',
  sitioWeb: '',
  tamanio: '',
  sector: '',
};

export const RegisterEmpresaForm: React.FC<RegisterEmpresaFormProps> = ({
  onSubmit,
  isLoading = false,
  serverError,
  onClearError,
}) => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const { errors, validateField, validateAll } = useEmpresaValidation();

  const handleChange = useCallback((name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value, formData);
  }, [validateField, formData]);

  const handleSubmit = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
    if (validateAll(formData)) {
      const submitData = formData as RegisterEmpresaFormData;
      onSubmit(submitData);
    }
  }, [validateAll, formData, onSubmit]);

  return (
    <form onSubmit={handleSubmit} className="register-empresa-form">
      <ErrorAlert message={serverError ?? null} onClose={onClearError || (() => { })} />

      <RegisterEmpresaBasicFields
        formData={formData}
        errors={errors}
        handleChange={handleChange}
        validateField={(name, value) => validateField(name, value, formData)}
      />

      <RegisterEmpresaOptionalFields
        formData={formData}
        errors={errors}
        handleChange={handleChange}
        validateField={(name, value) => validateField(name, value, formData)}
        tamanioOptions={tamaniosEmpresa}
        sectorOptions={sectoresEmpresa}
      />

      <Button type="submit" disabled={isLoading} variant="success">
        {isLoading ? 'Registrando...' : 'Registrar Empresa'}
      </Button>
    </form>
  );
};
