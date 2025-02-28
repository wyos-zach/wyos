'use client';

import { useAuthStore } from '@/store/Auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function KnowledgeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session, hydrated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (hydrated && !session) {
      router.push('/login?redirect=/knowledge');
    }
  }, [hydrated, session, router]);

  if (!hydrated || !session) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <LoadingSpinner />
      </div>
    );
  }

  // Removed the Container component to allow full-width backgrounds
  return (
    <div className='relative flex min-h-screen flex-col'>
      {children}
    </div>
  );
}
