import { useState, useCallback } from 'react';
import type { CrearOfertaFormData } from '../schemas/ofertaSchema';

const INITIAL_FORM_DATA: CrearOfertaFormData = {
  titulo: '',
  descripcion: '',
  requisitos: '',
  ubicacion: '',
  tipoTrabajo: 'remoto',
  salarioMin: 0,
  salarioMax: 0,
};

const VALIDATION_RULES: Record<string, (value: string | number) => string> = {
  titulo: (value) => {
    if (!value) return 'El título es requerido';
    if (String(value).length < 5) return 'Mínimo 5 caracteres';
    return '';
  },
  descripcion: (value) => {
    if (!value) return 'La descripción es requerida';
    if (String(value).length < 20) return 'Mínimo 20 caracteres';
    return '';
  },
  requisitos: (value) => {
    if (!value) return 'Los requisitos son requeridos';
    if (String(value).length < 10) return 'Mínimo 10 caracteres';
    return '';
  },
  ubicacion: (value) => {
    if (!value) return 'La ubicación es requerida';
    if (String(value).length < 3) return 'Mínimo 3 caracteres';
    return '';
  },
};

export const useOfertaForm = () => {
  const [formData, setFormData] = useState<CrearOfertaFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = useCallback((name: string, value: string | number) => {
    const rule = VALIDATION_RULES[name];
    const error = rule ? rule(value) : '';
    setErrors((prev) => ({ ...prev, [name]: error }));
    return error === '';
  }, []);

  const validateAll = useCallback(() => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    (Object.keys(INITIAL_FORM_DATA) as Array<keyof CrearOfertaFormData>).forEach((key) => {
      const value = formData[key];
      const rule = VALIDATION_RULES[key as string];
      if (rule) {
        const error = rule(value);
        if (error) {
          newErrors[key as string] = error;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [formData]);

  const handleChange = useCallback((name: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  }, [validateField]);

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
  }, []);

  return {
    formData,
    errors,
    validateField,
    validateAll,
    handleChange,
    resetForm,
  };
};
