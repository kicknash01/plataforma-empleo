import type { LoginCrendentials, AuthResponse } from "../interfaces/auth.interfaces";

const API_URL: string = 'http://localhost:3000/api';

const USE_MOCK = true;

export const authService = {
  loginCandidato: async (credentials: LoginCrendentials): Promise<AuthResponse> => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (credentials.email === 'demo@candidato.com' && credentials.password === '123456') {
        return {
          access_token: 'mock-token' + Math.random().toString(36),
          refresh_token: 'mock-refresh-token',
          user: {
            id: 1,
            email: credentials.email,
            nombre: 'Candidato Demo',
            rol: 'candidato',
            email_verificado: true,
          },
        };
      }

      throw new Error('Credenciales inválidas');
    }

    // Versión real (cuando tengas backend)
    const response = await fetch(`${API_URL}/auth/candidato/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error en el login');
    }

    return data;
  },

  loginEmpresa: async (credentials: LoginCrendentials): Promise<AuthResponse> => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (credentials.email === 'demo@empresa.com' && credentials.password === '123456') {
        return {
          access_token: 'mock-token-empresa-' + Math.random().toString(36),
          refresh_token: 'mock-refresh-toekn',
          user: {
            id: 2,
            email: credentials.email,
            nombre: 'Tech Solution S.A.',
            rol: 'empresa',
            email_verificado: true,
          },
        };
      }
      throw new Error('Credenciales inválidas. Usa demo@empresa.com / 123456')
    }

    const response = await fetch(`${API_URL}/auth/empresa/login`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Error en el login')
    return data;
  },
};



