import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MetricCards } from '../components/dashboard/MetricCards.js';

describe('MetricCards Component', () => {
  it('renders default fallback metrics matching design reference', () => {
    render(<MetricCards />);
    expect(screen.getByText('Total Pipeline Value')).toBeInTheDocument();
    expect(screen.getByText('€345,000')).toBeInTheDocument();
    expect(screen.getByText('Win Rate')).toBeInTheDocument();
    expect(screen.getByText('42%')).toBeInTheDocument();
  });

  it('renders custom metrics properly', () => {
    render(
      <MetricCards
        metrics={{
          total_leads: 25,
          pipeline_value: 500000,
          won_revenue: 200000,
          win_rate_percentage: 65,
        }}
      />
    );
    expect(screen.getByText('€500.000')).toBeInTheDocument();
    expect(screen.getByText('65%')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
  });
});
