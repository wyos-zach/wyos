'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { ResourceEntry } from '@/types/core/resources/entry';

interface ResourceCardProps {
  entry: ResourceEntry;
  className?: string;
}

export const ResourceCard = ({ entry, className }: ResourceCardProps) => {
  return (
    <Link
      href={`/resources/${entry.categorySlug}/${entry.slug}`}
      aria-label={`View ${entry.title} resource`}
      className='group block'
    >
      <motion.article
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          'relative flex h-full flex-col overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md group-hover:border-primary',
          className
        )}
      >
        {entry.imageUrl && (
          <div className='relative aspect-video'>
            <Image
              src={entry.imageUrl}
              alt={`Cover image for ${entry.title}`}
              fill
              className='object-cover'
              sizes='(max-width: 768px) 100vw, 33vw'
              unoptimized
            />
          </div>
        )}
        <div className='flex flex-1 flex-col p-6'>
          <div className='flex items-center justify-between gap-2 text-sm text-muted-foreground'>
            <time dateTime={entry.$createdAt}>
              {new Date(entry.$createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
          </div>
          <h3 className='mt-2 text-xl font-semibold tracking-tight'>
            {entry.title}
          </h3>
          {entry.summary && (
            <p className='mt-2 line-clamp-2 text-muted-foreground'>
              {entry.summary}
            </p>
          )}
        </div>
      </motion.article>
    </Link>
  );
};
