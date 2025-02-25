/**
 * @jest-environment jsdom
 * @description Tests for the LoginFields component
 */
import { render, screen } from '@/__tests__/test-utils';
import { LoginFields } from './LoginFields';

describe('LoginFields', () => {
  it('renders email and password fields', () => {
    render(<LoginFields isLoading={false} />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('disables fields when loading', () => {
    render(<LoginFields isLoading={true} />);

    expect(screen.getByLabelText(/email/i)).toBeDisabled();
    expect(screen.getByLabelText(/password/i)).toBeDisabled();
  });
});
