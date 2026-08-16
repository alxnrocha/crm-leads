import { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext.js';
import { useAuth } from './hooks/useAuth.js';
import { useTheme } from './hooks/useTheme.js';
import { LoginView } from './views/LoginView.js';
import { RegisterView } from './views/RegisterView.js';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
} from './components/ui/index.js';
import { Layers, LogOut, Sun, Moon, Sparkles, ShieldCheck, UserCheck } from 'lucide-react';

function AuthenticatedApp() {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col p-6 md:p-12">
      <div className="max-w-4xl mx-auto w-full space-y-6">
        {/* Top Navbar */}
        <header className="flex items-center justify-between bg-[#121824] border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-white">LeadFlow CRM</h1>
                <Badge variant="stage-proposal" dot>
                  Autenticado
                </Badge>
              </div>
              <p className="text-xs text-slate-400">
                Sesión activa para{' '}
                <span className="text-indigo-400 font-semibold">{user?.name}</span> (
                {user?.role === 'admin' ? 'Administrador' : 'Comercial'})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="border-slate-800 bg-slate-900/60 text-slate-300"
              onClick={toggleTheme}
              leftIcon={
                isDark ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-400" />
                )
              }
            >
              {isDark ? 'Claro' : 'Oscuro'}
            </Button>

            <Button
              variant="danger"
              size="sm"
              onClick={logout}
              leftIcon={<LogOut className="w-4 h-4" />}
            >
              Cerrar Sesión
            </Button>
          </div>
        </header>

        {/* Auth State Card */}
        <Card className="bg-[#121824] border-slate-800 rounded-2xl p-6 space-y-4">
          <CardHeader>
            <CardTitle className="text-white">
              Estado de Autenticación de Cliente (Issue #12)
            </CardTitle>
            <CardDescription className="text-slate-400">
              Control de sesión, tokens JWT, persistencia en localStorage y soporte para usuarios de
              prueba.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 text-sm text-slate-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2">
                <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs uppercase tracking-wider">
                  <UserCheck className="w-4 h-4" /> Usuario Activo
                </div>
                <div className="text-sm font-medium text-white">{user?.name}</div>
                <div className="text-xs text-slate-400">{user?.email}</div>
                <Badge variant={user?.role === 'admin' ? 'priority-high' : 'stage-new'}>
                  Rol: {user?.role}
                </Badge>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2">
                <div className="flex items-center gap-2 text-purple-400 font-semibold text-xs uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" /> Seguridad y Token
                </div>
                <div className="text-xs text-slate-400">
                  Token JWT adjuntado automáticamente en cada petición HTTP via{' '}
                  <code>services/api.ts</code>.
                </div>
                <div className="text-[11px] font-mono text-emerald-400">Bearer Token Activo</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Milestone 3 Next Step Indicator */}
        <footer className="bg-indigo-950/40 border border-indigo-800/60 rounded-2xl p-4 flex items-center justify-between text-xs text-indigo-300">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
            <span className="font-semibold">
              Issue #12 — Auth State & Route Guards Implementados
            </span>
          </div>
          <span className="text-indigo-400">Listo para Issue #13: Layout, Sidebar & Métricas</span>
        </footer>
      </div>
    </div>
  );
}

function MainApp() {
  const { isAuthenticated, isLoading } = useAuth();
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0b0f17] flex items-center justify-center text-white">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium text-slate-400">Cargando LeadFlow CRM...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return isRegisterMode ? (
      <RegisterView onToggleLogin={() => setIsRegisterMode(false)} />
    ) : (
      <LoginView onToggleRegister={() => setIsRegisterMode(true)} />
    );
  }

  return <AuthenticatedApp />;
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
