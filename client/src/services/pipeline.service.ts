import { api } from './api.js';
import { Stage, Lead } from '../types/pipeline.types.js';

export const INITIAL_MOCK_STAGES: Stage[] = [
  { id: 1, name: 'New', order_index: 1, color: '#0ea5e9', is_won: false, is_lost: false },
  { id: 2, name: 'Contacted', order_index: 2, color: '#f59e0b', is_won: false, is_lost: false },
  { id: 3, name: 'Qualified', order_index: 3, color: '#8b5cf6', is_won: false, is_lost: false },
  { id: 4, name: 'Proposal', order_index: 4, color: '#6366f1', is_won: false, is_lost: false },
  { id: 5, name: 'Won', order_index: 5, color: '#10b981', is_won: true, is_lost: false },
  { id: 6, name: 'Lost', order_index: 6, color: '#f43f5e', is_won: false, is_lost: true },
];

export const INITIAL_MOCK_LEADS: Lead[] = [
  {
    id: 1,
    company_name: 'BrightFuture SA',
    contact_name: 'Sophie Martin',
    email: 'sophie.martin@brightfuture.fr',
    phone: '+33 6 12 34 56 78',
    value_amount: 15000,
    stage_id: 4, // Proposal
    priority: 'high',
    notes:
      'BrightFuture SA is a leading software development company specializing in enterprise solutions.',
    created_at: new Date().toISOString(),
    assigned_user: {
      id: 2,
      name: 'Alex Morgan',
      email: 'alex.morgan@leadflow.io',
      avatar_url:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
  },
  {
    id: 2,
    company_name: 'Cybernetics GmbH',
    contact_name: 'Lena Mueller',
    email: 'lena.m@cybernetics.de',
    phone: '+49 30 123456',
    value_amount: 28000,
    stage_id: 1, // New
    priority: 'medium',
    notes: 'Interesados en auditoría técnica y CRM.',
    created_at: new Date().toISOString(),
    assigned_user: {
      id: 2,
      name: 'Alex Morgan',
      email: 'alex.morgan@leadflow.io',
      avatar_url:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
  },
  {
    id: 3,
    company_name: 'Quantum Labs',
    contact_name: 'Diego Rodrigues',
    email: 'diego.r@quantumlabs.es',
    phone: '+34 912 345 678',
    value_amount: 42000,
    stage_id: 3, // Qualified
    priority: 'high',
    notes: 'Reunión de demostración completada.',
    created_at: new Date().toISOString(),
    assigned_user: {
      id: 1,
      name: 'Carlos Gómez',
      email: 'carlos.gomez@leadflow.io',
      avatar_url:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    },
  },
  {
    id: 4,
    company_name: 'Synergia Solutions',
    contact_name: 'Marco Bianchi',
    email: 'marco.b@synergia.it',
    phone: '+39 02 987654',
    value_amount: 19500,
    stage_id: 2, // Contacted
    priority: 'medium',
    notes: 'Llamada inicial realizada.',
    created_at: new Date().toISOString(),
    assigned_user: {
      id: 2,
      name: 'Alex Morgan',
      email: 'alex.morgan@leadflow.io',
      avatar_url:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
  },
  {
    id: 5,
    company_name: 'Omega Corp',
    contact_name: 'James Wilson',
    email: 'james.w@omegacorp.com',
    phone: '+44 20 7946 0912',
    value_amount: 55000,
    stage_id: 5, // Won
    priority: 'high',
    notes: 'Contrato comercial firmado por 3 años.',
    created_at: new Date().toISOString(),
    assigned_user: {
      id: 1,
      name: 'Carlos Gómez',
      email: 'carlos.gomez@leadflow.io',
      avatar_url:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    },
  },
  {
    id: 6,
    company_name: 'Vertex Global',
    contact_name: 'Emma Johnson',
    email: 'emma.j@vertexglobal.com',
    phone: '+1 415 555 2671',
    value_amount: 31000,
    stage_id: 4, // Proposal
    priority: 'medium',
    notes: 'Revisión final de la oferta comercial.',
    created_at: new Date().toISOString(),
    assigned_user: {
      id: 2,
      name: 'Alex Morgan',
      email: 'alex.morgan@leadflow.io',
      avatar_url:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
  },
  {
    id: 7,
    company_name: 'DataCore Systems',
    contact_name: 'Michael Chen',
    email: 'michael.c@datacore.io',
    phone: '+1 206 555 8921',
    value_amount: 22000,
    stage_id: 2, // Contacted
    priority: 'low',
    notes: 'Contacto a través del sitio web.',
    created_at: new Date().toISOString(),
    assigned_user: {
      id: 2,
      name: 'Alex Morgan',
      email: 'alex.morgan@leadflow.io',
      avatar_url:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
  },
  {
    id: 8,
    company_name: 'SecureIT Group',
    contact_name: 'Olivia Davis',
    email: 'olivia.d@secureit.co.uk',
    phone: '+44 161 496 0184',
    value_amount: 14000,
    stage_id: 6, // Lost
    priority: 'low',
    notes: 'Aplazado por congelación de presupuestos.',
    created_at: new Date().toISOString(),
    assigned_user: {
      id: 2,
      name: 'Alex Morgan',
      email: 'alex.morgan@leadflow.io',
      avatar_url:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
  },
];

export const pipelineService = {
  async getStages(): Promise<Stage[]> {
    try {
      const data = await api.get<{ stages: Stage[] }>('/stages');
      return data.stages;
    } catch {
      return INITIAL_MOCK_STAGES;
    }
  },

  async getLeads(): Promise<Lead[]> {
    try {
      const data = await api.get<{ leads: Lead[] }>('/leads?limit=100');
      return data.leads && data.leads.length > 0 ? data.leads : INITIAL_MOCK_LEADS;
    } catch {
      return INITIAL_MOCK_LEADS;
    }
  },

  async updateLeadStage(leadId: number, stageId: number): Promise<void> {
    try {
      await api.patch(`/leads/${leadId}/stage`, { stage_id: stageId });
    } catch {
      // Local fallback handled optimistically
    }
  },
};
