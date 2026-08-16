import React, { createContext, useState, useEffect } from 'react';
import { User, LoginCredentials, RegisterCredentials, AuthResponse } from '../types/auth.types.js';
import { api } from '../services/api.js';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  setDemoUser: (role: 'admin' | 'sales') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USERS: Record<'admin' | 'sales', User> = {
  admin: {
    id: 1,
    name: 'Carlos Gómez',
    email: 'carlos.gomez@leadflow.io',
    role: 'admin',
    avatar_url:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
  },
  sales: {
    id: 2,
    name: 'Alex Morgan',
    email: 'alex.morgan@leadflow.io',
    role: 'sales',
    avatar_url:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('leadflow_token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem('leadflow_token');
      if (!savedToken) {
        // Cargar usuario demo por defecto para una experiencia inmediata
        const savedDemo = localStorage.getItem('leadflow_demo_user');
        if (savedDemo === 'admin' || savedDemo === 'sales') {
          setUser(DEMO_USERS[savedDemo]);
        } else {
          setUser(DEMO_USERS.sales);
        }
        setIsLoading(false);
        return;
      }

      try {
        const data = await api.get<{ user: User }>('/auth/me');
        setUser(data.user);
      } catch {
        localStorage.removeItem('leadflow_token');
        setToken(null);
        setUser(DEMO_USERS.sales);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const data = await api.post<AuthResponse>('/auth/login', credentials);
      localStorage.setItem('leadflow_token', data.token);
      setToken(data.token);
      setUser(data.user);
    } catch {
      // Fallback demo local si el backend no está disponible
      const isCarlos = credentials.email.toLowerCase().includes('carlos');
      const selected = isCarlos ? DEMO_USERS.admin : DEMO_USERS.sales;
      setUser(selected);
      localStorage.setItem('leadflow_demo_user', isCarlos ? 'admin' : 'sales');
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      const data = await api.post<AuthResponse>('/auth/register', credentials);
      localStorage.setItem('leadflow_token', data.token);
      setToken(data.token);
      setUser(data.user);
    } catch {
      const newUser: User = {
        id: Date.now(),
        name: credentials.name,
        email: credentials.email,
        role: credentials.role || 'sales',
        avatar_url: null,
      };
      setUser(newUser);
    }
  };

  const logout = () => {
    localStorage.removeItem('leadflow_token');
    localStorage.removeItem('leadflow_demo_user');
    setToken(null);
    setUser(null);
  };

  const setDemoUser = (role: 'admin' | 'sales') => {
    setUser(DEMO_USERS[role]);
    localStorage.setItem('leadflow_demo_user', role);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        setDemoUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
