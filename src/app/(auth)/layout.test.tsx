// src/app/(auth)/layout.test.tsx
/**
 * @jest-environment jsdom
 * @description Tests for the authentication layout
 */
import { render, screen, waitFor, act } from '@/__tests__/test-utils';
import AuthLayout from './layout';
import { useAuthStore } from '@/store/Auth';
import { useRouter } from 'next/navigation';

// Mock the Auth store and Next.js router
jest.mock('@/store/Auth', () => ({
  useAuthStore: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('AuthLayout', () => {
  const mockVerifySession = jest.fn();
  const mockReplace = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      replace: mockReplace,
    });
  });

  it('shows loading spinner while checking authentication', async () => {
    // Mock verifySession to return a promise that doesn't resolve immediately
    mockVerifySession.mockImplementation(() => new Promise(() => {}));

    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      session: null,
      hydrated: true,
      verifySession: mockVerifySession,
    });

    await act(async () => {
      render(
        <AuthLayout>
          <div data-testid='child-content'>Test Content</div>
        </AuthLayout>
      );
    });

    // Wait for the component to render the loading state
    await waitFor(() => {
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
    expect(screen.queryByTestId('child-content')).not.toBeInTheDocument();
  });

  it('redirects authenticated users to dashboard', async () => {
    // Mock verifySession to resolve immediately
    mockVerifySession.mockResolvedValue(undefined);

    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      session: { $id: 'test-session' },
      hydrated: true,
      verifySession: mockVerifySession,
    });

    await act(async () => {
      render(
        <AuthLayout>
          <div data-testid='child-content'>Test Content</div>
        </AuthLayout>
      );
    });

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('renders children for unauthenticated users', async () => {
    mockVerifySession.mockResolvedValueOnce(undefined);

    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      session: null,
      hydrated: true,
      verifySession: mockVerifySession,
    });

    await act(async () => {
      render(
        <AuthLayout>
          <div data-testid='child-content'>Test Content</div>
        </AuthLayout>
      );
    });

    await waitFor(() => {
      expect(screen.getByTestId('child-content')).toBeInTheDocument();
    });
  });
});
