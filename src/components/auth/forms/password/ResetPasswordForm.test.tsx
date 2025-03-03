/**
 * @jest-environment jsdom
 * @description Tests for the ResetPasswordForm component
 */
import { render, screen, fireEvent } from '@/__tests__/test-utils';
import { ResetPasswordForm } from './ResetPasswordForm';
import { useResetPasswordForm } from '@/lib/hooks/auth/useResetPassword';

// Mock the hook
jest.mock('@/lib/hooks/auth/useResetPassword');
// Mock Next.js router
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(() => ({
    get: (param: string) => {
      if (param === 'userId') return 'test-user-id';
      if (param === 'secret') return 'test-secret';
      return null;
    },
  })),
}));

describe('ResetPasswordForm', () => {
  beforeEach(() => {
    // Default mock implementation
    (useResetPasswordForm as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      success: false,
      handleSubmit: jest.fn((e) => e.preventDefault()),
    });
  });

  it('renders the form with password inputs', () => {
    render(<ResetPasswordForm userId='test-user-id' secret='test-secret' />);

    // Check for the text content instead of role since it's not using a heading role
    expect(screen.getByText('Reset your password')).toBeInTheDocument();
    expect(screen.getByLabelText(/new password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /reset password/i })
    ).toBeInTheDocument();
  });

  it('disables the form when loading', () => {
    (useResetPasswordForm as jest.Mock).mockReturnValue({
      isLoading: true,
      error: null,
      success: false,
      handleSubmit: jest.fn((e) => e.preventDefault()),
    });

    render(<ResetPasswordForm userId='test-user-id' secret='test-secret' />);

    expect(screen.getByLabelText(/new password/i)).toBeDisabled();
    expect(screen.getByLabelText(/confirm password/i)).toBeDisabled();
    expect(screen.getByRole('button', { name: /resetting/i })).toBeDisabled();
  });

  it('shows error message when there is an error', () => {
    const errorMessage = 'Invalid reset token';
    (useResetPasswordForm as jest.Mock).mockReturnValue({
      isLoading: false,
      error: errorMessage,
      success: false,
      handleSubmit: jest.fn((e) => e.preventDefault()),
    });

    render(<ResetPasswordForm userId='test-user-id' secret='test-secret' />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('shows success message when password reset is successful', () => {
    (useResetPasswordForm as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      success: true,
      handleSubmit: jest.fn(),
    });

    render(<ResetPasswordForm userId='test-user-id' secret='test-secret' />);

    expect(
      screen.getByText(/your password has been reset successfully/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /back to login/i })
    ).toBeInTheDocument();
    // Form should not be visible
    expect(screen.queryByLabelText(/new password/i)).not.toBeInTheDocument();
  });

  it('calls handleSubmit when form is submitted', () => {
    const mockHandleSubmit = jest.fn((e) => e.preventDefault());
    (useResetPasswordForm as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      success: false,
      handleSubmit: mockHandleSubmit,
    });

    render(<ResetPasswordForm userId='test-user-id' secret='test-secret' />);

    fireEvent.submit(screen.getByRole('button', { name: /reset password/i }));
    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });
});
