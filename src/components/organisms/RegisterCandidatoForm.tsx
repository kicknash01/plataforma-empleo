import React, { useState, useCallback } from 'react';
import { Button } from '../atoms/Button';
import { ErrorAlert } from '../molecules/ErrorAlert';
import { RegisterCandidatoBasicFields } from './RegisterCandidatoBasicFields';
import { RegisterCandidatoOptionalFields } from './RegisterCandidatoOptionalFields';
import { useCandidatoValidation } from '../../hooks/useCandidatoValidation';
import { areasTrabajo, type RegisterCandidatoFormData } from '../../schemas/registerCandidatoSchema';
import '../../css/organisms/RegisterCandidatoForm.css';

interface RegisterCandidatoFormProps {
  onSubmit: (data: RegisterCandidatoFormData) => void;
  isLoading?: boolean;
  serverError?: string | null;
  onClearError?: () => void;
}

const areaOptions = areasTrabajo.map(area => ({ value: area, label: area }));

const INITIAL_FORM_DATA = {
  nombre: '', email: '', password: '', confirmPassword: '',
  edad: '', telefono: '', direccion: '', experiencia: '', areaTrabajo: '', descripcion: '',
};

export const RegisterCandidatoForm: React.FC<RegisterCandidatoFormProps> = ({
  onSubmit,
  isLoading = false,
  serverError,
  onClearError,
}) => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const { errors, validateField, validateAll } = useCandidatoValidation();

  const handleChange = useCallback((name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value, formData);
  }, [validateField, formData]);

  const handleSubmit = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
    if (validateAll(formData)) {
      const submitData = {
        ...formData,
        edad: Number(formData.edad),
        experiencia: formData.experiencia ? Number(formData.experiencia) : undefined,
      } as RegisterCandidatoFormData;
      onSubmit(submitData);
    }
  }, [validateAll, formData, onSubmit]);

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <ErrorAlert message={serverError ?? null} onClose={onClearError || (() => { })} />

      <RegisterCandidatoBasicFields
        formData={formData}
        errors={errors}
        handleChange={handleChange}
        validateField={(name, value) => validateField(name, value, formData)}
      />

      <RegisterCandidatoOptionalFields
        formData={formData}
        errors={errors}
        handleChange={handleChange}
        validateField={(name, value) => validateField(name, value, formData)}
        areaOptions={areaOptions}
      />

      <Button type="submit" disabled={isLoading} variant="primary">
        {isLoading ? 'Registrando...' : 'Registrarme como Candidato'}
      </Button>
    </form>
  );
};
