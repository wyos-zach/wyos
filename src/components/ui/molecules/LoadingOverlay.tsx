'use client';

import { useContentStore } from '@/store/useContentStore';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface LoadingOverlayProps {
  section: 'knowledge' | 'resources';
  message?: string;
}

export const LoadingOverlay = ({
  section,
  message = 'Loading...',
}: LoadingOverlayProps) => {
  const isFetching = useContentStore((state) => state[section].isFetching);
  const [isVisible, setIsVisible] = useState(false);

  // Smooth fade-in/fade-out effect
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isFetching) {
      setIsVisible(true);
    } else {
      timeout = setTimeout(() => setIsVisible(false), 300); // Delay for fade-out
    }
    return () => clearTimeout(timeout);
  }, [isFetching]);

  if (!isVisible) return null;

  return (
    <div className='glass-effect fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md'>
      <div className='flex items-center gap-3 rounded-lg border border-border/20 bg-card/50 p-4 shadow-lg backdrop-blur-sm'>
        <Loader2 className='animate-spin-slow h-10 w-10 text-primary' />
        <span className='gradient-text text-xl font-medium text-foreground'>
          {message}
        </span>
      </div>
    </div>
  );
};

export default LoadingOverlay;
