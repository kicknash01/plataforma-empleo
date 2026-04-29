import { useState, useCallback } from 'react';

interface FormData {
  nombreEmpresa: string;
  email: string;
  password: string;
  confirmPassword: string;
  rut: string;
  telefono: string;
  direccion: string;
  descripcion: string;
  sitioWeb: string;
  tamanio: string;
  sector: string;
}

interface ValidationRules {
  nombreEmpresa: (value: string) => string;
  email: (value: string) => string;
  password: (value: string) => string;
  confirmPassword: (value: string, password: string) => string;
  rut: (value: string) => string;
  telefono: (value: string) => string;
  direccion: (value: string) => string;
  descripcion: (value: string) => string;
  sitioWeb: (value: string) => string;
}

const validationRules: ValidationRules = {
  nombreEmpresa: (value) => {
    if (!value) return 'El nombre de la empresa es requerido';
    if (value.length < 3) return 'Debe tener al menos 3 caracteres';
    if (value.length > 100) return 'No puede tener más de 100 caracteres';
    return '';
  },
  email: (value) => {
    if (!value) return 'El email es requerido';
    if (!value.includes('@')) return 'Email inválido';
    return '';
  },
  password: (value) => {
    if (!value) return 'La contraseña es requerida';
    if (value.length < 6) return 'Debe tener al menos 6 caracteres';
    return '';
  },
  confirmPassword: (value, password) => {
    if (value !== password) return 'Las contraseñas no coinciden';
    return '';
  },
  rut: (value) => {
    if (!value) return 'El RUT es requerido';
    const rutRegex = /^\d{7,8}-[\dkK]$/;
    if (!rutRegex.test(value)) return 'Formato inválido (ejemplo: 12345678-9)';
    return '';
  },
  telefono: (value) => {
    if (!value) return 'El teléfono es requerido';
    if (value.length < 8) return 'Debe tener al menos 8 dígitos';
    return '';
  },
  direccion: (value) => {
    if (!value) return 'La dirección es requerida';
    if (value.length < 5) return 'Debe tener al menos 5 caracteres';
    return '';
  },
  descripcion: (value) => {
    if (!value) return 'La descripción es requerida';
    if (value.length < 20) return 'Debe tener al menos 20 caracteres';
    if (value.length > 1000) return 'No puede tener más de 1000 caracteres';
    return '';
  },
  sitioWeb: (value) => {
    if (!value) return '';
    if (!value.startsWith('http://') && !value.startsWith('https://')) {
      return 'Debe comenzar con http:// o https://';
    }
    if (value.length < 10) {
      return 'URL demasiado corta';
    }
    return '';
  },
};

export const useEmpresaValidation = () => {
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

  const validateAll = useCallback((formData: FormData) => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    const nombreError = validationRules.nombreEmpresa(formData.nombreEmpresa);
    if (nombreError) { newErrors.nombreEmpresa = nombreError; isValid = false; }

    const emailError = validationRules.email(formData.email);
    if (emailError) { newErrors.email = emailError; isValid = false; }

    const passwordError = validationRules.password(formData.password);
    if (passwordError) { newErrors.password = passwordError; isValid = false; }

    const confirmError = validationRules.confirmPassword(formData.confirmPassword, formData.password);
    if (confirmError) { newErrors.confirmPassword = confirmError; isValid = false; }

    const rutError = validationRules.rut(formData.rut);
    if (rutError) { newErrors.rut = rutError; isValid = false; }

    const telefonoError = validationRules.telefono(formData.telefono);
    if (telefonoError) { newErrors.telefono = telefonoError; isValid = false; }

    const direccionError = validationRules.direccion(formData.direccion);
    if (direccionError) { newErrors.direccion = direccionError; isValid = false; }

    const descripcionError = validationRules.descripcion(formData.descripcion);
    if (descripcionError) { newErrors.descripcion = descripcionError; isValid = false; }

    const sitioWebError = validationRules.sitioWeb(formData.sitioWeb);
    if (sitioWebError) { newErrors.sitioWeb = sitioWebError; isValid = false; }

    setErrors(newErrors);
    return isValid;
  }, []);

  const clearError = useCallback((name: string) => {
    setErrors((prev) => ({ ...prev, [name]: '' }));
  }, []);

  return { errors, setErrors, validateField, validateAll, clearError };
};
