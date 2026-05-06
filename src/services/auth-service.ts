import type { LoginCredentials, AuthResponse } from "../interfaces/auth.interfaces";

const API_URL = 'https://rb93kccl-3000.use2.devtunnels.ms';
const USE_MOCK = true;

export const authService = {
  // Única función de login (detecta rol automáticamente por email)
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (credentials.email === 'demo@candidato.com' && credentials.password === '123456') {
        return {
          access_token: 'mock-token-candidato-' + Math.random().toString(36),
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

      if (credentials.email === 'demo@empresa.com' && credentials.password === '123456') {
        return {
          access_token: 'mock-token-empresa-' + Math.random().toString(36),
          refresh_token: 'mock-refresh-token',
          user: {
            id: 2,
            email: credentials.email,
            nombre: 'Tech Solutions S.A.',
            rol: 'empresa',
            email_verificado: true,
          },
        };
      }

      throw new Error('Credenciales inválidas');
    }

    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Error en el login');
    return data;
  },

  loginCandidato: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    return authService.login(credentials);
  },

  loginEmpresa: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    return authService.login(credentials);
  },

  // Verificar email con token
  verificarEmail: async (token: string): Promise<{ message: string }> => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (token && token.length > 0) {
        return { message: 'Email verificado correctamente' };
      }
      throw new Error('Token inválido');
    }

    const response = await fetch(`${API_URL}/auth/verificar-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Error al verificar email');
    return data;
  },

  // Reenviar email de verificación
  reenviarVerificacion: async (email: string): Promise<{ message: string }> => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockToken = 'mock-token-' + Math.random().toString(36);
      console.log(`📧 Reenviando verificación a: ${email}`);
      console.log(`🔗 Link: http://localhost:5173/verificar-email?token=${mockToken}`);

      return { message: 'Email de verificación reenviado' };
    }

    const response = await fetch(`${API_URL}/auth/reenviar-verificacion`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Error al reenviar verificación');
    return data;
  },

  // RECUPERACIÓN DE CONTRASEÑA

  // Solicitar recuperación de contraseña
  solicitarRecuperacion: async (email: string): Promise<{ message: string }> => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockToken = 'reset-token-' + Math.random().toString(36);
      console.log(`📧 Email de recuperación enviado a: ${email}`);
      console.log(`🔗 Link para resetear contraseña: http://localhost:5173/resetear-password?token=${mockToken}`);

      return { message: 'Email de recuperación enviado' };
    }

    const response = await fetch(`${API_URL}/auth/solicitar-recuperacion`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Error al solicitar recuperación');
    return data;
  },

  // Resetear contraseña con token
  resetearPassword: async (token: string, newPassword: string): Promise<{ message: string }> => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (token && token.startsWith('reset-token-')) {
        return { message: 'Contraseña restablecida correctamente' };
      }
      throw new Error('Token inválido o expirado');
    }

    const response = await fetch(`${API_URL}/auth/resetear-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, newPassword }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Error al restablecer contraseña');
    return data;
  },
};
