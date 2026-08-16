import React from 'react';
import { Lead } from '../../types/pipeline.types.js';
import { Badge } from '../ui/index.js';
import { DollarSign, Mail, Phone, MoreHorizontal } from 'lucide-react';

interface KanbanCardProps {
  lead: Lead;
  onSelectLead?: (lead: Lead) => void;
  onDragStart?: (e: React.DragEvent, leadId: number) => void;
}

export const KanbanCard: React.FC<KanbanCardProps> = ({ lead, onSelectLead, onDragStart }) => {
  const initial = lead.company_name.charAt(0).toUpperCase();

  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'priority-high' as const;
      case 'medium':
        return 'priority-medium' as const;
      default:
        return 'priority-low' as const;
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'High Priority';
      case 'medium':
        return 'Medium Priority';
      default:
        return 'Low Priority';
    }
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart && onDragStart(e, lead.id)}
      onClick={() => onSelectLead && onSelectLead(lead)}
      className="group bg-[#151c2c] hover:bg-[#192337] border border-slate-800/90 hover:border-indigo-500/50 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-150 cursor-grab active:cursor-grabbing space-y-3"
    >
      {/* Header: Company Avatar + Name + Options */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 font-bold text-xs flex items-center justify-center shrink-0">
            {initial}
          </div>
          <div className="overflow-hidden">
            <h4 className="text-xs font-semibold text-white truncate group-hover:text-indigo-300 transition-colors">
              {lead.company_name}
            </h4>
            <p className="text-[11px] text-slate-400 truncate">{lead.contact_name}</p>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onSelectLead) onSelectLead(lead);
          }}
          className="text-slate-500 hover:text-slate-300 p-1 rounded-md hover:bg-slate-800 transition-colors"
        >
          <MoreHorizontal className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Value & Priority Pills */}
      <div className="flex items-center justify-between gap-2 pt-1">
        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] font-semibold text-slate-200">
          <DollarSign className="w-3 h-3 text-indigo-400" />
          <span>{Number(lead.value_amount).toLocaleString('es-ES')} €</span>
        </div>

        <Badge
          variant={getPriorityBadgeVariant(lead.priority)}
          dot
          className="text-[10px] py-0 px-2"
        >
          {getPriorityLabel(lead.priority)}
        </Badge>
      </div>

      {/* Footer: Contacts & Rep Avatar */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-[11px] text-slate-500">
        <div className="flex items-center gap-2">
          {lead.email && <Mail className="w-3 h-3 hover:text-indigo-400 transition-colors" />}
          {lead.phone && <Phone className="w-3 h-3 hover:text-indigo-400 transition-colors" />}
        </div>

        <div className="flex items-center gap-1.5">
          {lead.assigned_user ? (
            <img
              src={
                lead.assigned_user.avatar_url ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
              }
              alt={lead.assigned_user.name}
              title={lead.assigned_user.name}
              className="w-5 h-5 rounded-full object-cover border border-slate-700"
            />
          ) : (
            <div className="w-5 h-5 rounded-full bg-slate-800 text-[9px] text-slate-400 flex items-center justify-center font-bold">
              ?
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
