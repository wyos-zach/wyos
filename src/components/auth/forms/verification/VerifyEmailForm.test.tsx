/**
 * @jest-environment jsdom
 * @description Tests for the VerifyEmailForm component
 */
import { render, screen } from '@/__tests__/test-utils';
import { VerifyEmailForm } from './VerifyEmailForm';
import { useVerifyEmailForm } from '@/lib/hooks/auth/useVerifyEmail';
import { useSearchParams } from 'next/navigation';

// Mock the hook
jest.mock('@/lib/hooks/auth/useVerifyEmail');
// Mock Next.js router
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(() => ({
    get: (param: string) => {
      if (param === 'userId') return 'test-user-id';
      if (param === 'secret') return 'test-secret';
      return null;
    }
  })),
}));

describe('VerifyEmailForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading state during verification', () => {
    (useVerifyEmailForm as jest.Mock).mockReturnValue({
      isLoading: true,
      error: null,
      success: false,
    });

    render(<VerifyEmailForm userId="test-user-id" secret="test-secret" />);

    expect(screen.getByText(/verifying your email/i)).toBeInTheDocument();
    expect(screen.getByText(/please wait/i)).toBeInTheDocument();
  });

  it('shows error message when verification fails', () => {
    const errorMessage = 'Invalid verification token';
    (useVerifyEmailForm as jest.Mock).mockReturnValue({
      isLoading: false,
      error: errorMessage,
      success: false,
    });

    render(<VerifyEmailForm userId="test-user-id" secret="test-secret" />);

    expect(screen.getByText(/email verification status/i)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /request new verification email/i })).toBeInTheDocument();
  });

  it('shows success message when verification is successful', () => {
    (useVerifyEmailForm as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      success: true,
    });

    render(<VerifyEmailForm userId="test-user-id" secret="test-secret" />);

    expect(screen.getByText(/email verified successfully/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
  });

  it('shows missing parameters message when userId or secret is missing', () => {
    // Override the mock to return null for userId and secret
    (useSearchParams as jest.Mock).mockImplementationOnce(() => ({
      get: () => null,
    }));

    (useVerifyEmailForm as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      success: false,
    });

    render(<VerifyEmailForm userId="" secret="" />);

    expect(screen.getByText(/email verification status/i)).toBeInTheDocument();
  });
});
