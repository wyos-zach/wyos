'use client';

import { useAuthStore } from '@/store/Auth';
import { useRouter } from 'next/navigation';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { session, hydrated } = useAuthStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (hydrated) {
      setIsLoading(false);
      if (session) {
        router.push('/');
      }
    }
  }, [session, router, hydrated]);

  if (isLoading) {
    return null;
  }

  if (session) {
    return null;
  }

  return (
    <div className='relative flex min-h-screen flex-col items-center justify-center py-12'>
      <div className='relative'>{children}</div>
    </div>
  );
};

export default Layout;
