'use client';

import { useToast } from '@/lib/hooks/shared/useToast';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CancelPage() {
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    toast({
      variant: 'destructive',
      title: 'Cancelled',
      description: 'Your subscription was not completed.',
    });

    // Redirect back to pricing after showing the message
    setTimeout(() => router.push('/pricing'), 2000);
  }, [toast, router]);

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold'>Subscription Cancelled</h1>
        <p className='mt-4'>Redirecting back to pricing...</p>
      </div>
    </div>
  );
}
