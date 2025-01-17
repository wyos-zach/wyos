import { ID } from 'appwrite';
import { account } from './config';

export const authApi = {
  getCurrentUser: () => account.get(),

  login: (email: string, password: string) =>
    account.createEmailPasswordSession(email, password),

  signup: (email: string, password: string, name: string) =>
    account.create(ID.unique(), email, password, name),

  logout: () => account.deleteSession('current'),

  // Add verification methods
  createVerification: (url: string) => account.createVerification(url),

  updateVerification: (userId: string, secret: string) =>
    account.updateVerification(userId, secret),
};
