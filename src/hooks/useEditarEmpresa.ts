import { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '../stores/auth-store';
import type { EditarEmpresaFormData } from '../schemas/editarEmpresaSchema';

export const useEditarEmpresa = () => {
  const { user } = useAuthStore();

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<EditarEmpresaFormData | null>(null);

  const updateFormData = useCallback((data: EditarEmpresaFormData) => {
    setFormData(data);
  }, []);

  const saveChanges = useCallback(async () => {
    if (!formData) return false;

    setIsSaving(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Datos guardados:', formData);
      return true;
    } catch {
      setError('Error al guardar los cambios');
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [formData]);

  const getMockData = useCallback((): EditarEmpresaFormData => ({
    nombreEmpresa: user?.nombre || 'Tech Solutions S.A.',
    email: user?.email || 'contacto@techsolutions.cl',
    rut: '12345678-9',
    telefono: '+56 2 1234 5678',
    direccion: 'Santiago, Chile',
    descripcion: 'Empresa de tecnología con más de 10 años de experiencia en el mercado digital.',
    sitioWeb: 'https://techsolutions.cl',
    tamanio: '11-50',
    sector: 'tecnologia',
  }), [user]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        if (isMounted) {
          setFormData(getMockData());
        }
      } catch {
        if (isMounted) {
          setError('Error al cargar los datos del perfil');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [getMockData]);

  return {
    formData,
    isLoading,
    isSaving,
    error,
    updateFormData,
    saveChanges,
  };
};
