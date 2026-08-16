import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { Button, Input, Card } from '../components/ui/index.js';
import { Layers, Mail, Lock, ShieldCheck, UserCheck, ArrowRight } from 'lucide-react';

interface LoginViewProps {
  onToggleRegister: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onToggleRegister }) => {
  const { login, setDemoUser } = useAuth();
  const [email, setEmail] = useState('alex.morgan@leadflow.io');
  const [password, setPassword] = useState('Password123!');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await login({ email, password });
    } catch (err) {
      setError((err as Error).message || 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Glow ambient background elements */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600 shadow-xl shadow-indigo-600/30 text-white mb-2">
            <Layers className="w-7 h-7" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">LeadFlow CRM</h1>
          <p className="text-sm text-slate-400">Plataforma de Leads B2B y Pipeline Comercial</p>
        </div>

        {/* Login Card */}
        <Card className="bg-[#121824]/90 backdrop-blur-md border-slate-800/80 shadow-2xl p-8 rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs font-medium text-rose-400">
                {error}
              </div>
            )}

            <Input
              label="Correo Electrónico"
              type="email"
              placeholder="alex.morgan@leadflow.io"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />

            <Input
              label="Contraseña"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="mt-2 bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30"
            >
              Iniciar Sesión
            </Button>
          </form>

          {/* Quick Demo Access */}
          <div className="mt-6 pt-6 border-t border-slate-800/60 space-y-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block text-center">
              Acceso Rápido de Demostración
            </span>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs border-slate-800 hover:border-slate-700 bg-slate-900/50 text-slate-300"
                onClick={() => setDemoUser('sales')}
                leftIcon={<UserCheck className="w-3.5 h-3.5 text-indigo-400" />}
              >
                Comercial (Alex)
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs border-slate-800 hover:border-slate-700 bg-slate-900/50 text-slate-300"
                onClick={() => setDemoUser('admin')}
                leftIcon={<ShieldCheck className="w-3.5 h-3.5 text-purple-400" />}
              >
                Admin (Carlos)
              </Button>
            </div>
          </div>

          {/* Toggle Register */}
          <div className="mt-6 text-center text-xs text-slate-400">
            ¿No tiene cuenta aún?{' '}
            <button
              type="button"
              onClick={onToggleRegister}
              className="text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer underline-offset-4 hover:underline"
            >
              Registrarse
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};
