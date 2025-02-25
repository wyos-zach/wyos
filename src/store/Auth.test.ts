/**
 * @jest-environment jsdom
 */
import { useAuthStore } from './Auth';
import { account } from '@/models/client/config';
import { AppwriteException, Models } from 'appwrite';

// Mock the Appwrite account module
jest.mock('@/models/client/config', () => ({
  account: {
    get: jest.fn(),
    getSession: jest.fn(), 
    createEmailPasswordSession: jest.fn(),
    create: jest.fn(),
    createJWT: jest.fn(),
    deleteSessions: jest.fn(),
    updateRecovery: jest.fn(),
    createRecovery: jest.fn(),
    updateVerification: jest.fn(),
    createVerification: jest.fn(),
    createOAuth2Session: jest.fn(),
    updatePrefs: jest.fn(),
  },
}));

describe('Auth Store', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset the store state
    useAuthStore.setState({
      session: null,
      jwt: null,
      user: null,
      hydrated: false,
    });
  });

  describe('setHydrated', () => {
    it('sets hydrated state to true', () => {
      useAuthStore.getState().setHydrated();
      expect(useAuthStore.getState().hydrated).toBe(true);
    });
  });

  describe('login', () => {
    it('successfully logs in user', async () => {
      const mockUser = { $id: 'user-id', email: 'test@example.com', prefs: { reputation: 10 } };
      const mockSession = { $id: 'session-id' };
      const mockJWT = 'jwt-token';

      // Mock successful login
      (account.createEmailPasswordSession as jest.Mock).mockResolvedValueOnce(mockSession);
      (account.get as jest.Mock).mockResolvedValueOnce(mockUser);
      (account.createJWT as jest.Mock).mockResolvedValueOnce({ jwt: mockJWT });

      const result = await useAuthStore.getState().login('test@example.com', 'password');

      expect(result.success).toBe(true);
      expect(result.error).toBeUndefined();
      expect(account.createEmailPasswordSession).toHaveBeenCalledWith('test@example.com', 'password');
      expect(account.get).toHaveBeenCalled();
      expect(account.createJWT).toHaveBeenCalled();

      // Check store state
      const state = useAuthStore.getState();
      expect(state.user).toEqual(mockUser);
      expect(state.session).toEqual(mockSession);
      expect(state.jwt).toBe(mockJWT);
    });

    it('handles login failure', async () => {
      // Mock login failure
      const mockError = new AppwriteException('Invalid credentials', 401, 'authentication_error');
      
      (account.createEmailPasswordSession as jest.Mock).mockRejectedValueOnce(mockError);

      const result = await useAuthStore.getState().login('test@example.com', 'wrong-password');

      expect(result.success).toBe(false);
      expect(result.error).toEqual(mockError);

      // Check store state remains unchanged
      const state = useAuthStore.getState();
      expect(state.user).toBeNull();
      expect(state.session).toBeNull();
      expect(state.jwt).toBeNull();
    });
  });

  describe('logout', () => {
    it('successfully logs out user', async () => {
      // Setup initial state
      useAuthStore.setState({
        session: { $id: 'session-id' } as Models.Session,
        jwt: 'jwt-token',
        user: { $id: 'user-id' } as Models.User,
        hydrated: true,
      });

      // Mock successful logout
      (account.deleteSessions as jest.Mock).mockResolvedValueOnce({});

      await useAuthStore.getState().logout();

      expect(account.deleteSessions).toHaveBeenCalled();

      // Check store state is reset
      const state = useAuthStore.getState();
      expect(state.user).toBeNull();
      expect(state.session).toBeNull();
      expect(state.jwt).toBeNull();
    });
  });

  describe('verifySession', () => {
    it('verifies and updates session when valid', async () => {
      const mockUser = { $id: 'user-id', email: 'test@example.com', prefs: { reputation: 10 } };
      const mockSession = { $id: 'session-id' };
      const mockJWT = 'jwt-token';

      // Mock successful session verification
      (account.getSession as jest.Mock).mockResolvedValueOnce(mockSession);
      (account.get as jest.Mock).mockResolvedValueOnce(mockUser);
      (account.createJWT as jest.Mock).mockResolvedValueOnce({ jwt: mockJWT });

      await useAuthStore.getState().verifySession();

      expect(account.getSession).toHaveBeenCalledWith('current');
      expect(account.get).toHaveBeenCalled();
      expect(account.createJWT).toHaveBeenCalled();

      // Check store state is updated
      const state = useAuthStore.getState();
      expect(state.user).toEqual(mockUser);
      expect(state.session).toEqual(mockSession);
      expect(state.jwt).toBe(mockJWT);
    });

    it('clears session when verification fails', async () => {
      // Setup initial state
      useAuthStore.setState({
        session: { $id: 'session-id' } as Models.Session,
        jwt: 'jwt-token',
        user: { $id: 'user-id' } as Models.User,
        hydrated: true,
      });

      // Mock failed session verification
      (account.getSession as jest.Mock).mockRejectedValueOnce(new Error('Session expired'));

      await useAuthStore.getState().verifySession();

      // Check store state is reset
      const state = useAuthStore.getState();
      expect(state.user).toBeNull();
      expect(state.session).toBeNull();
      expect(state.jwt).toBeNull();
    });
  });

  // Additional tests can be added for other methods like:
  // - createAccount
  // - requestPasswordReset
  // - confirmPasswordReset
  // - verifyEmail
  // - requestEmailVerification
  // - createOAuthSession
});
