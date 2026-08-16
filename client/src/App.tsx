import { useState } from 'react';
import { useTheme } from './hooks/useTheme.ts';
import {
  Button,
  Input,
  Select,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Modal,
} from './components/ui/index.ts';
import {
  Sun,
  Moon,
  Layers,
  Plus,
  Mail,
  User,
  Building2,
  DollarSign,
  Phone,
  Sparkles,
} from 'lucide-react';

export default function App() {
  const { isDark, toggleTheme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);

  const handleSimulateAction = () => {
    setDemoLoading(true);
    setTimeout(() => {
      setDemoLoading(false);
      setIsModalOpen(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200 p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/20">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">LeadFlow CRM</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                UI Primitives & Component Architecture (Issue #3)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() => setIsModalOpen(true)}
            >
              Nuevo Lead (Modal)
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              leftIcon={
                isDark ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-600" />
                )
              }
            >
              {isDark ? 'Claro' : 'Oscuro'}
            </Button>
          </div>
        </header>

        {/* Component Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Form Primitives */}
          <Card>
            <CardHeader>
              <CardTitle>Primitivas de Formulario</CardTitle>
              <CardDescription>
                Inputs y Selects totalmente accesibles con iconos, etiquetas y mensajes de error.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <Input
                label="Nombre de Empresa"
                placeholder="Ej. Acme Technologies S.L."
                leftIcon={<Building2 className="w-4 h-4" />}
              />

              <Input
                label="Contacto Principal"
                placeholder="Carlos Mendoza"
                leftIcon={<User className="w-4 h-4" />}
                helperText="Persona clave con poder de decisión"
              />

              <Input
                label="Correo Electrónico (Con Error)"
                defaultValue="correo-invalido"
                error="Debe introducir un correo electrónico válido"
                leftIcon={<Mail className="w-4 h-4" />}
              />

              <Select
                label="Origen del Prospecto"
                options={[
                  { value: 'website', label: 'Sitio Web Orgánico' },
                  { value: 'google_ads', label: 'Campaña Google Ads' },
                  { value: 'referral', label: 'Recomendación / B2B' },
                ]}
              />
            </CardContent>
          </Card>

          {/* Button & Badge Primitives */}
          <Card>
            <CardHeader>
              <CardTitle>Botones y Badges Semánticos</CardTitle>
              <CardDescription>
                Variantes adaptadas a las etapas del pipeline, niveles de prioridad y acciones.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2.5">
                  Variantes de Botón
                </span>
                <div className="flex flex-wrap gap-2">
                  <Button variant="primary" size="sm">
                    Primary
                  </Button>
                  <Button variant="secondary" size="sm">
                    Secondary
                  </Button>
                  <Button variant="outline" size="sm">
                    Outline
                  </Button>
                  <Button variant="danger" size="sm">
                    Danger
                  </Button>
                  <Button variant="ghost" size="sm">
                    Ghost
                  </Button>
                  <Button variant="primary" size="sm" isLoading>
                    Loading
                  </Button>
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2.5">
                  Badges de Etapas del Pipeline
                </span>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="stage-new" dot>
                    Nuevo
                  </Badge>
                  <Badge variant="stage-contacted" dot>
                    En Contacto
                  </Badge>
                  <Badge variant="stage-qualified" dot>
                    Calificado
                  </Badge>
                  <Badge variant="stage-proposal" dot>
                    Propuesta
                  </Badge>
                  <Badge variant="stage-won" dot>
                    Ganado
                  </Badge>
                  <Badge variant="stage-lost" dot>
                    Perdido
                  </Badge>
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2.5">
                  Badges de Prioridad
                </span>
                <div className="flex gap-2">
                  <Badge variant="priority-low">Baja</Badge>
                  <Badge variant="priority-medium">Media</Badge>
                  <Badge variant="priority-high">Alta</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lead Creation Demo Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Crear Nuevo Prospecto"
          description="Introduzca los datos comerciales para registrar el lead en el pipeline."
          footer={
            <>
              <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </Button>
              <Button
                variant="primary"
                size="sm"
                isLoading={demoLoading}
                onClick={handleSimulateAction}
                leftIcon={<Sparkles className="w-4 h-4" />}
              >
                Guardar Lead
              </Button>
            </>
          }
        >
          <div className="space-y-4">
            <Input
              label="Empresa"
              placeholder="Ej. Innova Soft"
              leftIcon={<Building2 className="w-4 h-4" />}
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Persona de Contacto"
                placeholder="Elena Torres"
                leftIcon={<User className="w-4 h-4" />}
              />
              <Input
                label="Teléfono"
                placeholder="+34 612 345 678"
                leftIcon={<Phone className="w-4 h-4" />}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Valor Estimado (€)"
                type="number"
                placeholder="15000"
                leftIcon={<DollarSign className="w-4 h-4" />}
              />
              <Select
                label="Etapa Inicial"
                options={[
                  { value: '1', label: 'Nuevo' },
                  { value: '2', label: 'En Contacto' },
                  { value: '3', label: 'Calificado' },
                ]}
              />
            </div>
          </div>
        </Modal>

        {/* Status Confirmation Footer */}
        <footer className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl p-4 flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-semibold">Issue #3 — UI Primitives Construidas y Validadas</span>
          </div>
          <span className="text-emerald-600 dark:text-emerald-400">
            Button, Input, Select, Card, Badge, Modal
          </span>
        </footer>
      </div>
    </div>
  );
}
