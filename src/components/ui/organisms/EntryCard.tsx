'use client';

import { CardImage } from '@/components/ui/atoms/CardImage';
import { CardContent } from '@/components/ui/molecules/CardContent';
import { cn } from '@/lib/utils';
import type { KnowledgeEntry } from '@/types/core/knowledge/entry';
import type { ResourceEntry } from '@/types/core/resources/entry';

import { motion } from 'motion/react';
import Link from 'next/link';

interface EntryCardProps {
  entry: KnowledgeEntry | ResourceEntry;
  className?: string;
}

export const EntryCard = ({ entry, className }: EntryCardProps) => {
  const { title, summary, imageUrl, slug, categorySlug, $createdAt } = entry;
  const type = 'imageUrl' in entry ? 'knowledge' : 'resources'; // Infer type

  return (
    <Link
      href={`/${type}/${categorySlug}/${slug}`}
      aria-label={`View ${title} ${type === 'knowledge' ? 'entry' : 'resource'}`}
      className='group block'
    >
      <motion.article
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
        className={cn(
          'relative flex h-full flex-col overflow-hidden rounded-xl border border-white/5 bg-gradient-to-b from-[#131316] to-[#1c1e22] backdrop-blur-md transition-shadow duration-300 hover:border-white/10 hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)]',
          className
        )}
      >
        {imageUrl && (
          <CardImage imageUrl={imageUrl} alt={`Cover image for ${title}`} />
        )}
        <CardContent
          date={$createdAt}
          title={title}
          summary={summary}
          type={type}
        />
      </motion.article>
    </Link>
  );
};
