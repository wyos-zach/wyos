'use client';
import Link from 'next/link';
import { motion } from 'motion/react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { KnowledgeCategory } from '@/types/core/knowledge';

interface KnowledgeCategoryCardProps {
  category: KnowledgeCategory;
  className?: string;
}

export const KnowledgeCategoryCard = ({
  category,
  className,
}: KnowledgeCategoryCardProps) => {
  return (
    <Link href={`/knowledge/${category.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          'group relative flex flex-col overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md',
          className
        )}
      >
        {category.imageUrl && (
          <div className='relative aspect-video'>
            <Image
              src={category.imageUrl}
              alt={category.name}
              fill
              className='object-cover'
              sizes='(max-width: 768px) 100vw, 33vw'
            />
          </div>
        )}

        <div className='flex flex-col p-6'>
          <time className='mb-2 text-sm text-muted-foreground'>
            {new Date(category.$createdAt).toLocaleDateString()}
          </time>
          <h3 className='text-xl font-semibold tracking-tight'>
            {category.name}
          </h3>
          {category.description && (
            <p className='mt-2 line-clamp-2 text-muted-foreground'>
              {category.description}
            </p>
          )}
        </div>
      </motion.div>
    </Link>
  );
};
