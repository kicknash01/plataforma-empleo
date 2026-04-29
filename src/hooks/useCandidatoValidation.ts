import { useState, useCallback } from 'react';

// Interfaz que define la forma de los datos del formulario
interface FormData {
  nombre: string;
  email: string;
  password: string;
  confirmPassword: string;
  edad: string;
  telefono: string;
  direccion: string;
  experiencia: string;
  areaTrabajo: string;
  descripcion: string;
}

// Interfaz que define la firma de cada función de validación
interface ValidationRules {
  nombre: (value: string) => string;
  email: (value: string) => string;
  password: (value: string) => string;
  confirmPassword: (value: string, password: string) => string;
  edad: (value: string) => string;
  experiencia: (value: string) => string;
  descripcion: (value: string) => string;
}

// Reglas de validación (la lógica de negocio)
const validationRules: ValidationRules = {
  nombre: (value) => {
    if (!value) return 'El nombre es requerido';
    if (value.length < 3) return 'El nombre debe tener al menos 3 caracteres';
    if (value.length > 100) return 'El nombre no puede tener más de 100 caracteres';
    return '';
  },
  email: (value) => {
    if (!value) return 'El email es requerido';
    if (!value.includes('@')) return 'Email inválido';
    return '';
  },
  password: (value) => {
    if (!value) return 'La contraseña es requerida';
    if (value.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
    return '';
  },
  confirmPassword: (value, password) => {
    if (value !== password) return 'Las contraseñas no coinciden';
    return '';
  },
  edad: (value) => {
    if (!value) return 'La edad es requerida';
    const edadNum = Number(value);
    if (isNaN(edadNum)) return 'La edad debe ser un número';
    if (edadNum < 18) return 'Debes ser mayor de 18 años';
    if (edadNum > 100) return 'Edad inválida';
    return '';
  },
  experiencia: (value) => {
    if (!value) return '';
    const expNum = Number(value);
    if (isNaN(expNum)) return 'Debe ser un número';
    if (expNum < 0) return 'No puede ser negativo';
    if (expNum > 50) return 'No puede superar 50 años';
    return '';
  },
  descripcion: (value) => {
    if (value.length > 500) return 'No puede tener más de 500 caracteres';
    return '';
  },
};

export const useCandidatoValidation = () => {
  // Estado que guarda los errores de cada campo
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = useCallback((name: string, value: string, formData?: FormData) => {
    let error = '';

    if (name === 'confirmPassword' && formData) {
      error = validationRules.confirmPassword(value, formData.password);
    } else if (validationRules[name as keyof ValidationRules]) {
      const rule = validationRules[name as keyof ValidationRules] as (value: string) => string;
      error = rule(value);
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error === '';
  }, []);

  // Valida todos los campos (usado antes de enviar)
  const validateAll = useCallback((formData: FormData) => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    const nombreError = validationRules.nombre(formData.nombre);
    if (nombreError) { newErrors.nombre = nombreError; isValid = false; }

    const emailError = validationRules.email(formData.email);
    if (emailError) { newErrors.email = emailError; isValid = false; }

    const passwordError = validationRules.password(formData.password);
    if (passwordError) { newErrors.password = passwordError; isValid = false; }

    const confirmError = validationRules.confirmPassword(formData.confirmPassword, formData.password);
    if (confirmError) { newErrors.confirmPassword = confirmError; isValid = false; }

    const edadError = validationRules.edad(formData.edad);
    if (edadError) { newErrors.edad = edadError; isValid = false; }

    const experienciaError = validationRules.experiencia(formData.experiencia);
    if (experienciaError) { newErrors.experiencia = experienciaError; isValid = false; }

    const descripcionError = validationRules.descripcion(formData.descripcion);
    if (descripcionError) { newErrors.descripcion = descripcionError; isValid = false; }

    setErrors(newErrors);
    return isValid;
  }, []);

  const clearError = useCallback((name: string) => {
    setErrors((prev) => ({ ...prev, [name]: '' }));
  }, []);

  return { errors, setErrors, validateField, validateAll, clearError };
};
