import React from 'react';
import { Lead, Stage } from '../../types/pipeline.types.js';
import { Badge } from '../ui/index.js';
import { Building2, ChevronRight, Edit3, Trash2 } from 'lucide-react';

interface LeadsTableProps {
  leads: Lead[];
  stages: Stage[];
  onSelectLead: (lead: Lead) => void;
  onEditLead?: (lead: Lead) => void;
  onDeleteLead?: (leadId: number) => void;
  isLoading?: boolean;
}

export const LeadsTable: React.FC<LeadsTableProps> = ({
  leads,
  stages,
  onSelectLead,
  onEditLead,
  onDeleteLead,
  isLoading = false,
}) => {
  const getStageName = (stageId: number) => {
    const s = stages.find((st) => st.id === stageId);
    return s ? s.name : 'Desconocido';
  };

  const getStageVariant = (stageId: number) => {
    const s = stages.find((st) => st.id === stageId);
    if (!s) return 'default' as const;
    const name = s.name.toLowerCase();
    if (name.includes('new') || name.includes('nuevo')) return 'stage-new' as const;
    if (name.includes('contact')) return 'stage-contacted' as const;
    if (name.includes('qualif') || name.includes('calif')) return 'stage-qualified' as const;
    if (name.includes('prop')) return 'stage-proposal' as const;
    if (name.includes('won') || name.includes('gana')) return 'stage-won' as const;
    if (name.includes('lost') || name.includes('perd')) return 'stage-lost' as const;
    return 'default' as const;
  };

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'priority-high' as const;
      case 'medium':
        return 'priority-medium' as const;
      default:
        return 'priority-low' as const;
    }
  };

  if (isLoading) {
    return (
      <div className="bg-[#121824] border border-slate-800/80 rounded-2xl p-12 text-center text-slate-400">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs">Cargando directorio de prospectos...</p>
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="bg-[#121824] border border-slate-800/80 rounded-2xl p-12 text-center text-slate-400">
        <Building2 className="w-8 h-8 text-slate-600 mx-auto mb-2" />
        <h4 className="text-sm font-semibold text-white">No se encontraron prospectos</h4>
        <p className="text-xs text-slate-500 mt-1">
          Pruebe ajustando los filtros de búsqueda o registre un nuevo lead.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#121824] border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800/80 bg-slate-900/40 text-slate-400 uppercase tracking-wider text-[11px] font-semibold">
              <th className="py-3.5 px-4 font-semibold">Company</th>
              <th className="py-3.5 px-4 font-semibold">Contact</th>
              <th className="py-3.5 px-4 font-semibold">Email</th>
              <th className="py-3.5 px-4 font-semibold">Phone</th>
              <th className="py-3.5 px-4 font-semibold">Value</th>
              <th className="py-3.5 px-4 font-semibold">Stage</th>
              <th className="py-3.5 px-4 font-semibold">Priority</th>
              <th className="py-3.5 px-4 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {leads.map((lead) => {
              const initial = lead.company_name.charAt(0).toUpperCase();
              return (
                <tr
                  key={lead.id}
                  onClick={() => onSelectLead(lead)}
                  className="hover:bg-slate-900/60 transition-colors cursor-pointer group"
                >
                  {/* Company */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 font-bold text-xs flex items-center justify-center shrink-0">
                        {initial}
                      </div>
                      <span className="font-semibold text-white group-hover:text-indigo-300 transition-colors">
                        {lead.company_name}
                      </span>
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="py-3.5 px-4 text-slate-300 font-medium">{lead.contact_name}</td>

                  {/* Email */}
                  <td className="py-3.5 px-4 text-slate-400">{lead.email}</td>

                  {/* Phone */}
                  <td className="py-3.5 px-4 text-slate-400">{lead.phone || '—'}</td>

                  {/* Value */}
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-white">
                      €{Number(lead.value_amount).toLocaleString('es-ES')}
                    </span>
                  </td>

                  {/* Stage */}
                  <td className="py-3.5 px-4">
                    <Badge variant={getStageVariant(lead.stage_id)} dot>
                      {getStageName(lead.stage_id)}
                    </Badge>
                  </td>

                  {/* Priority */}
                  <td className="py-3.5 px-4">
                    <Badge variant={getPriorityVariant(lead.priority)}>
                      {lead.priority.toUpperCase()}
                    </Badge>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1">
                      {onEditLead && (
                        <button
                          onClick={() => onEditLead(lead)}
                          title="Editar Lead"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-300 hover:bg-indigo-600/20 transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {onDeleteLead && (
                        <button
                          onClick={() => onDeleteLead(lead.id)}
                          title="Eliminar Lead"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-600/20 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        onClick={() => onSelectLead(lead)}
                        title="Ver Detalles"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
