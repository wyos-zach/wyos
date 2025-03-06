// components/design-system/atoms/skeleton-section.tsx
import React from 'react';
import { Skeleton } from '@/components/ui/atoms/skeleton';

export function SkeletonSection() {
  return (
    <section className='space-y-6 border-t border-zinc-700/30 px-6 py-8'>
      <h2 className='font-heading text-3xl font-bold text-zinc-100'>
        Skeleton
      </h2>
      <p className='text-zinc-400'>
        Skeletons indicate loading content with a shimmering effect. Used for
        placeholders.
      </p>

      {/* Demo 1: Various Sizes */}
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold text-zinc-200'>Sizes</h3>
        <Skeleton className='h-4 w-[200px]' />
        <Skeleton className='h-8 w-[300px]' />
        <Skeleton className='h-12 w-[150px]' />
      </div>

      {/* Demo 2: Card-like Layout */}
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold text-zinc-200'>
          Card Placeholder
        </h3>
        <div className='w-[300px] space-y-3'>
          <Skeleton className='h-40 w-full' /> {/* Image */}
          <Skeleton className='h-6 w-3/4' /> {/* Title */}
          <Skeleton className='h-4 w-full' /> {/* Description Line 1 */}
          <Skeleton className='h-4 w-5/6' /> {/* Description Line 2 */}
        </div>
      </div>

      <div className='text-sm text-zinc-500'>
        <p>Props:</p>
        <ul className='list-inside list-disc'>
          <li>className: string (custom sizing and styling)</li>
        </ul>
      </div>
    </section>
  );
}
