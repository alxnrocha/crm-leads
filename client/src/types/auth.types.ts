export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'sales';
  avatar_url?: string | null;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  role?: 'admin' | 'sales';
}
