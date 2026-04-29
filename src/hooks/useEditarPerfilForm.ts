import { useState, useCallback } from 'react';
import type { EditarCandidatoFormData } from '../schemas/editarCandidatoSchema';

export const useEditarPerfilForm = (initialData: EditarCandidatoFormData | null) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = useCallback((name: string, value: string | number) => {
    let error = '';

    switch (name) {
      case 'nombre':
        if (!value) error = 'El nombre es requerido';
        else if (String(value).length < 3) error = 'El nombre debe tener al menos 3 caracteres';
        else if (String(value).length > 100) error = 'El nombre no puede tener más de 100 caracteres';
        break;
      case 'email':
        if (!value) error = 'El email es requerido';
        else if (!String(value).includes('@')) error = 'Email inválido';
        break;
      case 'experiencia':
        if (value) {
          const expNum = Number(value);
          if (isNaN(expNum)) error = 'Debe ser un número';
          else if (expNum < 0) error = 'No puede ser negativo';
          else if (expNum > 50) error = 'No puede superar 50 años';
        }
        break;
      case 'descripcion':
        if (String(value).length > 500) error = 'No puede tener más de 500 caracteres';
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error === '';
  }, []);

  const validateAll = useCallback(() => {
    if (!formData) return false;

    let isValid = true;
    const newErrors: Record<string, string> = {};

    // Validar nombre
    if (!formData.nombre) {
      newErrors.nombre = 'El nombre es requerido';
      isValid = false;
    } else if (formData.nombre.length < 3) {
      newErrors.nombre = 'El nombre debe tener al menos 3 caracteres';
      isValid = false;
    } else if (formData.nombre.length > 100) {
      newErrors.nombre = 'El nombre no puede tener más de 100 caracteres';
      isValid = false;
    }

    // Validar email
    if (!formData.email) {
      newErrors.email = 'El email es requerido';
      isValid = false;
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Email inválido';
      isValid = false;
    }

    // Validar experiencia
    if (formData.experiencia) {
      if (formData.experiencia < 0) {
        newErrors.experiencia = 'No puede ser negativo';
        isValid = false;
      } else if (formData.experiencia > 50) {
        newErrors.experiencia = 'No puede superar 50 años';
        isValid = false;
      }
    }

    // Validar descripción
    if (formData.descripcion && formData.descripcion.length > 500) {
      newErrors.descripcion = 'No puede tener más de 500 caracteres';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }, [formData]);

  const handleChange = useCallback((name: string, value: string) => {
    if (!formData) return;
    setFormData((prev) => prev ? { ...prev, [name]: value } : prev);
    // Limpiar error del campo cuando el usuario escribe
    setErrors((prev) => ({ ...prev, [name]: '' }));
  }, [formData]);

  return {
    formData,
    setFormData,
    errors,
    validateField,
    validateAll,
    handleChange,
  };
};
