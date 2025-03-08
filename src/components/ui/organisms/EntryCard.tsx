'use client';

import { CardImage } from '@/components/ui/atoms/CardImage';
import { EntryCardContent } from '@/components/ui/molecules/EntryCardContent';
import { cn } from '@/lib/utils';
import type { KnowledgeEntry } from '@/types/core/knowledge/entry';
import type { ResourceEntry } from '@/types/core/resources/entry';

import { motion, useMotionTemplate, useMotionValue } from 'motion/react';
import Link from 'next/link';

interface EntryCardProps {
  entry: KnowledgeEntry | ResourceEntry;
  className?: string;
}

export const EntryCard = ({ entry, className }: EntryCardProps) => {
  const { title, summary, imageUrl, slug, categorySlug } = entry;
  const type = 'imageUrl' in entry ? 'knowledge' : 'resources'; // Infer type

  // Only pass date for knowledge entries
  const date = type === 'knowledge' ? entry.$createdAt : undefined;
  
  // Motion values for the hover effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Transform the mouse position into a gradient position
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  // Define the gradient color based on entry type - matching CategoryCard colors
  const gradientColor = type === 'knowledge'
    ? 'rgba(59, 130, 246, 0.15)' // blue for knowledge entries (same as CategoryCard)
    : 'rgba(99, 102, 241, 0.15)'; // indigo for resource entries (same as CategoryCard)

  return (
    <Link
      href={`/${type}/${categorySlug}/${slug}`}
      aria-label={`View ${title} ${type === 'knowledge' ? 'entry' : 'resource'}`}
      className='group block h-full'
    >
      <motion.article
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onMouseMove={handleMouseMove}
        className={cn(
          'relative flex h-full flex-col overflow-hidden rounded-xl border border-white/5',
          'bg-gradient-to-br from-[#121620] via-[#0d111a] to-[#080c14]', // Darker blue/slate gradient
          'shadow-md transition-all duration-300',
          'hover:border-white/10 hover:shadow-lg',
          className
        )}
      >
        {/* Subtle border gradient effect that follows cursor */}
        <motion.div
          className='pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100'
          style={{
            background: useMotionTemplate`radial-gradient(200px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 80%)`,
          }}
        />
        
        {/* Subtle top edge highlight - similar to CategoryCard but less pronounced */}
        <div className='absolute inset-0 overflow-hidden rounded-xl'>
          <div className='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent' />
        </div>
        
        {imageUrl && (
          <CardImage imageUrl={imageUrl} alt={`Cover image for ${title}`} />
        )}
        <EntryCardContent
          date={date}
          title={title}
          summary={summary}
          type={type}
        />
      </motion.article>
    </Link>
  );
};
