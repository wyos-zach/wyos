import { ID } from 'appwrite';
import { account } from '@/models/client/config';

export const authApi = {
  getCurrentUser: () => account.get(),

  login: (email: string, password: string) =>
    account.createSession(email, password),

  signup: (email: string, password: string, name: string) =>
    account.create(ID.unique(), email, password, name),

  logout: () => account.deleteSession('current'),

  createVerification: (url: string) => account.createVerification(url),

  updateVerification: (userId: string, secret: string) =>
    account.updateVerification(userId, secret),

  createRecovery: (email: string, url: string) =>
    account.createRecovery(email, url),

  updateRecovery: (userId: string, secret: string, password: string) =>
    account.updateRecovery(userId, secret, password),
};
