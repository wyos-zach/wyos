'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { cn } from '@/lib/utils';
import { authApi } from '@/lib/services/appwrite/api';
import { useRouter } from 'next/navigation';
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from '@tabler/icons-react';

export default function SignUpForm() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = `${formData.get('firstname')} ${formData.get('lastname')}`;

    try {
      await authApi.signup(email, password, name);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
    }
  };

  // Rest of your component stays exactly the same
  return (
    <div className='mx-auto w-full max-w-md rounded-none bg-white p-4 shadow-input dark:bg-black md:rounded-2xl md:p-8'>
      {/* Keep all your existing JSX */}
      {error && <p className='mt-2 text-sm text-red-500'>{error}</p>}
      {/* Your existing form JSX */}
    </div>
  );
}
