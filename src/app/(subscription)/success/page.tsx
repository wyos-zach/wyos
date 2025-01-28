'use client';

import { useToast } from '@/lib/hooks/shared/useToast';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SuccessPage() {
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    toast({
      title: 'Success!',
      description: 'Your subscription has been processed.',
    });

    // Redirect to dashboard after showing the message
    setTimeout(() => router.push('/dashboard'), 2000);
  }, [toast, router]);

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold'>Thank You!</h1>
        <p className='mt-4'>Redirecting to dashboard...</p>
      </div>
    </div>
  );
}
