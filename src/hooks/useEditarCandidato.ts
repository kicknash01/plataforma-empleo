// src/hooks/useEditarCandidato.ts

import { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '../stores/auth-store';
import type { EditarCandidatoFormData } from '../schemas/editarCandidatoSchema';

export const useEditarCandidato = () => {
  const { user } = useAuthStore();

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<EditarCandidatoFormData | null>(null);

  const updateFormData = useCallback((data: EditarCandidatoFormData) => {
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

  const getMockData = useCallback((): EditarCandidatoFormData => ({
    nombre: user?.nombre || 'Candidato Demo',
    email: user?.email || 'demo@candidato.com',
    telefono: '+56 9 1234 5678',
    direccion: 'Santiago, Chile',
    experiencia: 3,
    areaTrabajo: 'Frontend',
    descripcion: 'Desarrollador frontend con experiencia en React y TypeScript',
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
