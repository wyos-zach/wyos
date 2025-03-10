'use client';

import { Skeleton } from '@/components/design-system/atoms/skeleton';
import { motion } from 'framer-motion';

interface ContentCardSkeletonProps {
  showBadge?: boolean; // For featured content
  showIcon?: boolean; // For category icon
}

export function ContentCardSkeleton({
  showBadge = false,
  showIcon = true,
}: ContentCardSkeletonProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className='relative flex flex-col gap-4 rounded-lg border border-border/50 bg-card/70 p-6 shadow-md backdrop-blur-md transition-shadow duration-300 hover:shadow-lg'
    >
      {/* Glassmorphism Card Container */}
      <div className='shimmer absolute inset-0' />

      {/* Category Label and Icon */}
      <div className='flex items-center gap-2'>
        {showIcon && <Skeleton className='h-6 w-6 rounded-full' />}
        <Skeleton className='h-4 w-1/4' />
      </div>

      {/* Title and Summary */}
      <div className='space-y-2'>
        <Skeleton className='h-6 w-3/4' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-2/3' />
      </div>

      {/* Image Placeholder */}
      <Skeleton className='aspect-video w-full rounded-md bg-muted/50' />

      {/* Featured Badge (Optional) */}
      {showBadge && (
        <Skeleton className='absolute right-4 top-4 h-6 w-16 rounded-full bg-muted/50' />
      )}

      {/* Subtle Gradient Overlay */}
      <div className='feature-overlay pointer-events-none absolute inset-0' />
    </motion.div>
  );
}
