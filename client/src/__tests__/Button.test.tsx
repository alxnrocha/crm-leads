import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '../components/ui/Button.js';

describe('Button Component', () => {
  it('renders children properly', () => {
    render(<Button>Guardar Lead</Button>);
    expect(screen.getByText('Guardar Lead')).toBeInTheDocument();
  });

  it('triggers onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Acción</Button>);
    fireEvent.click(screen.getByText('Acción'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disables button when isLoading is true', () => {
    render(<Button isLoading>Cargando</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});
