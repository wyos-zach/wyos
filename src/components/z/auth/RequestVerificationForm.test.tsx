/**
 * @jest-environment jsdom
 * @description Tests for the RequestVerificationForm component
 */
import { fireEvent, render, screen, waitFor } from '@/__tests__/test-utils';
import { useAuthStore } from '@/store/AuthStore';
import { RequestVerificationForm } from './RequestVerificationForm';

// Mock the auth store
jest.mock('@/store/Auth', () => ({
  useAuthStore: jest.fn(),
}));

describe('RequestVerificationForm', () => {
  beforeEach(() => {
    // Default mock implementation
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      requestEmailVerification: jest.fn().mockResolvedValue({ success: true }),
    });
  });

  it('renders the verification request form', () => {
    render(<RequestVerificationForm />);

    // Check for the text content instead of role since it's not using a heading role
    expect(screen.getByText('Verify your email')).toBeInTheDocument();
    expect(
      screen.getByText(/check your email for a verification link/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /resend verification email/i })
    ).toBeInTheDocument();
  });

  it('disables the button when loading', async () => {
    // Mock implementation that doesn't resolve immediately
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      requestEmailVerification: jest.fn(
        () =>
          new Promise((resolve) => {
            setTimeout(() => resolve({ success: true }), 100);
          })
      ),
    });

    render(<RequestVerificationForm />);

    fireEvent.click(
      screen.getByRole('button', { name: /resend verification email/i })
    );

    expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled();
  });

  it('shows error message when there is an error', async () => {
    const errorMessage = 'Verification request failed';
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      requestEmailVerification: jest.fn().mockResolvedValue({
        error: { message: errorMessage },
      }),
    });

    render(<RequestVerificationForm />);

    fireEvent.click(
      screen.getByRole('button', { name: /resend verification email/i })
    );

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('shows success message when verification request is successful', async () => {
    render(<RequestVerificationForm />);

    fireEvent.click(
      screen.getByRole('button', { name: /resend verification email/i })
    );

    await waitFor(() => {
      expect(screen.getByText(/verification email sent/i)).toBeInTheDocument();
    });
  });
});
