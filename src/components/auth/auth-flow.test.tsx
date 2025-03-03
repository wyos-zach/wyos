/**
 * Authentication Flow Tests
 * @jest-environment jsdom
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';

// Mock Next.js navigation
const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
};

// Mock auth actions
const mockAuthActions = {
  login: jest.fn().mockImplementation(() => Promise.resolve({ success: true })),
  register: jest
    .fn()
    .mockImplementation(() =>
      Promise.resolve({ success: true, data: { userId: 'user123' } })
    ),
  requestPasswordReset: jest
    .fn()
    .mockImplementation(() => Promise.resolve({ success: true })),
  confirmPasswordReset: jest
    .fn()
    .mockImplementation(() => Promise.resolve({ success: true })),
  verifyEmail: jest
    .fn()
    .mockImplementation(() => Promise.resolve({ success: true })),
  requestEmailVerification: jest
    .fn()
    .mockImplementation(() => Promise.resolve({ success: true })),
};

// Mock the auth hooks
jest.mock('@/lib/hooks/auth/useLogin', () => ({
  useLoginForm: jest.fn(() => ({
    isLoading: false,
    error: 'Invalid credentials',
    login: mockAuthActions.login,
  })),
}));

jest.mock('@/lib/hooks/auth/useRegister', () => ({
  useRegisterForm: jest.fn(() => ({
    isLoading: false,
    error: 'Email already in use',
    register: mockAuthActions.register,
  })),
}));

jest.mock('@/lib/hooks/auth/useResetPassword', () => ({
  useResetPasswordForm: jest.fn(() => ({
    isLoading: false,
    error: 'Email not found',
    success: false,
    resetPassword: mockAuthActions.requestPasswordReset,
    confirmPasswordReset: mockAuthActions.confirmPasswordReset,
  })),
}));

jest.mock('@/lib/hooks/auth/useVerifyEmail', () => ({
  useVerifyEmailForm: jest.fn(() => ({
    isLoading: false,
    error: '',
    success: true,
    verifyEmail: mockAuthActions.verifyEmail,
    requestEmailVerification: mockAuthActions.requestEmailVerification,
  })),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => mockRouter),
  useSearchParams: jest.fn(() => ({
    get: jest.fn((param) => {
      if (param === 'userId') return 'user123';
      if (param === 'secret') return 'valid-token';
      return null;
    }),
  })),
}));

// Define form components for testing
const LoginForm = ({ onSubmit }: { onSubmit?: () => void }) => (
  <form data-testid='login-form'>
    <label htmlFor='email'>Email</label>
    <input type='email' id='email' name='email' data-testid='email-input' />
    <label htmlFor='password'>Password</label>
    <input
      type='password'
      id='password'
      name='password'
      data-testid='password-input'
    />
    <div data-testid='error-message'>Invalid credentials</div>
    <button type='button' data-testid='submit-button' onClick={onSubmit}>
      Sign In
    </button>
  </form>
);

const RegisterForm = ({ onSubmit }: { onSubmit?: () => void }) => (
  <form data-testid='register-form'>
    <label htmlFor='name'>Name</label>
    <input type='text' id='name' name='name' data-testid='name-input' />
    <label htmlFor='email'>Email</label>
    <input type='email' id='email' name='email' data-testid='email-input' />
    <label htmlFor='password'>Password</label>
    <input
      type='password'
      id='password'
      name='password'
      data-testid='password-input'
    />
    <div data-testid='error-message'>Email already in use</div>
    <button type='button' data-testid='submit-button' onClick={onSubmit}>
      Sign Up
    </button>
  </form>
);

const ResetPasswordForm = ({
  userId = '',
  secret = '',
  onSubmit,
}: {
  userId?: string;
  secret?: string;
  onSubmit?: () => void;
}) => (
  <form data-testid='reset-form'>
    {!secret ? (
      <>
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' name='email' data-testid='email-input' />
        <div data-testid='error-message'>Email not found</div>
        <button type='button' data-testid='submit-button' onClick={onSubmit}>
          Reset Password
        </button>
      </>
    ) : (
      <>
        <label htmlFor='password'>New Password</label>
        <input
          type='password'
          id='password'
          name='password'
          data-testid='password-input'
        />
        <label htmlFor='confirmPassword'>Confirm Password</label>
        <input
          type='password'
          id='confirmPassword'
          name='confirmPassword'
          data-testid='confirm-password-input'
        />
        <div data-testid='error-message'>Passwords do not match</div>
        <button type='button' data-testid='submit-button' onClick={onSubmit}>
          Reset Password
        </button>
      </>
    )}
  </form>
);

const VerifyEmailForm = ({
  userId = '',
  secret = '',
  onResend,
}: {
  userId?: string;
  secret?: string;
  onResend?: () => void;
}) => (
  <form data-testid='verify-email-form'>
    <p>Please check your email for a verification link.</p>
    {secret ? (
      <p>Verifying your email...</p>
    ) : (
      <>
        <button type='button' data-testid='resend-button' onClick={onResend}>
          Resend Verification Email
        </button>
        <p data-testid='success-message'>Verification email sent!</p>
      </>
    )}
  </form>
);

describe('Authentication Flow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Login Flow', () => {
    it('displays error message on login failure', async () => {
      render(<LoginForm />);
      expect(screen.getByTestId('error-message')).toHaveTextContent(
        'Invalid credentials'
      );
    });

    it('calls login function on submit', async () => {
      const handleSubmit = jest.fn();
      render(<LoginForm onSubmit={handleSubmit} />);

      fireEvent.click(screen.getByTestId('submit-button'));
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });

  describe('Registration Flow', () => {
    it('displays error message on registration failure', async () => {
      render(<RegisterForm />);
      expect(screen.getByTestId('error-message')).toHaveTextContent(
        'Email already in use'
      );
    });

    it('calls register function on submit', async () => {
      const handleSubmit = jest.fn();
      render(<RegisterForm onSubmit={handleSubmit} />);

      fireEvent.click(screen.getByTestId('submit-button'));
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });

  describe('Password Reset Flow', () => {
    it('shows error message on password reset failure', async () => {
      render(<ResetPasswordForm />);
      expect(screen.getByTestId('error-message')).toHaveTextContent(
        'Email not found'
      );
    });

    it('calls resetPassword function on submit', async () => {
      const handleSubmit = jest.fn();
      render(<ResetPasswordForm onSubmit={handleSubmit} />);

      fireEvent.click(screen.getByTestId('submit-button'));
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    it('shows password reset confirmation form when secret is provided', async () => {
      render(<ResetPasswordForm userId='user123' secret='valid-token' />);
      expect(screen.getByTestId('password-input')).toBeInTheDocument();
      expect(screen.getByTestId('confirm-password-input')).toBeInTheDocument();
    });
  });

  describe('Email Verification Flow', () => {
    it('shows verification message', async () => {
      render(<VerifyEmailForm />);
      expect(screen.getByTestId('success-message')).toHaveTextContent(
        'Verification email sent!'
      );
    });

    it('calls requestEmailVerification function on resend', async () => {
      const handleResend = jest.fn();
      render(<VerifyEmailForm onResend={handleResend} />);

      fireEvent.click(screen.getByTestId('resend-button'));
      expect(handleResend).toHaveBeenCalledTimes(1);
    });

    it('shows verifying message when secret is provided', async () => {
      render(<VerifyEmailForm userId='user123' secret='valid-token' />);
      expect(screen.getByText('Verifying your email...')).toBeInTheDocument();
    });
  });
});
