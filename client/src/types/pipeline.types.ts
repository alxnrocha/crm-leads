export type LeadPriority = 'low' | 'medium' | 'high';

export interface Stage {
  id: number;
  name: string;
  order_index: number;
  color: string;
  is_won: boolean;
  is_lost: boolean;
  lead_count?: number;
  total_value?: number;
}

export interface Lead {
  id: number;
  user_id?: number | null;
  stage_id: number;
  source_id?: number | null;
  company_name: string;
  contact_name: string;
  email: string;
  phone?: string | null;
  value_amount: number;
  priority: LeadPriority;
  notes?: string | null;
  created_at?: string;
  updated_at?: string;
  stage?: {
    id: number;
    name: string;
    color: string;
    is_won: boolean;
    is_lost: boolean;
  };
  assigned_user?: {
    id: number;
    name: string;
    email: string;
    avatar_url?: string | null;
  };
  source?: {
    id: number;
    name: string;
  };
}
