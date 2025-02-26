/**
 * @jest-environment jsdom
 * @description Tests for the RegisterFields component
 */
import { render, screen } from '@/__tests__/test-utils';
import { RegisterFields } from './RegisterFields';

describe('RegisterFields', () => {
  it('renders all registration fields', () => {
    render(<RegisterFields isLoading={false} />);

    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('disables fields when loading', () => {
    render(<RegisterFields isLoading={true} />);

    expect(screen.getByLabelText(/first name/i)).toBeDisabled();
    expect(screen.getByLabelText(/last name/i)).toBeDisabled();
    expect(screen.getByLabelText(/email/i)).toBeDisabled();
    expect(screen.getByLabelText(/password/i)).toBeDisabled();
  });

  it('applies required attribute to all fields', () => {
    render(<RegisterFields isLoading={false} />);

    expect(screen.getByLabelText(/first name/i)).toBeRequired();
    expect(screen.getByLabelText(/last name/i)).toBeRequired();
    expect(screen.getByLabelText(/email/i)).toBeRequired();
    expect(screen.getByLabelText(/password/i)).toBeRequired();
  });

  it('applies correct autocomplete attributes', () => {
    render(<RegisterFields isLoading={false} />);

    expect(screen.getByLabelText(/first name/i)).toHaveAttribute('autocomplete', 'given-name');
    expect(screen.getByLabelText(/last name/i)).toHaveAttribute('autocomplete', 'family-name');
    expect(screen.getByLabelText(/email/i)).toHaveAttribute('autocomplete', 'email');
    expect(screen.getByLabelText(/password/i)).toHaveAttribute('autocomplete', 'new-password');
  });
});
