/**
 * @jest-environment jsdom
 * @description Tests for the ForgotPasswordForm component
 */
import { render, screen, fireEvent } from '@/__tests__/test-utils';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { useForgotPasswordForm } from '@/lib/hooks/auth/useForgotPassword';

// Mock the hook
jest.mock('@/lib/hooks/auth/useForgotPassword');

describe('ForgotPasswordForm', () => {
  beforeEach(() => {
    // Default mock implementation
    (useForgotPasswordForm as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      success: false,
      handleSubmit: jest.fn((e) => e.preventDefault()),
    });
  });

  it('renders the form with email input', () => {
    render(<ForgotPasswordForm />);

    // Check for the text content instead of role since it's not using a heading role
    expect(screen.getByText('Reset password')).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send reset link/i })).toBeInTheDocument();
    expect(screen.getByText(/remember your password/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument();
  });

  it('disables the form when loading', () => {
    (useForgotPasswordForm as jest.Mock).mockReturnValue({
      isLoading: true,
      error: null,
      success: false,
      handleSubmit: jest.fn((e) => e.preventDefault()),
    });

    render(<ForgotPasswordForm />);

    expect(screen.getByLabelText(/email/i)).toBeDisabled();
    expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled();
  });

  it('shows error message when there is an error', () => {
    const errorMessage = 'Invalid email address';
    (useForgotPasswordForm as jest.Mock).mockReturnValue({
      isLoading: false,
      error: errorMessage,
      success: false,
      handleSubmit: jest.fn((e) => e.preventDefault()),
    });

    render(<ForgotPasswordForm />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('shows success message when request is successful', () => {
    (useForgotPasswordForm as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      success: true,
      handleSubmit: jest.fn(),
    });

    render(<ForgotPasswordForm />);

    expect(screen.getByText(/check your email for a password reset link/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /back to login/i })).toBeInTheDocument();
    // Form should not be visible
    expect(screen.queryByLabelText(/email/i)).not.toBeInTheDocument();
  });

  it('calls handleSubmit when form is submitted', () => {
    const mockHandleSubmit = jest.fn((e) => e.preventDefault());
    (useForgotPasswordForm as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      success: false,
      handleSubmit: mockHandleSubmit,
    });

    render(<ForgotPasswordForm />);

    fireEvent.submit(screen.getByRole('button', { name: /send reset link/i }));
    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });
});
