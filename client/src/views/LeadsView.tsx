import React, { useState, useEffect } from 'react';
import { Lead, Stage } from '../types/pipeline.types.js';
import { pipelineService } from '../services/pipeline.service.js';
import { LeadsTable } from '../components/leads/LeadsTable.js';
import { LeadFormModal, LeadFormData } from '../components/leads/LeadFormModal.js';
import { Button, Input, Select } from '../components/ui/index.js';
import { Search, Plus } from 'lucide-react';
import { api } from '../services/api.js';

interface LeadsViewProps {
  onSelectLead: (lead: Lead) => void;
  externalSearch?: string;
}

export const LeadsView: React.FC<LeadsViewProps> = ({ onSelectLead, externalSearch = '' }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stages, setStages] = useState<Stage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState(externalSearch);
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [stagesData, leadsData] = await Promise.all([
        pipelineService.getStages(),
        pipelineService.getLeads(),
      ]);
      setStages(stagesData);
      setLeads(leadsData);
    } catch (err) {
      console.error('Error loading leads:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (externalSearch !== undefined) {
      setSearch(externalSearch);
    }
  }, [externalSearch]);

  const handleCreateOrUpdateLead = async (formData: LeadFormData) => {
    setIsSubmitting(true);
    try {
      if (editingLead) {
        // Update
        await api.put(`/leads/${editingLead.id}`, formData);
        setLeads((prev) => prev.map((l) => (l.id === editingLead.id ? { ...l, ...formData } : l)));
      } else {
        // Create
        try {
          const res = await api.post<{ lead: Lead }>('/leads', formData);
          if (res.lead) {
            setLeads((prev) => [res.lead, ...prev]);
          } else {
            throw new Error('Fallback to local state');
          }
        } catch {
          const newLocalLead: Lead = {
            id: Date.now(),
            ...formData,
            created_at: new Date().toISOString(),
          };
          setLeads((prev) => [newLocalLead, ...prev]);
        }
      }
      setIsModalOpen(false);
      setEditingLead(null);
    } catch (err) {
      console.error('Error saving lead:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteLead = async (leadId: number) => {
    if (!confirm('¿Está seguro de que desea eliminar este prospecto?')) return;
    try {
      await api.delete(`/leads/${leadId}`);
    } catch {
      // Local fallback
    }
    setLeads((prev) => prev.filter((l) => l.id !== leadId));
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      !search ||
      lead.company_name.toLowerCase().includes(search.toLowerCase()) ||
      lead.contact_name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase());

    const matchesStage = selectedStage === 'all' || lead.stage_id === Number(selectedStage);
    const matchesPriority = selectedPriority === 'all' || lead.priority === selectedPriority;

    return matchesSearch && matchesStage && matchesPriority;
  });

  return (
    <div className="space-y-4">
      {/* Search & Filters Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#121824] p-4 rounded-2xl border border-slate-800/80">
        <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Input
              placeholder="Search leads..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
              className="bg-slate-900/60 border-slate-800 text-xs"
            />
          </div>

          <div className="w-40">
            <Select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="bg-slate-900/60 border-slate-800 text-xs py-2"
              options={[
                { value: 'all', label: 'All Stages' },
                ...stages.map((s) => ({ value: String(s.id), label: s.name })),
              ]}
            />
          </div>

          <div className="w-36">
            <Select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="bg-slate-900/60 border-slate-800 text-xs py-2"
              options={[
                { value: 'all', label: 'All Priorities' },
                { value: 'low', label: 'Low' },
                { value: 'medium', label: 'Medium' },
                { value: 'high', label: 'High' },
              ]}
            />
          </div>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            setEditingLead(null);
            setIsModalOpen(true);
          }}
          leftIcon={<Plus className="w-4 h-4" />}
          className="bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/20 text-xs font-semibold shrink-0"
        >
          Nuevo Lead
        </Button>
      </div>

      {/* Leads Table */}
      <LeadsTable
        leads={filteredLeads}
        stages={stages}
        onSelectLead={onSelectLead}
        onEditLead={(lead) => {
          setEditingLead(lead);
          setIsModalOpen(true);
        }}
        onDeleteLead={handleDeleteLead}
        isLoading={isLoading}
      />

      {/* Modal for Create/Edit */}
      <LeadFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingLead(null);
        }}
        onSubmit={handleCreateOrUpdateLead}
        stages={stages}
        initialData={editingLead}
        isLoading={isSubmitting}
      />
    </div>
  );
};
