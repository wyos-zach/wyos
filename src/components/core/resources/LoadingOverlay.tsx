'use client';
import { useResourcesStore } from '@/store/useResourcesStore';
import { Loader2 } from 'lucide-react';

export const LoadingOverlay = () => {
  const { isFetching } = useResourcesStore();

  if (!isFetching) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm'>
      <div className='flex items-center gap-2 text-foreground'>
        <Loader2 className='h-8 w-8 animate-spin' />
        <span className='text-lg'>Loading...</span>
      </div>
    </div>
  );
};
