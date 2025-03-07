'use client';

import { CardImage } from '@/components/ui/atoms/CardImage';
import { CardContent } from '@/components/ui/molecules/CardContent';
import { cn } from '@/lib/utils';
import type { KnowledgeCategory } from '@/types/core/knowledge/category';
import type { ResourceCategory } from '@/types/core/resources/category';
import { motion } from 'motion/react';
import Link from 'next/link';

interface CategoryCardProps {
  category: KnowledgeCategory | ResourceCategory;
  className?: string;
}

export const CategoryCard = ({ category, className }: CategoryCardProps) => {
  const { name, description, imageUrl, slug } = category;

  // Determine if it's a knowledge or resource category based on structure
  const isResourceCategory = 'type' in category;
  const categoryType = isResourceCategory ? 'resources' : 'knowledge';

  return (
    <Link href={`/${categoryType}/${slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
        className={cn(
          'group relative overflow-hidden rounded-xl border border-white/5 bg-gradient-to-b from-[#000000] to-[#111010] shadow-[0_1px_3px_rgba(0,0,0,0.1)] backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)]',
          className
        )}
      >
        {imageUrl && <CardImage imageUrl={imageUrl} alt={name} />}
        <CardContent
          title={name}
          description={description}
          type={categoryType as 'knowledge' | 'resources'}
        />
        <motion.div
          className='absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100'
          style={{
            background:
              'radial-gradient(circle at top right, rgba(59,130,246,0.07), transparent 70%)',
            boxShadow: 'inset 0 0 15px rgba(59,130,246,0.0.5)',
          }}
        />
      </motion.div>
    </Link>
  );
};
