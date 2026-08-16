import React, { useState, useEffect } from 'react';
import { Stage, Lead } from '../../types/pipeline.types.js';
import { pipelineService } from '../../services/pipeline.service.js';
import { KanbanColumn } from './KanbanColumn.js';
import { Loader2, Plus, Sparkles } from 'lucide-react';
import { Button } from '../ui/index.js';

interface KanbanBoardProps {
  onSelectLead?: (lead: Lead) => void;
  onNewLeadClick?: () => void;
  searchFilter?: string;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  onSelectLead,
  onNewLeadClick,
  searchFilter = '',
}) => {
  const [stages, setStages] = useState<Stage[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPipeline = async () => {
      setIsLoading(true);
      try {
        const [stagesData, leadsData] = await Promise.all([
          pipelineService.getStages(),
          pipelineService.getLeads(),
        ]);
        setStages(stagesData);
        setLeads(leadsData);
      } catch (err) {
        console.error('Error loading pipeline:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadPipeline();
  }, []);

  const handleDropLead = async (leadId: number, targetStageId: number) => {
    // 1. Optimistic local update
    setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, stage_id: targetStageId } : l)));

    // 2. Sync with backend API
    await pipelineService.updateLeadStage(leadId, targetStageId);
  };

  const filteredLeads = leads.filter((l) => {
    if (!searchFilter) return true;
    const q = searchFilter.toLowerCase();
    return (
      l.company_name.toLowerCase().includes(q) ||
      l.contact_name.toLowerCase().includes(q) ||
      l.email.toLowerCase().includes(q)
    );
  });

  if (isLoading) {
    return (
      <div className="h-96 flex items-center justify-center text-slate-400">
        <div className="flex items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
          <span className="text-sm font-medium">Cargando Pipeline de Ventas...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Board Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>
            Arrastre los prospectos entre columnas para actualizar la fase comercial en tiempo real.
          </span>
        </div>

        {onNewLeadClick && (
          <Button
            variant="primary"
            size="sm"
            onClick={onNewLeadClick}
            leftIcon={<Plus className="w-4 h-4" />}
            className="bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/20 text-xs"
          >
            Añadir Lead
          </Button>
        )}
      </div>

      {/* Horizontal Kanban Columns Container */}
      <div className="flex gap-4 overflow-x-auto pb-4 pt-1">
        {stages.map((stage) => {
          const stageLeads = filteredLeads.filter((l) => l.stage_id === stage.id);
          return (
            <KanbanColumn
              key={stage.id}
              stage={stage}
              leads={stageLeads}
              onSelectLead={onSelectLead}
              onDropLead={handleDropLead}
            />
          );
        })}
      </div>
    </div>
  );
};
