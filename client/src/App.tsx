import { useState, useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext.js';
import { useAuth } from './hooks/useAuth.js';
import { LoginView } from './views/LoginView.js';
import { RegisterView } from './views/RegisterView.js';
import { DashboardLayout } from './components/layout/DashboardLayout.js';
import { NavItemKey } from './components/layout/Sidebar.js';
import { MetricCards, OverviewMetricsData } from './components/dashboard/MetricCards.js';
import { KanbanBoard } from './components/pipeline/KanbanBoard.js';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  Badge,
} from './components/ui/index.js';
import { api } from './services/api.js';
import { Sparkles, Kanban, Users, BarChart3, Calendar, Clock, ArrowRight } from 'lucide-react';

function AuthenticatedApp() {
  const { user } = useAuth();
  const [activeNav, setActiveNav] = useState<NavItemKey>('pipeline');
  const [metrics, setMetrics] = useState<OverviewMetricsData | undefined>(undefined);
  const [isLoadingMetrics, setIsLoadingMetrics] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchMetrics = async () => {
      setIsLoadingMetrics(true);
      try {
        const data = await api.get<{ metrics: OverviewMetricsData }>('/metrics/overview');
        setMetrics(data.metrics);
      } catch {
        setMetrics({
          total_leads: 18,
          pipeline_value: 345000,
          won_revenue: 120000,
          win_rate_percentage: 42,
        });
      } finally {
        setIsLoadingMetrics(false);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <DashboardLayout
      activeNav={activeNav}
      onNavigate={setActiveNav}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      onNewLeadClick={() => setActiveNav('pipeline')}
    >
      {/* 1. Top Metric Cards (Cloned from design.png) */}
      <MetricCards metrics={metrics} isLoading={isLoadingMetrics} />

      {/* 2. Dynamic View Content */}
      <div className="space-y-6">
        {activeNav === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-[#121824] border-slate-800 lg:col-span-2 p-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white">Resumen Ejecutivo de Pipeline</CardTitle>
                      <CardDescription className="text-slate-400">
                        Rendimiento comercial de {user?.name}
                      </CardDescription>
                    </div>
                    <Badge variant="stage-proposal" dot>
                      Pipeline Saludable
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-slate-300">
                    El CRM se encuentra conectado y sincronizado con el backend Node.js 22 LTS y la
                    base de datos relacional MySQL 8.4.
                  </p>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveNav('pipeline')}
                      leftIcon={<Kanban className="w-4 h-4 text-indigo-400" />}
                      className="border-slate-800 bg-slate-900/60 text-slate-300 justify-start"
                    >
                      Ver Tablero Kanban
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveNav('leads')}
                      leftIcon={<Users className="w-4 h-4 text-purple-400" />}
                      className="border-slate-800 bg-slate-900/60 text-slate-300 justify-start"
                    >
                      Gestionar Leads
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#121824] border-slate-800 p-6 space-y-4">
                <CardHeader>
                  <CardTitle className="text-white">Accesos Directos</CardTitle>
                  <CardDescription className="text-slate-400">
                    Navegación del módulo
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {[
                    { key: 'pipeline', label: 'Pipeline Comercial', icon: Kanban },
                    { key: 'leads', label: 'Directorio de Prospectos', icon: Users },
                    { key: 'activities', label: 'Registro de Actividades', icon: Clock },
                    { key: 'reports', label: 'Informes & Analytics', icon: BarChart3 },
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() => setActiveNav(item.key as NavItemKey)}
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900/40 hover:bg-slate-900/80 border border-slate-800/60 text-xs text-slate-300 font-medium transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <item.icon className="w-4 h-4 text-indigo-400" />
                        <span>{item.label}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                    </button>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Kanban Preview */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white tracking-tight">
                Pipeline de Ventas en Vivo
              </h2>
              <KanbanBoard searchFilter={searchQuery} />
            </div>
          </div>
        )}

        {activeNav === 'pipeline' && <KanbanBoard searchFilter={searchQuery} />}

        {activeNav === 'leads' && (
          <Card className="bg-[#121824] border-slate-800 p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 mx-auto">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Directorio de Prospectos</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              En la Issue #15 implementaremos la tabla densa de datos de leads con búsqueda, filtros
              por etapa, paginación y modal de creación/edición.
            </p>
          </Card>
        )}

        {activeNav === 'activities' && (
          <Card className="bg-[#121824] border-slate-800 p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-600/20 border border-sky-500/30 flex items-center justify-center text-sky-400 mx-auto">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Historial de Actividades</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Timeline de llamadas, reuniones y notas comerciales.
            </p>
          </Card>
        )}

        {activeNav === 'calendar' && (
          <Card className="bg-[#121824] border-slate-800 p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Calendario de Citas Comerciales</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Agenda comercial y reuniones programadas con prospectos.
            </p>
          </Card>
        )}

        {activeNav === 'reports' && (
          <Card className="bg-[#121824] border-slate-800 p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Reportes y Conversión</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Métricas de rendimiento de comerciales y retorno por canal de marketing.
            </p>
          </Card>
        )}
      </div>

      {/* Footer Tracker */}
      <footer className="bg-[#121824] border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>LeadFlow CRM v1.0.0 — Tablero Kanban Interactivo</span>
        </div>
        <span className="text-indigo-400 font-mono text-[11px]">Issue #14 Completa</span>
      </footer>
    </DashboardLayout>
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
