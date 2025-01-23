'use client';

import React from 'react';
import { InputAnimation } from '@/components/ui/input-with-label-animation';
import { RippleButton } from '@/components/ui/ripple-button';
import { useAuthStore } from '@/store/Auth';
import Link from 'next/link';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
});

const BottomGradient = () => {
  return (
    <>
      <span className='absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100' />
      <span className='absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100' />
    </>
  );
};

export default function LoginPage() {
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    try {
      loginSchema.parse(formValues);

      setIsLoading(true);
      setError('');

      const loginResponse = await login(formValues.email, formValues.password);
      if (loginResponse.error) {
        setError(loginResponse.error.message);
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='mx-auto w-full max-w-md rounded-none border border-solid border-white/30 bg-white p-4 shadow-input dark:bg-black md:rounded-2xl md:p-8'>
      <h2 className='text-xl font-bold text-neutral-800 dark:text-neutral-200'>
        Welcome back to WYOS
      </h2>
      <p className='mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300'>
        Login to access your account.{' '}
        <Link href='/register' className='text-orange-500 hover:underline'>
          Register
        </Link>{' '}
        if you don't have an account yet.
      </p>

      {error && (
        <p className='mt-4 text-center text-sm text-red-500 dark:text-red-400'>
          {error}
        </p>
      )}

      <form className='my-8 space-y-4' onSubmit={handleSubmit}>
        <InputAnimation
          label='Email'
          name='email'
          type='email'
          disabled={isLoading}
        />

        <InputAnimation
          label='Password'
          name='password'
          type='password'
          disabled={isLoading}
        />

        <RippleButton type='submit' disabled={isLoading} className='w-full'>
          {isLoading ? 'Logging in...' : 'Login'}
          <BottomGradient />
        </RippleButton>

        <div className='my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700' />

        <RippleButton
          type='button'
          disabled={isLoading}
          className='flex w-full items-center justify-center space-x-2 border border-neutral-200 dark:border-neutral-800'
        >
          <svg className='h-4 w-4' viewBox='0 0 24 24'>
            <path
              fill='currentColor'
              d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
            />
            <path
              fill='currentColor'
              d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
            />
            <path
              fill='currentColor'
              d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
            />
            <path
              fill='currentColor'
              d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
            />
          </svg>
          <span>Continue with Google</span>
          <BottomGradient />
        </RippleButton>
      </form>
    </div>
  );
}
