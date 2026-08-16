import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { KanbanCard } from '../components/pipeline/KanbanCard.js';
import { Lead } from '../types/pipeline.types.js';

describe('KanbanCard Component', () => {
  const mockLead: Lead = {
    id: 1,
    company_name: 'BrightFuture SA',
    contact_name: 'Sophie Martin',
    email: 'sophie.martin@brightfuture.fr',
    phone: '+33 6 12 34 56 78',
    value_amount: 15000,
    stage_id: 4,
    priority: 'high',
  };

  it('renders company name, contact, value and high priority badge', () => {
    render(<KanbanCard lead={mockLead} />);
    expect(screen.getByText('BrightFuture SA')).toBeInTheDocument();
    expect(screen.getByText('Sophie Martin')).toBeInTheDocument();
    expect(screen.getByText('15.000 €')).toBeInTheDocument();
    expect(screen.getByText('High Priority')).toBeInTheDocument();
  });
});
