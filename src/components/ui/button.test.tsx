/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './button';

describe('Button Component', () => {
  it('renders with default variant and size', () => {
    render(<Button>Click Me</Button>);
    
    const button = screen.getByRole('button', { name: 'Click Me' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('button-base');
    expect(button).toHaveClass('button-default');
  });
  
  it('applies variant classes correctly', () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    
    const button = screen.getByRole('button', { name: 'Secondary Button' });
    expect(button).toHaveClass('button-secondary');
  });
  
  it('applies size classes correctly', () => {
    render(<Button size="sm">Small Button</Button>);
    
    const button = screen.getByRole('button', { name: 'Small Button' });
    expect(button).toHaveClass('text-xs');
    expect(button).toHaveClass('px-4');
    expect(button).toHaveClass('py-1.5');
  });
  
  it('merges custom className with variant classes', () => {
    render(<Button className="custom-class">Custom Button</Button>);
    
    const button = screen.getByRole('button', { name: 'Custom Button' });
    expect(button).toHaveClass('button-default');
    expect(button).toHaveClass('custom-class');
  });
  
  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clickable Button</Button>);
    
    const button = screen.getByRole('button', { name: 'Clickable Button' });
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('renders as a child component when asChild is true', () => {
    render(
      <Button asChild>
        <a href="https://example.com">Link Button</a>
      </Button>
    );
    
    const link = screen.getByRole('link', { name: 'Link Button' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveClass('button-base');
    expect(link).toHaveClass('button-default');
  });
  
  it('forwards ref to the button element', () => {
    const ref = jest.fn();
    render(<Button ref={ref}>Ref Button</Button>);
    
    expect(ref).toHaveBeenCalled();
  });
  
  it('applies disabled state correctly', () => {
    render(<Button disabled>Disabled Button</Button>);
    
    const button = screen.getByRole('button', { name: 'Disabled Button' });
    expect(button).toBeDisabled();
  });
});
