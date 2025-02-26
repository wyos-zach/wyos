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

// Mock FormData
const mockFormData = {
  get: jest.fn(),
};
global.FormData = jest.fn(() => mockFormData) as unknown as typeof FormData;

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
    mockFormData.get.mockImplementation((key) => {
      if (key === 'email') return 'test@example.com';
      if (key === 'password') return 'password123';
      return null;
    });

    const { result } = renderHook(() => useLoginForm());

    // Create a mock form event
    const formElement = {} as HTMLFormElement;
    const mockEvent = {
      preventDefault: jest.fn(),
      currentTarget: formElement,
      // Add required properties to satisfy FormEvent interface
      bubbles: false,
      cancelable: false,
      defaultPrevented: false,
      eventPhase: 0,
      isTrusted: false,
      nativeEvent: {} as Event,
      target: formElement,
      timeStamp: 0,
      type: 'submit',
      isDefaultPrevented: () => false,
      isPropagationStopped: () => false,
      persist: () => {},
      stopPropagation: () => {},
    };

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
    mockFormData.get.mockImplementation((key) => {
      if (key === 'email') return 'test@example.com';
      if (key === 'password') return 'wrong-password';
      return null;
    });

    const { result } = renderHook(() => useLoginForm());

    // Create a mock form event
    const formElement = {} as HTMLFormElement;
    const mockEvent = {
      preventDefault: jest.fn(),
      currentTarget: formElement,
      // Add required properties to satisfy FormEvent interface
      bubbles: false,
      cancelable: false,
      defaultPrevented: false,
      eventPhase: 0,
      isTrusted: false,
      nativeEvent: {} as Event,
      target: formElement,
      timeStamp: 0,
      type: 'submit',
      isDefaultPrevented: () => false,
      isPropagationStopped: () => false,
      persist: () => {},
      stopPropagation: () => {},
    };

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
