# WYOS Authentication Flow Documentation

## **Overview**

Authentication in WYOS is handled by Appwrite, which provides built-in authentication features including session management, email verification, and password reset functionality.

## **Configuration Files**

## **1. Appwrite Client Setup** `src/lib/services/appwrite/config.ts` :

```tsx
import { Client, Account } from 'appwrite';

export const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_API_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

export const account = new Account(client);
```

## **2. Authentication API Methods** `src/lib/services/appwrite/api.ts` :

```tsx
import { ID } from 'appwrite';
import { account } from './config';

export const authApi = {
  getCurrentUser: () => account.get(),
  login: (email: string, password: string) =>
    account.createEmailSession(email, password),
  signup: (email: string, password: string, name: string) =>
    account.create(ID.unique(), email, password, name),
  logout: () => account.deleteSession('current'),
};
```

## **Environment Variables**

Required variables in `.env.local` :

```tsx
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_API_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_API_KEY=your_api_key
```

## **Features Handled by Appwrite**

- Session management
- Route protection
- Authentication state
- Cookie management
- Token refresh
- Security features
- Email verification
- Password reset

## **Implementation Notes**

1. No additional middleware needed - Appwrite handles route protection
2. No context providers needed - Appwrite manages auth state
3. No custom session management - Appwrite handles sessions
4. No additional security implementation - Appwrite provides security features

## **Appwrite Console Configuration**

1. Create project in Appwrite Console
2. Enable Email/Password authentication
3. Configure project settings
4. Generate API key with required permissions
5. Set up email templates (optional)

## **Current Implementation Status**

- Authentication setup complete
- Login and Register pages implemented
- Environment variables configured
- Appwrite project connected
- API key generated and configured
