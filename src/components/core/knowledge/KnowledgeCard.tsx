'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { KnowledgeEntry } from '@/types/core/knowledge';

interface KnowledgeCardProps {
  entry: KnowledgeEntry;
  className?: string;
}

export const KnowledgeCard = ({ entry, className }: KnowledgeCardProps) => {
  return (
    <Link
      href={`/knowledge/${entry.categorySlug}/${entry.slug}`}
      aria-label={`View ${entry.title} entry`}
      className='group block'
    >
      <motion.article
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          'relative flex h-full flex-col overflow-hidden rounded-lg border bg-card shadow-sm',
          'transition-all hover:shadow-md group-hover:border-primary',
          className
        )}
      >
        {entry.imageUrl && (
          <div className='relative aspect-video bg-muted'>
            <Image
              src={entry.imageUrl}
              alt={`Cover image for ${entry.title}`}
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              className='object-cover'
              quality={80}
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
            {entry.featured && (
              <div className='rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground'>
                Featured
              </div>
            )}
          </div>

          <h3 className='mt-2 text-xl font-semibold tracking-tight'>
            {entry.title}
          </h3>

          {entry.summary && (
            <p className='mt-2 line-clamp-3 text-sm text-muted-foreground'>
              {entry.summary}
            </p>
          )}
        </div>
      </motion.article>
    </Link>
  );
};
