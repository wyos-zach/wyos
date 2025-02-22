'use client';

import { Container } from '@/components/ui/container';
import { useAuthStore } from '@/store/Auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session, hydrated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (hydrated && !session) {
      router.push('/login?redirect=/resources');
    }
  }, [hydrated, session, router]);

  if (!hydrated || !session) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className='relative flex min-h-screen flex-col'>
      <Container as='main' className='flex-1 py-8 md:py-12 lg:py-16'>
        {children}
      </Container>
    </div>
  );
}
