import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import { AppwriteException, ID, type Models, OAuthProvider } from 'appwrite';
import { account } from '@/models/client/config';

export interface UserPrefs {
  reputation: number;
  theme: 'light' | 'dark';
  emailNotifications: boolean;
  lastActiveAt: string;
}

interface AuthResponse {
  success: boolean;
  error?: {
    code: number;
    message: string;
    type: string;
  } | null;
}

interface IAuthStore {
  session: Models.Session | null;
  jwt: string | null;
  user: Models.User<UserPrefs> | null;
  hydrated: boolean;

  setHydrated(): void;
  verifySession(): Promise<void>;
  login(email: string, password: string): Promise<AuthResponse>;
  createAccount(
    name: string,
    email: string,
    password: string
  ): Promise<AuthResponse>;
  logout(): Promise<void>;
  requestPasswordReset(email: string): Promise<AuthResponse>;
  confirmPasswordReset(
    userId: string,
    secret: string,
    password: string
  ): Promise<AuthResponse>;
  verifyEmail(userId: string, secret: string): Promise<AuthResponse>;
  requestEmailVerification(): Promise<AuthResponse>;
  createOAuthSession(provider: OAuthProvider): Promise<AuthResponse>;
}

export const useAuthStore = create<IAuthStore>()(
  persist(
    immer((set) => ({
      session: null,
      jwt: null,
      user: null,
      hydrated: false,

      setHydrated() {
        set({ hydrated: true });
      },

      async verifySession() {
        try {
          const session = await account.getSession('current');
          const [user, { jwt }] = await Promise.all([
            account.get<UserPrefs>(),
            account.createJWT(),
          ]);
          set({ session, jwt, user });
        } catch (error) {
          set({ session: null, jwt: null, user: null });
          console.error('Session verification failed:', error);
        }
      },

      async login(email: string, password: string) {
        try {
          const session = await account.createEmailPasswordSession(
            email,
            password
          );
          const [user, { jwt }] = await Promise.all([
            account.get<UserPrefs>(),
            account.createJWT(),
          ]);
          if (!user.prefs?.reputation) {
            await account.updatePrefs<UserPrefs>({ reputation: 0 });
          }
          set({ session, jwt, user });
          return { success: true };
        } catch (error) {
          console.error('Login failed:', error);
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },

      async createAccount(name: string, email: string, password: string) {
        try {
          await account.create(ID.unique(), email, password, name);
          return { success: true };
        } catch (error) {
          console.error('Account creation failed:', error);
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },

      async logout() {
        try {
          await account.deleteSessions();
          set({ session: null, jwt: null, user: null });
        } catch (error) {
          console.error('Logout failed:', error);
        }
      },

      async requestPasswordReset(email: string) {
        try {
          await account.createRecovery(
            email,
            `${window.location.origin}/reset-password`
          );
          return { success: true };
        } catch (error) {
          console.error('Password reset request failed:', error);
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },

      async confirmPasswordReset(
        userId: string,
        secret: string,
        password: string
      ) {
        try {
          await account.updateRecovery(userId, secret, password);
          return { success: true };
        } catch (error) {
          console.error('Password reset confirmation failed:', error);
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },

      async verifyEmail(userId: string, secret: string) {
        try {
          await account.updateVerification(userId, secret);
          return { success: true };
        } catch (error) {
          console.error('Email verification failed:', error);
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },

      async requestEmailVerification() {
        try {
          await account.createVerification(
            `${window.location.origin}/verify-email`
          );
          return { success: true };
        } catch (error) {
          console.error('Email verification request failed:', error);
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },

      async createOAuthSession(provider: OAuthProvider) {
        try {
          await account.createOAuth2Session(
            provider,
            `${window.location.origin}/auth/callback`,
            `${window.location.origin}/login`
          );
          return { success: true };
        } catch (error) {
          console.error('OAuth session creation failed:', error);
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },
    })),
    {
      name: 'auth',
      onRehydrateStorage() {
        return (state, error) => {
          if (!error) state?.setHydrated();
        };
      },
    }
  )
);
