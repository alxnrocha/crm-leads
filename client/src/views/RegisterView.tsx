import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { Button, Input, Select, Card } from '../components/ui/index.js';
import { Layers, Mail, Lock, User, ArrowRight } from 'lucide-react';

interface RegisterViewProps {
  onToggleLogin: () => void;
}

export const RegisterView: React.FC<RegisterViewProps> = ({ onToggleLogin }) => {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'sales'>('sales');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await register({ name, email, password, role });
    } catch (err) {
      setError((err as Error).message || 'Error al registrar usuario');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md space-y-6 relative z-10">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600 shadow-xl shadow-indigo-600/30 text-white mb-2">
            <Layers className="w-7 h-7" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Crear Cuenta</h1>
          <p className="text-sm text-slate-400">Únase a su equipo comercial en LeadFlow CRM</p>
        </div>

        <Card className="bg-[#121824]/90 backdrop-blur-md border-slate-800/80 shadow-2xl p-8 rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs font-medium text-rose-400">
                {error}
              </div>
            )}

            <Input
              label="Nombre Completo"
              placeholder="Elena Torres"
              value={name}
              onChange={(e) => setName(e.target.value)}
              leftIcon={<User className="w-4 h-4" />}
              required
            />

            <Input
              label="Correo Electrónico"
              type="email"
              placeholder="elena.torres@empresa.es"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />

            <Input
              label="Contraseña"
              type="password"
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
              required
            />

            <Select
              label="Rol en el CRM"
              value={role}
              onChange={(e) => setRole(e.target.value as 'admin' | 'sales')}
              options={[
                { value: 'sales', label: 'Comercial / Ejecutivo de Cuentas' },
                { value: 'admin', label: 'Director Comercial / Administrador' },
              ]}
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
              Registrar Cuenta
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-400">
            ¿Ya tiene una cuenta activa?{' '}
            <button
              type="button"
              onClick={onToggleLogin}
              className="text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer underline-offset-4 hover:underline"
            >
              Iniciar Sesión
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};
