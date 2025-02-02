'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
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
          'group relative flex flex-col items-center gap-4 rounded-lg border p-6 transition-all hover:border-primary',
          className
        )}
      >
        {category.icon && (
          <img
            src={category.icon}
            alt={`${category.name} icon`}
            className='h-12 w-12'
          />
        )}
        <h3 className='text-xl font-semibold'>{category.name}</h3>
        {category.description && (
          <p className='text-center text-sm text-muted-foreground'>
            {category.description}
          </p>
        )}
      </motion.div>
    </Link>
  );
};
