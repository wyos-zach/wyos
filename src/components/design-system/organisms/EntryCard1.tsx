'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

// Base content entry interface with common properties
export interface ContentEntry {
  slug: string;
  categorySlug: string;
  title: string;
  summary?: string;
  imageUrl?: string;
  $createdAt: string;
}

interface ContentCardProps<T extends ContentEntry> {
  entry: T;
  baseUrl: string;
  className?: string;
  contentType?: string;
}

export const ContentCard = <T extends ContentEntry>({
  entry,
  baseUrl,
  className,
  contentType = 'content', // Default label for aria
}: ContentCardProps<T>) => {
  return (
    <Link
      href={`${baseUrl}/${entry.categorySlug}/${entry.slug}`}
      aria-label={`View ${entry.title} ${contentType}`}
      className='group block'
    >
      <motion.article
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -3 }}
        transition={{ duration: 0.2 }}
        className={cn(
          'relative flex h-full flex-col overflow-hidden rounded-lg border bg-card shadow-sm',
          'hover:shadow-lg group-hover:border-primary',
          'transform-gpu backdrop-blur-sm', // Performance boost & subtle glass effect
          className
        )}
      >
        {entry.imageUrl && (
          <div className='relative aspect-video overflow-hidden'>
            <Image
              src={entry.imageUrl}
              alt={`Cover image for ${entry.title}`}
              fill
              className='object-cover transition-transform group-hover:scale-105'
              sizes='(max-width: 768px) 100vw, 33vw'
              unoptimized
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100' />
          </div>
        )}

        <div className='flex flex-1 flex-col p-6'>
          <div className='flex items-center justify-between gap-2 text-sm text-muted-foreground'>
            <time dateTime={entry.$createdAt} className='font-medium'>
              {new Date(entry.$createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
          </div>

          <h3 className='mt-2 text-xl font-semibold tracking-tight transition-colors group-hover:text-primary'>
            {entry.title}
          </h3>

          {entry.summary && (
            <p className='mt-2 line-clamp-2 text-muted-foreground'>
              {entry.summary}
            </p>
          )}

          <div className='mt-4 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full' />
        </div>
      </motion.article>
    </Link>
  );
};
