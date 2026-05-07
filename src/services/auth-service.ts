import type { LoginCredentials, AuthResponse } from "../interfaces/auth.interfaces";

const API_URL: string = 'http://localhost:3000';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error en el login');
    }

    const user = await authService.getCurrentUser();

    // Devolvemos un objeto compatible con AuthResponse (los tokens ya no se usan en frontend)
    return user;
  },

  // Obtener usuario actual usando la cookie de sesión
  getCurrentUser: async () => {
    const response = await fetch(`${API_URL}/auth`, {
      credentials: 'include', // envía la cookie automáticamente
    });
    if (!response.ok) throw new Error('No autenticado');
    const user = await response.json();
    return user;
  },

  refreshSession: async () => {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    });
    if (!response.ok) throw new Error('No se pudo refrescar la sesión');
    return response.json(); // Podría devolver { message: "Session refreshed" }
  },

  // Cerrar sesión (endpoint que elimina las cookies)
  logout: async () => {
    await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
  },
}
