'use client';

import { cn } from '@/lib/utils';

interface FadingDividerProps {
  className?: string;
  opacity?: number;
}

export function FadingDivider({
  className,
  opacity = 0.1,
}: FadingDividerProps) {
  return (
    <div className={cn('relative mx-auto w-full max-w-4xl px-4', className)}>
      <div
        className='h-px w-full'
        style={{
          background: `linear-gradient(
            to right,
            transparent 0%,
            rgba(255, 255, 255, ${opacity}) 50%,
            transparent 100%
          )`,
        }}
      />
    </div>
  );
}
