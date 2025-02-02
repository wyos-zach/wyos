'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { KnowledgeEntry } from '@/types/core/knowledge';

interface KnowledgeCardProps {
  entry: KnowledgeEntry;
  className?: string;
}

export const KnowledgeCard = ({ entry, className }: KnowledgeCardProps) => {
  return (
    <Link href={`/knowledge/${entry.categorySlug}/${entry.slug}`}>
      <motion.article
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          'group relative flex cursor-pointer flex-col gap-3 rounded-lg border p-6 transition-all hover:border-primary',
          className
        )}
      >
        <div className='flex items-center gap-2 text-sm text-muted-foreground'>
          <time dateTime={entry.$createdAt}>
            {new Date(entry.$createdAt).toLocaleDateString()}
          </time>
          {entry.featured && (
            <span className='rounded-full bg-primary px-2 py-1 text-xs text-primary-foreground'>
              Featured
            </span>
          )}
        </div>
        <h3 className='text-xl font-semibold tracking-tight'>{entry.title}</h3>
        <p className='line-clamp-3 text-muted-foreground'>{entry.summary}</p>
        {entry.imageUrl && (
          <div className='relative mt-4 aspect-video overflow-hidden rounded-md'>
            {/* Insert your Next.js <Image> component here if desired */}
          </div>
        )}
      </motion.article>
    </Link>
  );
};
