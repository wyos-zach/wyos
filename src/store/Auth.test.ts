/**
 * @jest-environment jsdom
 */
import { useAuthStore, type UserPrefs } from './Auth';
import { account } from '@/models/client/config';
import { AppwriteException, type Models, OAuthProvider } from 'appwrite';

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
      const mockUser = {
        $id: 'user-id',
        email: 'test@example.com',
        prefs: { reputation: 10 },
      };
      const mockSession = { $id: 'session-id' };
      const mockJWT = 'jwt-token';

      // Mock successful login
      (account.createEmailPasswordSession as jest.Mock).mockResolvedValueOnce(
        mockSession
      );
      (account.get as jest.Mock).mockResolvedValueOnce(mockUser);
      (account.createJWT as jest.Mock).mockResolvedValueOnce({ jwt: mockJWT });

      const result = await useAuthStore
        .getState()
        .login('test@example.com', 'password');

      expect(result.success).toBe(true);
      expect(result.error).toBeUndefined();
      expect(account.createEmailPasswordSession).toHaveBeenCalledWith(
        'test@example.com',
        'password'
      );
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
      const mockError = new AppwriteException(
        'Invalid credentials',
        401,
        'authentication_error'
      );

      (account.createEmailPasswordSession as jest.Mock).mockRejectedValueOnce(
        mockError
      );

      const result = await useAuthStore
        .getState()
        .login('test@example.com', 'wrong-password');

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
        user: { $id: 'user-id' } as Models.User<UserPrefs>,
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
      const mockUser = {
        $id: 'user-id',
        email: 'test@example.com',
        prefs: { reputation: 10 },
      };
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
        user: { $id: 'user-id' } as Models.User<UserPrefs>,
        hydrated: true,
      });

      // Mock failed session verification
      (account.getSession as jest.Mock).mockRejectedValueOnce(
        new Error('Session expired')
      );

      await useAuthStore.getState().verifySession();

      // Check store state is reset
      const state = useAuthStore.getState();
      expect(state.user).toBeNull();
      expect(state.session).toBeNull();
      expect(state.jwt).toBeNull();
    });
  });

  describe('createAccount', () => {
    it('successfully creates a new account', async () => {
      // Mock successful account creation
      (account.create as jest.Mock).mockResolvedValueOnce({
        $id: 'new-user-id',
        email: 'new@example.com',
        name: 'New User',
      });

      const result = await useAuthStore
        .getState()
        .createAccount('New User', 'new@example.com', 'password123');

      expect(result.success).toBe(true);
      expect(result.error).toBeUndefined();
      expect(account.create).toHaveBeenCalledWith(
        expect.any(String), // ID.unique() generates a random ID
        'new@example.com',
        'password123',
        'New User'
      );
    });

    it('handles account creation failure', async () => {
      // Mock account creation failure (e.g., email already exists)
      const mockError = new AppwriteException(
        'Email already exists',
        409,
        'user_already_exists'
      );

      (account.create as jest.Mock).mockRejectedValueOnce(mockError);

      const result = await useAuthStore
        .getState()
        .createAccount('New User', 'existing@example.com', 'password123');

      expect(result.success).toBe(false);
      expect(result.error).toEqual(mockError);
    });
  });

  describe('requestPasswordReset', () => {
    it('successfully requests a password reset', async () => {
      // Mock successful password reset request
      (account.createRecovery as jest.Mock).mockResolvedValueOnce({});

      const result = await useAuthStore
        .getState()
        .requestPasswordReset('user@example.com');

      expect(result.success).toBe(true);
      expect(result.error).toBeUndefined();
      expect(account.createRecovery).toHaveBeenCalledWith(
        'user@example.com',
        expect.stringContaining('/reset-password')
      );
    });

    it('handles password reset request failure', async () => {
      // Mock password reset request failure
      const mockError = new AppwriteException(
        'User not found',
        404,
        'user_not_found'
      );

      (account.createRecovery as jest.Mock).mockRejectedValueOnce(mockError);

      const result = await useAuthStore
        .getState()
        .requestPasswordReset('nonexistent@example.com');

      expect(result.success).toBe(false);
      expect(result.error).toEqual(mockError);
    });
  });

  describe('confirmPasswordReset', () => {
    it('successfully confirms a password reset', async () => {
      // Mock successful password reset confirmation
      (account.updateRecovery as jest.Mock).mockResolvedValueOnce({});

      const result = await useAuthStore
        .getState()
        .confirmPasswordReset('user-id', 'secret-token', 'new-password');

      expect(result.success).toBe(true);
      expect(result.error).toBeUndefined();
      expect(account.updateRecovery).toHaveBeenCalledWith(
        'user-id',
        'secret-token',
        'new-password'
      );
    });

    it('handles password reset confirmation failure', async () => {
      // Mock password reset confirmation failure
      const mockError = new AppwriteException(
        'Invalid token',
        401,
        'invalid_token'
      );

      (account.updateRecovery as jest.Mock).mockRejectedValueOnce(mockError);

      const result = await useAuthStore
        .getState()
        .confirmPasswordReset('user-id', 'invalid-token', 'new-password');

      expect(result.success).toBe(false);
      expect(result.error).toEqual(mockError);
    });
  });

  describe('verifyEmail', () => {
    it('successfully verifies email', async () => {
      // Mock successful email verification
      (account.updateVerification as jest.Mock).mockResolvedValueOnce({});

      const result = await useAuthStore
        .getState()
        .verifyEmail('user-id', 'verification-token');

      expect(result.success).toBe(true);
      expect(result.error).toBeUndefined();
      expect(account.updateVerification).toHaveBeenCalledWith(
        'user-id',
        'verification-token'
      );
    });

    it('handles email verification failure', async () => {
      // Mock email verification failure
      const mockError = new AppwriteException(
        'Invalid token',
        401,
        'invalid_token'
      );

      (account.updateVerification as jest.Mock).mockRejectedValueOnce(
        mockError
      );

      const result = await useAuthStore
        .getState()
        .verifyEmail('user-id', 'invalid-token');

      expect(result.success).toBe(false);
      expect(result.error).toEqual(mockError);
    });
  });

  describe('requestEmailVerification', () => {
    it('successfully requests email verification', async () => {
      // Mock successful email verification request
      (account.createVerification as jest.Mock).mockResolvedValueOnce({});

      const result = await useAuthStore.getState().requestEmailVerification();

      expect(result.success).toBe(true);
      expect(result.error).toBeUndefined();
      expect(account.createVerification).toHaveBeenCalledWith(
        expect.stringContaining('/verify-email')
      );
    });

    it('handles email verification request failure', async () => {
      // Mock email verification request failure
      const mockError = new AppwriteException(
        'User not found',
        404,
        'user_not_found'
      );

      (account.createVerification as jest.Mock).mockRejectedValueOnce(
        mockError
      );

      const result = await useAuthStore.getState().requestEmailVerification();

      expect(result.success).toBe(false);
      expect(result.error).toEqual(mockError);
    });
  });

  describe('createOAuthSession', () => {
    it('successfully creates an OAuth session', async () => {
      // Mock successful OAuth session creation
      (account.createOAuth2Session as jest.Mock).mockResolvedValueOnce({});

      const result = await useAuthStore
        .getState()
        .createOAuthSession(OAuthProvider.Github);

      expect(result.success).toBe(true);
      expect(result.error).toBeUndefined();
      expect(account.createOAuth2Session).toHaveBeenCalledWith(
        OAuthProvider.Github,
        expect.stringContaining('/auth/callback'),
        expect.stringContaining('/login')
      );
    });

    it('handles OAuth session creation failure', async () => {
      // Mock OAuth session creation failure
      const mockError = new AppwriteException(
        'Provider not supported',
        400,
        'provider_not_supported'
      );

      (account.createOAuth2Session as jest.Mock).mockRejectedValueOnce(
        mockError
      );

      const result = await useAuthStore
        .getState()
        .createOAuthSession(OAuthProvider.Github);

      expect(result.success).toBe(false);
      expect(result.error).toEqual(mockError);
    });
  });
});
