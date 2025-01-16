# WYOS Authentication Flow Documentation

## **Authentication Overview**

### **Technology Stack**

- **Authentication Provider:** Appwrite
- **Implementation:** Next.js 15.3 App Router with Server Components
- **Session Management:** Appwrite Sessions with Server Actions
- **Protected Routes:** Server-side validation with Next.js Middleware

## **Server-Side Authentication**

### **Appwrite Client Configuration**

```tsx
// lib/appwrite/server.ts
import { Client, Account, Databases } from 'node-appwrite';

const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT!)
  .setProject(process.env.APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_API_KEY!);

export const account = new Account(client);
export const databases = new Databases(client);
```

### **Server Actions**

```tsx
// lib/actions/auth.ts
'use server';

import { cookies } from 'next/headers';
import { account } from '@/lib/appwrite/server';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const session = await account.createEmailSession(email, password);
    cookies().set('a_session_', session.$id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
    redirect('/dashboard');
  } catch (error) {
    return { error: 'Authentication failed' };
  }
}

export async function logout() {
  const sessionId = cookies().get('a_session_')?.value;
  if (sessionId) {
    await account.deleteSession(sessionId);
    cookies().delete('a_session_');
  }
  redirect('/login');
}
```

### **Session Validation**

```tsx
// lib/auth.ts
import { cookies } from 'next/headers';
import { account } from '@/lib/appwrite/server';

export async function getSession() {
  const sessionId = cookies().get('a_session_')?.value;
  if (!sessionId) return null;

  try {
    return await account.getSession(sessionId);
  } catch {
    cookies().delete('a_session_');
    return null;
  }
}

export async function getCurrentUser() {
  const session = await getSession();
  if (!session) return null;

  try {
    return await account.get();
  } catch {
    return null;
  }
}
```

### Middleware Implementation

```tsx
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('a_session_');

  if (!sessionCookie?.value) {
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('from', request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/settings/:path*',
    '/stories/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
```

## Client-Side Configuration

```tsx
// lib/appwrite/client.ts
import { Client, Account } from 'appwrite';

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

export const account = new Account(client);
```

## **Authentication Flows**

```tsx
// lib/actions/auth.ts
'use server';

import { cookies } from 'next/headers';
import { account } from '@/lib/appwrite/server';
import { redirect } from 'next/navigation';

export async function register(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const user = await account.create('unique()', email, password);
    const session = await account.createEmailSession(email, password);
    cookies().set('a_session_', session.$id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
    return { success: true, userId: user.$id };
  } catch (error) {
    return { error: handleAuthError(error) };
  }
}

export async function resetPassword(formData: FormData) {
  const email = formData.get('email') as string;

  try {
    await account.createRecovery(
      email,
      `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`
    );
    return { success: true };
  } catch (error) {
    return { error: handleAuthError(error) };
  }
}
```

## **User Data Management**

### **User Profile Schema**

```tsx
// types/user.ts
export interface UserProfile {
  userId: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  preferences: {
    theme: 'light' | 'dark';
  };
}
```

### Type Definitions

```tsx
// types/auth.ts
export type AuthError = {
  code: number;
  message: string;
  type: string;
};

export type AuthResult = {
  success?: boolean;
  error?: string;
  userId?: string;
};
```

### **Profile Management**

```tsx
// lib/actions/profile.ts
'use server';

import { databases } from '@/lib/appwrite/server';
import { getCurrentUser } from '@/lib/auth';

export async function getUserProfile() {
  const user = await getCurrentUser();
  if (!user) return null;

  try {
    return await databases.getDocument('main', 'profiles', user.$id);
  } catch (error) {
    return null;
  }
}
```

## **Security Implementation**

### **Security Headers**

```tsx
// next.config.mjs
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          // ... other headers
        ],
      },
    ];
  },
};
```

## **Error Handling**

### **Authentication Errors**

```tsx
// lib/utils/errors.ts
export function handleAuthError(error: unknown) {
  if (typeof error === 'object' && error && 'code' in error) {
    switch (error.code) {
      case 401:
        return 'Invalid credentials';
      case 429:
        return 'Too many attempts';
      case 503:
        return 'Service unavailable';
      default:
        return 'An unexpected error occurred';
    }
  }
  return 'An unexpected error occurred';
}
```

### Form Validation

```tsx
// lib/validations/auth.ts
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const registerSchema = loginSchema.extend({
  name: z.string().min(2),
});
```

## **Protected Routes Implementation**

### **Layout Protection**

```tsx
// app/(protected)/layout.tsx
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  return <>{children}</>;
}
```

### **Protected Server Component**

```tsx
// app/(protected)/dashboard/page.tsx
import { getCurrentUser } from '@/lib/auth';

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
    </div>
  );
}
```

### Form Handling with Server Actions

```tsx
// app/(auth)/login/page.tsx
import { login } from '@/lib/actions/auth';

export default function LoginPage() {
  return (
    <form action={login}>
      <input type='email' name='email' required />
      <input type='password' name='password' required />
      <button type='submit'>Login</button>
    </form>
  );
}
```

### Environment Variables

```tsx
# Server-side only
APPWRITE_API_KEY=your-api-key
APPWRITE_PROJECT_ID=your-project-id
APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1

# Public
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your-project-id
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1

```
