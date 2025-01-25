auth-flow.md

## WYOS Authentication Flow Documentation

### **Overview**

WYOS uses Appwrite for authentication, with Zustand for state management. The authentication system includes email/password authentication, Google OAuth, email verification, and password reset functionality.

## **Core Components**

### **State Management (`src/store/Auth.ts`)**

- Uses Zustand with persist and immer middleware
- Manages authentication state:
  - Session management
  - JWT handling
  - User preferences
  - Hydration status

## **Configuration**

### **Client-Side (`src/models/client/config.ts`)**

```tsx
const client = new Client()
  .setEndpoint(env.appwrite.endpoint)
  .setProject(env.appwrite.projectId);

const account = new Account(client);
```

### **Server-Side (`src/models/server/config.ts`)**

```tsx
const client = new Client()
  .setEndpoint(env.appwrite.endpoint)
  .setProject(env.appwrite.projectId)
  .setKey(env.appwrite.apikey);
```

## **Authentication Features**

### **Email/Password Authentication**

- Registration with email verification
- Login with session management
- Password requirements:
  - Minimum 8 characters
  - One uppercase letter
  - One lowercase letter
  - One number

### **OAuth Integration**

- Google authentication support
- OAuth callback handling
- Success/failure redirect management

### **Password Reset Flow**

- Request password reset
- Email verification
- Secure password update
- Confirmation handling

### **Email Verification**

- Automatic verification on registration
- Manual verification request
- Verification link handling

## **Protected Routes**

### **Middleware (`src/middleware.ts`)**

- Database and storage initialization
- Route protection
- Static asset exclusion

### **Auth Layout (`src/app/(auth)/layout.tsx`)**

- Session verification
- Authentication state checks
- Protected route redirects

## **Form Validation**

All authentication forms use Zod schemas for validation:

### **Login Schema**

```tsx
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});
```

### **Registration Schema**

```tsx
const registerSchema = z.object({
  firstname: z.string().min(2),
  lastname: z.string().min(2),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
});
```

## **Custom Hooks**

### **`useLoginForm`**

- Handles login form submission
- Manages loading and error states
- Validates credentials

### **`useRegisterForm`**

- Handles registration
- Auto-login after registration
- Form validation

### **`useForgotPasswordForm`**

- Password reset request
- Email validation
- Success/error handling

### **`useResetPasswordForm`**

- Password reset confirmation
- Password validation
- Success/error states

### **`useVerifyEmailForm`**

- Email verification
- Token validation
- Verification status handling

## **Error Handling**

Custom `AuthError` class for consistent error handling:

```tsx
export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}
```

### **Authentication Routes**

```md
src/app/(auth)/
├── login/
├── register/
├── forgot-password/
├── reset-password/
├── verify/
└── request-verification/
```

## **Environment Variables**

Required variables in `.env.local`:

```tsx
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_API_KEY=your_api_key

# Team IDs
NEXT_PUBLIC_APPWRITE_TEAMS_ADMIN=your_admin_team_id
NEXT_PUBLIC_APPWRITE_TEAMS_MEMBERS=your_members_team_id

# Application URL (for OAuth redirects)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```
