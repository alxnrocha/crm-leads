import React, { useState } from 'react';
import { Stage, Lead } from '../../types/pipeline.types.js';
import { KanbanCard } from './KanbanCard.js';
import { clsx } from 'clsx';

interface KanbanColumnProps {
  stage: Stage;
  leads: Lead[];
  onSelectLead?: (lead: Lead) => void;
  onDropLead?: (leadId: number, targetStageId: number) => void;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  stage,
  leads,
  onSelectLead,
  onDropLead,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const totalValue = leads.reduce((sum, lead) => sum + Number(lead.value_amount || 0), 0);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const leadIdStr = e.dataTransfer.getData('text/plain');
    if (leadIdStr && onDropLead) {
      const leadId = Number(leadIdStr);
      onDropLead(leadId, stage.id);
    }
  };

  const handleDragStart = (e: React.DragEvent, leadId: number) => {
    e.dataTransfer.setData('text/plain', String(leadId));
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={clsx(
        'flex flex-col w-80 shrink-0 bg-[#0f1523] border rounded-2xl p-3 transition-colors duration-150',
        isDragOver
          ? 'border-indigo-500 bg-indigo-950/20'
          : 'border-slate-800/80 hover:border-slate-700'
      )}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between px-2 py-2 mb-2">
        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: stage.color || '#6366f1' }}
          />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">{stage.name}</h3>
          <span className="px-1.5 py-0.5 rounded-md bg-slate-800 text-[10px] font-semibold text-slate-400">
            {leads.length}
          </span>
        </div>

        <span className="text-[11px] font-semibold text-slate-400">
          €{totalValue.toLocaleString('es-ES')}
        </span>
      </div>

      {/* Cards List Area */}
      <div className="flex-1 space-y-2.5 overflow-y-auto min-h-[300px] max-h-[calc(100vh-280px)] pr-0.5">
        {leads.length === 0 ? (
          <div className="h-32 border border-dashed border-slate-800 rounded-xl flex items-center justify-center text-xs text-slate-500">
            Sin prospectos
          </div>
        ) : (
          leads.map((lead) => (
            <KanbanCard
              key={lead.id}
              lead={lead}
              onSelectLead={onSelectLead}
              onDragStart={handleDragStart}
            />
          ))
        )}
      </div>
    </div>
  );
};
