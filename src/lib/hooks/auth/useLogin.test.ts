// src/lib/hooks/auth/useLogin.test.ts
/**
 * @jest-environment jsdom
 * @description Tests for the useLogin hook
 */
import { renderHook, act } from '@testing-library/react';
import { useLoginForm } from './useLogin';
import { useAuthStore } from '@/store/Auth';

// Mock the Auth store
jest.mock('@/store/Auth', () => ({
  useAuthStore: jest.fn(),
}));

describe('useLoginForm', () => {
  const mockLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      login: mockLogin,
    });
  });

  it('should handle successful login', async () => {
    mockLogin.mockResolvedValueOnce({ success: true });

    const { result } = renderHook(() => useLoginForm());

    const mockEvent = {
      preventDefault: jest.fn(),
      currentTarget: {
        email: { value: 'test@example.com' },
        password: { value: 'password123' },
      },
    } as unknown as React.FormEvent<HTMLFormElement>;

    await act(async () => {
      await result.current.handleSubmit(mockEvent);
    });

    expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('');
  });

  it('should handle login error', async () => {
    mockLogin.mockResolvedValueOnce({
      success: false,
      error: { message: 'Invalid credentials' },
    });

    const { result } = renderHook(() => useLoginForm());

    const mockEvent = {
      preventDefault: jest.fn(),
      currentTarget: {
        email: { value: 'test@example.com' },
        password: { value: 'wrong-password' },
      },
    } as unknown as React.FormEvent<HTMLFormElement>;

    await act(async () => {
      await result.current.handleSubmit(mockEvent);
    });

    expect(mockLogin).toHaveBeenCalledWith(
      'test@example.com',
      'wrong-password'
    );
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('Invalid credentials');
  });
});
