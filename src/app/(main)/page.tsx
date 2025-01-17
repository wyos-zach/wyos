'use client';

import { useAuth } from '@/hooks/use-auth';
import { redirect } from 'next/navigation';

export default function HomePage() {
  const { user, isLoading } = useAuth();

  if (!isLoading && !user) {
    redirect('/login');
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-4xl font-bold'>Welcome to WYOS</h1>
    </div>
  );
}
