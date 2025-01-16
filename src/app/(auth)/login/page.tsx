// src/app/(auth)/login/page.tsx
import { LoginForm } from '@/components/forms/LoginForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login - WYOS',
  description: 'Login to your WYOS account',
};

export default function LoginPage() {
  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <LoginForm />
      </div>
    </div>
  );
}
