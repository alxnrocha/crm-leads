import React, { useState } from 'react';
import { Lead, Stage } from '../../types/pipeline.types.js';
import { Badge, Button, Input } from '../ui/index.js';
import {
  X,
  Phone,
  Mail,
  Calendar,
  MoreHorizontal,
  Check,
  Globe,
  Building,
  MapPin,
  Users,
  Plus,
  Send,
} from 'lucide-react';
import { clsx } from 'clsx';

export interface ActivityItem {
  id: number;
  type: 'call' | 'meeting' | 'email' | 'note' | 'created';
  title: string;
  description: string;
  timeAgo: string;
}

interface LeadDetailsDrawerProps {
  lead: Lead | null;
  stages: Stage[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateStage?: (leadId: number, stageId: number) => void;
}

export const LeadDetailsDrawer: React.FC<LeadDetailsDrawerProps> = ({
  lead,
  stages,
  isOpen,
  onClose,
  onUpdateStage,
}) => {
  const [activeTab, setActiveTab] = useState<'activity' | 'notes' | 'files' | 'contacts' | 'deals'>(
    'activity'
  );
  const [newActivitySummary, setNewActivitySummary] = useState('');
  const [activityType, setActivityType] = useState<'call' | 'meeting' | 'email' | 'note'>('call');

  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      id: 1,
      type: 'email',
      title: 'Email sent to Sophie Martin',
      description: 'Proposal follow-up email with pricing details',
      timeAgo: '2h ago',
    },
    {
      id: 2,
      type: 'call',
      title: 'Call with Sophie Martin',
      description: 'Discussed proposal, timeline and implementation',
      timeAgo: '1d ago',
    },
    {
      id: 3,
      type: 'meeting',
      title: 'Meeting scheduled',
      description: 'Product demo meeting scheduled for next week',
      timeAgo: '2d ago',
    },
    {
      id: 4,
      type: 'email',
      title: 'Email opened',
      description: 'Sophie opened the proposal email',
      timeAgo: '2d ago',
    },
    {
      id: 5,
      type: 'created',
      title: 'Lead created',
      description: 'Lead imported from website form',
      timeAgo: '5d ago',
    },
  ]);

  if (!isOpen || !lead) return null;

  const initial = lead.company_name.charAt(0).toUpperCase();

  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActivitySummary.trim()) return;

    const newAct: ActivityItem = {
      id: Date.now(),
      type: activityType,
      title: `${activityType.toUpperCase()} registrada`,
      description: newActivitySummary,
      timeAgo: 'Just now',
    };

    setActivities([newAct, ...activities]);
    setNewActivitySummary('');
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return (
          <Badge variant="priority-high" dot>
            High Priority
          </Badge>
        );
      case 'medium':
        return (
          <Badge variant="priority-medium" dot>
            Medium Priority
          </Badge>
        );
      default:
        return (
          <Badge variant="priority-low" dot>
            Low Priority
          </Badge>
        );
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'email':
        return (
          <div className="w-8 h-8 rounded-full bg-indigo-600/30 border border-indigo-500/40 text-indigo-400 flex items-center justify-center shrink-0">
            <Mail className="w-4 h-4" />
          </div>
        );
      case 'call':
        return (
          <div className="w-8 h-8 rounded-full bg-purple-600/30 border border-purple-500/40 text-purple-400 flex items-center justify-center shrink-0">
            <Phone className="w-4 h-4" />
          </div>
        );
      case 'meeting':
        return (
          <div className="w-8 h-8 rounded-full bg-violet-600/30 border border-violet-500/40 text-violet-400 flex items-center justify-center shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 text-slate-400 flex items-center justify-center shrink-0">
            <Plus className="w-4 h-4" />
          </div>
        );
    }
  };

  const currentStageIndex = stages.findIndex((s) => s.id === lead.stage_id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Main Slide-over Panel (Matching design.png) */}
      <div className="relative w-full max-w-4xl h-full bg-[#0d121d] border-l border-slate-800 text-slate-100 shadow-2xl flex flex-col z-10 overflow-y-auto animate-slide-left">
        {/* Top Header */}
        <div className="p-6 pb-4 border-b border-slate-800/80 bg-[#121824]/60 flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            {/* Company Initial Circle Avatar */}
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-indigo-600/30 shrink-0">
              {initial}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-bold text-white tracking-tight">{lead.company_name}</h2>
                <div className="px-2.5 py-0.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-bold text-slate-200">
                  €{Number(lead.value_amount).toLocaleString('es-ES')}
                </div>
                {getPriorityBadge(lead.priority)}
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                <span className="font-medium text-slate-300">{lead.contact_name}</span>
                <span>•</span>
                <span>{lead.email}</span>
                {lead.phone && (
                  <>
                    <span>•</span>
                    <span>{lead.phone}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons & Close */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-xs border-slate-800 bg-[#151c2c] text-slate-200 hover:text-white"
              leftIcon={<Phone className="w-3.5 h-3.5" />}
              onClick={() => alert(`Iniciando llamada a ${lead.phone || lead.contact_name}`)}
            >
              Call
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs border-slate-800 bg-[#151c2c] text-slate-200 hover:text-white"
              leftIcon={<Mail className="w-3.5 h-3.5" />}
              onClick={() => alert(`Abriendo cliente de correo para ${lead.email}`)}
            >
              Email
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs border-slate-800 bg-[#151c2c] text-slate-200 hover:text-white"
              leftIcon={<Calendar className="w-3.5 h-3.5" />}
              onClick={() => alert(`Programando reunión con ${lead.contact_name}`)}
            >
              Meeting
            </Button>
            <button className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Pipeline Stage Progression Stepper Bar (Matching design.png) */}
        <div className="px-8 py-5 border-b border-slate-800/80 bg-[#0f1523]/40">
          <div className="relative flex items-center justify-between">
            {/* Connecting Track Line */}
            <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-0.5 bg-slate-800 z-0" />
            <div
              className="absolute left-4 top-1/2 -translate-y-1/2 h-0.5 bg-indigo-500 z-0 transition-all duration-300"
              style={{
                width: `${(Math.max(0, currentStageIndex) / (stages.length - 1)) * 100}%`,
              }}
            />

            {stages.map((stage, idx) => {
              const isPassed = idx < currentStageIndex;
              const isCurrent = idx === currentStageIndex;

              return (
                <button
                  key={stage.id}
                  onClick={() => onUpdateStage && onUpdateStage(lead.id, stage.id)}
                  className="relative z-10 flex flex-col items-center gap-1.5 group cursor-pointer"
                >
                  <div
                    className={clsx(
                      'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200',
                      isPassed && 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30',
                      isCurrent &&
                        'bg-indigo-600 text-white ring-4 ring-indigo-500/20 shadow-lg shadow-indigo-600/50 scale-110',
                      !isPassed &&
                        !isCurrent &&
                        'bg-[#121824] border-2 border-slate-700 text-slate-400 hover:border-slate-500'
                    )}
                  >
                    {isPassed || isCurrent ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                  </div>
                  <span
                    className={clsx(
                      'text-[11px] font-semibold tracking-wider transition-colors',
                      isCurrent
                        ? 'text-white underline decoration-indigo-500 underline-offset-4'
                        : isPassed
                          ? 'text-slate-300'
                          : 'text-slate-500'
                    )}
                  >
                    {stage.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Split Content Section: Left Company Profile | Right Activity Feed */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800/80">
          {/* Left Column: About Company */}
          <div className="p-6 space-y-6">
            <h3 className="text-sm font-bold text-white tracking-wide">
              About {lead.company_name}
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start justify-between py-2 border-b border-slate-800/60">
                <span className="text-slate-400 flex items-center gap-2">
                  <Building className="w-3.5 h-3.5 text-slate-500" /> Industry
                </span>
                <span className="font-semibold text-slate-200">Software Development</span>
              </div>

              <div className="flex items-start justify-between py-2 border-b border-slate-800/60">
                <span className="text-slate-400 flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-slate-500" /> Company Size
                </span>
                <span className="font-semibold text-slate-200">51-200 employees</span>
              </div>

              <div className="flex items-start justify-between py-2 border-b border-slate-800/60">
                <span className="text-slate-400 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" /> Location
                </span>
                <span className="font-semibold text-slate-200">Paris, France</span>
              </div>

              <div className="flex items-start justify-between py-2 border-b border-slate-800/60">
                <span className="text-slate-400 flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-slate-500" /> Website
                </span>
                <a
                  href="https://brightfuture.fr"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-indigo-400 hover:text-indigo-300 hover:underline"
                >
                  brightfuture.fr
                </a>
              </div>

              <div className="space-y-1.5 pt-2">
                <span className="text-slate-400">Description</span>
                <p className="text-slate-300 leading-relaxed bg-slate-900/50 p-3 rounded-xl border border-slate-800/60">
                  {lead.notes ||
                    'BrightFuture SA is a leading software development company specializing in enterprise solutions and digital transformation.'}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Activity Timeline & Tabs */}
          <div className="p-6 space-y-5">
            {/* Tabs Header */}
            <div className="flex items-center gap-6 border-b border-slate-800 pb-2 text-xs font-semibold text-slate-400">
              {(['activity', 'notes', 'files', 'contacts', 'deals'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={clsx(
                    'capitalize pb-2 -mb-2.5 transition-colors cursor-pointer',
                    activeTab === tab
                      ? 'text-indigo-400 border-b-2 border-indigo-500 font-bold'
                      : 'hover:text-slate-200'
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Quick Log Interaction Form */}
            <form onSubmit={handleAddActivity} className="space-y-2">
              <div className="flex items-center gap-2">
                <select
                  value={activityType}
                  onChange={(e) =>
                    setActivityType(e.target.value as 'call' | 'meeting' | 'email' | 'note')
                  }
                  className="bg-[#121824] border border-slate-800 text-slate-300 rounded-xl px-2.5 py-1.5 text-xs focus:outline-none focus:border-indigo-500"
                >
                  <option value="call">Call</option>
                  <option value="meeting">Meeting</option>
                  <option value="email">Email</option>
                  <option value="note">Note</option>
                </select>

                <Input
                  placeholder="Escribir resumen de la actividad..."
                  value={newActivitySummary}
                  onChange={(e) => setNewActivitySummary(e.target.value)}
                  className="text-xs py-1.5 bg-[#121824]"
                />

                <Button type="submit" variant="primary" size="sm" className="px-3 bg-indigo-600">
                  <Send className="w-3.5 h-3.5" />
                </Button>
              </div>
            </form>

            {/* Chronological Activity Feed (Matching design.png) */}
            <div className="space-y-4 pt-2">
              {activities.map((act, i) => (
                <div key={act.id} className="relative flex items-start gap-3.5 group">
                  {/* Timeline vertical line */}
                  {i < activities.length - 1 && (
                    <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-slate-800 -translate-x-1/2" />
                  )}

                  {/* Icon */}
                  {getActivityIcon(act.type)}

                  {/* Content */}
                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white group-hover:text-indigo-300 transition-colors">
                        {act.title}
                      </span>
                      <span className="text-[11px] text-slate-500">{act.timeAgo}</span>
                    </div>
                    <p className="text-xs text-slate-400">{act.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
