'use client';

import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useAuthStore } from '@/store/AuthStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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
  return <div className='relative flex min-h-screen flex-col'>{children}</div>;
}
