import type { Models } from 'appwrite';

export type AppwriteUser = Models.User<Models.Preferences>;

export type AuthResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type SignUpCredentials = LoginCredentials & {
  name: string;
};

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}
