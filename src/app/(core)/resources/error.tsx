'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function ResourcesError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <div className='rounded-lg border border-destructive bg-destructive/10 p-8 text-center'>
      <h2 className='mb-4 text-xl font-semibold text-destructive'>
        Failed to load Resources.
      </h2>
      <p className='mb-4'>{error.message}</p>
      <div className='flex justify-center gap-4'>
        <Button
          onClick={reset}
          className='rounded bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90'
        >
          Try Again
        </Button>
        <Button
          onClick={() => router.push('/resources')}
          className='rounded bg-secondary px-4 py-2 text-secondary-foreground hover:bg-secondary/90'
        >
          Back to Resources
        </Button>
      </div>
    </div>
  );
}
