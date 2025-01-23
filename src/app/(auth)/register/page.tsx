'use client';

import { useAuthStore } from '@/store/Auth';
import { InputAnimation } from '@/components/ui/input-with-label-animation';
import { RippleButton } from '@/components/ui/ripple-button';
import { z } from 'zod';
import Link from 'next/link';
import React from 'react';

const registerSchema = z.object({
  firstname: z.string().min(2),
  lastname: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

function Register() {
  const { createAccount, login } = useAuthStore();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = {
      firstname: formData.get('firstname') as string,
      lastname: formData.get('lastname') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    try {
      // Validate form data
      registerSchema.parse(formValues);

      setIsLoading(true);
      setError('');

      const response = await createAccount(
        `${formValues.firstname} ${formValues.lastname}`,
        formValues.email,
        formValues.password
      );

      if (response.error) {
        setError(response.error.message);
        return;
      }

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
        Welcome to WYOS
      </h2>
      <p className='mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300'>
        Sign up with WYOS if you don't have an account.{' '}
        <Link href='/login' className='text-orange-500 hover:underline'>
          Login
        </Link>{' '}
        if you already have one.
      </p>

      {error && (
        <p className='mt-4 text-center text-sm text-red-500 dark:text-red-400'>
          {error}
        </p>
      )}

      <form className='my-8 space-y-4' onSubmit={handleSubmit}>
        <div className='grid grid-cols-2 gap-4'>
          <InputAnimation
            label='First Name'
            name='firstname'
            disabled={isLoading}
          />
          <InputAnimation
            label='Last Name'
            name='lastname'
            disabled={isLoading}
          />
        </div>

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
          {isLoading ? 'Creating Account...' : 'Sign Up'}
        </RippleButton>
      </form>
    </div>
  );
}

export default Register;
