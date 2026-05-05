export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface User {
  id: number;
  email: string;
  nombre: string;
  rol: 'candidato' | 'empresa';
  email_verificado: boolean;
}
