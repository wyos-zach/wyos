'use client';

import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { authApi } from '@/lib/services/appwrite/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authApi.login(email, password);
      router.push('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className='w-full max-w-md space-y-8'>
      <div className='relative z-20'>
        <div className='relative z-10 mx-auto'>
          <div className='relative space-y-2 text-center'>
            <h1 className='text-3xl font-bold text-white'>Welcome back</h1>
            <p className='mx-auto max-w-xl text-base text-gray-400'>
              Enter your email and password to sign in
            </p>
          </div>

          <form onSubmit={handleSubmit} className='mt-8 space-y-6'>
            <div className='space-y-4'>
              <div>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Enter your email'
                  required
                />
              </div>

              <div>
                <Label htmlFor='password'>Password</Label>
                <Input
                  id='password'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='••••••••'
                  required
                />
              </div>
            </div>

            <button
              type='submit'
              className='relative w-full rounded-lg border border-transparent bg-white px-6 py-3 text-base font-medium text-black transition-all hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2'
            >
              Sign in
            </button>
          </form>

          <p className='mt-6 text-center text-sm text-gray-400'>
            Don't have an account?{' '}
            <Link
              href='/register'
              className='font-semibold text-white hover:text-gray-300'
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
