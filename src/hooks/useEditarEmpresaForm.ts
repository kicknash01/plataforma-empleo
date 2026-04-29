import { useState, useCallback } from 'react';
import type { EditarEmpresaFormData } from '../schemas/editarEmpresaSchema';

export const useEditarEmpresaForm = (initialData: EditarEmpresaFormData | null) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = useCallback((name: string, value: string | number) => {
    let error = '';

    switch (name) {
      case 'nombreEmpresa':
        if (!value) error = 'El nombre es requerido';
        else if (String(value).length < 3) error = 'Debe tener al menos 3 caracteres';
        else if (String(value).length > 100) error = 'No puede tener más de 100 caracteres';
        break;
      case 'email':
        if (!value) error = 'El email es requerido';
        else if (!String(value).includes('@')) error = 'Email inválido';
        break;
      case 'rut':
        if (!value) error = 'El RUT es requerido';
        else {
          const rutRegex = /^\d{7,8}-[\dkK]$/;
          if (!rutRegex.test(String(value))) error = 'Formato inválido (ejemplo: 12345678-9)';
        }
        break;
      case 'telefono':
        if (!value) error = 'El teléfono es requerido';
        else if (String(value).length < 8) error = 'Debe tener al menos 8 dígitos';
        break;
      case 'direccion':
        if (!value) error = 'La dirección es requerida';
        else if (String(value).length < 5) error = 'Debe tener al menos 5 caracteres';
        break;
      case 'descripcion':
        if (!value) error = 'La descripción es requerida';
        else if (String(value).length < 20) error = 'Debe tener al menos 20 caracteres';
        else if (String(value).length > 1000) error = 'No puede tener más de 1000 caracteres';
        break;
      case 'sitioWeb':
        if (value) {
          const urlStr = String(value);
          if (!urlStr.startsWith('http://') && !urlStr.startsWith('https://')) {
            error = 'Debe comenzar con http:// o https://';
          }
        }
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

    // Validar nombreEmpresa
    if (!formData.nombreEmpresa) {
      newErrors.nombreEmpresa = 'El nombre es requerido';
      isValid = false;
    } else if (formData.nombreEmpresa.length < 3) {
      newErrors.nombreEmpresa = 'Debe tener al menos 3 caracteres';
      isValid = false;
    } else if (formData.nombreEmpresa.length > 100) {
      newErrors.nombreEmpresa = 'No puede tener más de 100 caracteres';
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

    // Validar rut
    if (!formData.rut) {
      newErrors.rut = 'El RUT es requerido';
      isValid = false;
    } else {
      const rutRegex = /^\d{7,8}-[\dkK]$/;
      if (!rutRegex.test(formData.rut)) {
        newErrors.rut = 'Formato inválido (ejemplo: 12345678-9)';
        isValid = false;
      }
    }

    // Validar teléfono
    if (!formData.telefono) {
      newErrors.telefono = 'El teléfono es requerido';
      isValid = false;
    } else if (formData.telefono.length < 8) {
      newErrors.telefono = 'Debe tener al menos 8 dígitos';
      isValid = false;
    }

    // Validar dirección
    if (!formData.direccion) {
      newErrors.direccion = 'La dirección es requerida';
      isValid = false;
    } else if (formData.direccion.length < 5) {
      newErrors.direccion = 'Debe tener al menos 5 caracteres';
      isValid = false;
    }

    // Validar descripción
    if (!formData.descripcion) {
      newErrors.descripcion = 'La descripción es requerida';
      isValid = false;
    } else if (formData.descripcion.length < 20) {
      newErrors.descripcion = 'Debe tener al menos 20 caracteres';
      isValid = false;
    } else if (formData.descripcion.length > 1000) {
      newErrors.descripcion = 'No puede tener más de 1000 caracteres';
      isValid = false;
    }

    // Validar sitio web (opcional)
    if (formData.sitioWeb) {
      if (!formData.sitioWeb.startsWith('http://') && !formData.sitioWeb.startsWith('https://')) {
        newErrors.sitioWeb = 'Debe comenzar con http:// o https://';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  }, [formData]);

  const handleChange = useCallback((name: string, value: string) => {
    if (!formData) return;
    setFormData((prev) => prev ? { ...prev, [name]: value } : prev);
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
