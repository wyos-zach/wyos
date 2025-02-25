// src/__tests__/mocks/authStoreMock.ts
/**
 * Mock implementation of the Auth store for testing
 * Provides controlled authentication state for component testing
 */
import { type UserPrefs } from '@/store/Auth';
import { type Models } from 'appwrite';

export const createAuthStoreMock = (initialState = {}) => {
  const defaultState = {
    session: null,
    jwt: null,
    user: null,
    hydrated: true,
    setHydrated: jest.fn(),
    verifySession: jest.fn().mockResolvedValue(undefined),
    login: jest.fn().mockResolvedValue({ success: true }),
    createAccount: jest.fn().mockResolvedValue({ success: true }),
    logout: jest.fn().mockResolvedValue(undefined),
    requestPasswordReset: jest.fn().mockResolvedValue({ success: true }),
    confirmPasswordReset: jest.fn().mockResolvedValue({ success: true }),
    verifyEmail: jest.fn().mockResolvedValue({ success: true }),
    requestEmailVerification: jest.fn().mockResolvedValue({ success: true }),
    createOAuthSession: jest.fn().mockResolvedValue({ success: true }),
  };

  return {
    ...defaultState,
    ...initialState,
  };
};

export const mockAuthenticatedState = createAuthStoreMock({
  session: { $id: 'test-session-id' } as Models.Session,
  jwt: 'test-jwt-token',
  user: {
    $id: 'test-user-id',
    name: 'Test User',
    email: 'test@example.com',
    prefs: {
      reputation: 10,
      theme: 'dark',
      emailNotifications: true,
      lastActiveAt: new Date().toISOString(),
    } as UserPrefs,
  } as Models.User<UserPrefs>,
});

export const mockUnauthenticatedState = createAuthStoreMock();
