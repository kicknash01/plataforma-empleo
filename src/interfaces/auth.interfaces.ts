export interface LoginCredentials {
  email: string;
  password: string;
}


export interface User {
  id: number;
  email: string;
  nombre: string;
  role: 'COMPANY' | 'USER';
  email_verificado: boolean;
}

export interface AuthResponse {
  user: User;
  message: string; // Ej: "Haz accedido"
}
