// docs/AUTHENTICATION.md

# WYOS Authentication System

## Overview

The WYOS authentication system uses Appwrite as the backend authentication provider, with a Zustand store for state management. The system supports:

- Email/password authentication
- OAuth authentication (Google)
- Password reset
- Email verification
- Session management

## Architecture

### Components

1. **Auth Store**: Central state management for authentication
2. **Auth Layout**: Handles session verification and redirects
3. **Auth Forms**: UI components for authentication flows
4. **Auth Hooks**: Custom hooks for form handling and validation

### Data Flow

1. User interacts with auth forms
2. Form hooks validate input and call Auth store methods
3. Auth store communicates with Appwrite
4. UI updates based on Auth store state

## Implementation Details

### Auth Store

The Auth store (`src/store/Auth.ts`) is implemented using Zustand with the following features:

- State persistence using Zustand's persist middleware
- Immutable state updates with Immer
- Type-safe state and methods with TypeScript
- Session verification and management
- Login, registration, and logout functionality
- Password reset and email verification

### Authentication Layout

The authentication layout (`src/app/(auth)/layout.tsx`) provides:

- Session verification on mount
- Loading states during authentication checks
- Redirection for authenticated users
- Centralized layout for authentication forms

### Authentication Forms

- **Login Form**: Email/password login with validation
- **Register Form**: New user registration with validation
- **Password Reset Forms**: Request and confirm password resets
- **Email Verification Forms**: Verify email addresses
