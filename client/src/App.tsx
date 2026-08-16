import { useTheme } from './hooks/useTheme.ts';
import {
  Sun,
  Moon,
  Sparkles,
  TrendingUp,
  Building2,
  PhoneCall,
  CheckCircle2,
  XCircle,
  FileText,
  Layers,
} from 'lucide-react';

export default function App() {
  const { isDark, toggleTheme } = useTheme();

  const stages = [
    {
      name: 'Nuevo',
      color:
        'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/50 dark:text-sky-300 dark:border-sky-800',
      icon: Sparkles,
    },
    {
      name: 'En Contacto',
      color:
        'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800',
      icon: PhoneCall,
    },
    {
      name: 'Calificado',
      color:
        'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800',
      icon: Building2,
    },
    {
      name: 'Propuesta',
      color:
        'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-800',
      icon: FileText,
    },
    {
      name: 'Ganado',
      color:
        'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800',
      icon: CheckCircle2,
    },
    {
      name: 'Perdido',
      color:
        'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800',
      icon: XCircle,
    },
  ];

  const priorities = [
    { label: 'Baja', color: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' },
    {
      label: 'Media',
      color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300',
    },
    { label: 'Alta', color: 'bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200 p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Top bar */}
        <header className="flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/20">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">LeadFlow CRM</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Design System & Token Architecture
              </p>
            </div>
          </div>

          <button
            onClick={toggleTheme}
            aria-label="Cambiar tema"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {isDark ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span>Modo Claro</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-slate-600" />
                <span>Modo Oscuro</span>
              </>
            )}
          </button>
        </header>

        {/* Tokens Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Stage Statuses */}
          <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-lg font-semibold">Etapas del Pipeline Comercial</h2>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Tokens semánticos para clasificar y transicionar prospectos a lo largo del embudo.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
              {stages.map((stage) => {
                const Icon = stage.icon;
                return (
                  <div
                    key={stage.name}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border ${stage.color}`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span>{stage.name}</span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Priority Tokens & Brand Colors */}
          <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-lg font-semibold">Prioridades y Escala de Marca</h2>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Niveles de urgencia de lead y paleta de color principal Índigo/Violeta.
            </p>

            <div className="space-y-4 pt-1">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                  Prioridad del Prospecto
                </span>
                <div className="flex gap-2">
                  {priorities.map((p) => (
                    <span
                      key={p.label}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold ${p.color}`}
                    >
                      {p.label}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                  Escala de Marca (Brand Índigo)
                </span>
                <div className="grid grid-cols-6 gap-1.5 h-8">
                  <div className="bg-indigo-100 rounded-md" title="brand-100"></div>
                  <div className="bg-indigo-300 rounded-md" title="brand-300"></div>
                  <div className="bg-indigo-500 rounded-md" title="brand-500"></div>
                  <div className="bg-indigo-600 rounded-md" title="brand-600"></div>
                  <div className="bg-indigo-700 rounded-md" title="brand-700"></div>
                  <div className="bg-indigo-900 rounded-md" title="brand-900"></div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Live Confirmation Banner */}
        <footer className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl p-4 flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-semibold">Tokens de Diseño Configurados — Issue #2 Validada</span>
          </div>
          <span className="text-emerald-600 dark:text-emerald-400">
            Tailwind CSS v4 CSS-first (@theme)
          </span>
        </footer>
      </div>
    </div>
  );
}
