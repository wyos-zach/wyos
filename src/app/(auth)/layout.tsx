'use client';

import { useAuthStore } from '@/store/Auth';
import { useRouter } from 'next/navigation';
import React from 'react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session, hydrated } = useAuthStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (hydrated) {
      setIsLoading(false);
      if (session) {
        router.replace('/dashboard');
      }
    }
  }, [session, router, hydrated]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <LoadingSpinner />
      </div>
    );
  }

  // Redirect authenticated users
  if (session) {
    return null;
  }

  return (
    <main className='flex min-h-screen w-full items-center justify-center bg-background px-4 py-12'>
      <div className='w-full max-w-[480px]'>{children}</div>
    </main>
  );
}
