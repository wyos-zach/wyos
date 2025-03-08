'use client';

import { CardImage } from '@/components/ui/atoms/CardImage';
import { CategoryCardContent } from '@/components/ui/molecules/CategoryCardContent';
import { cn } from '@/lib/utils';
import type { KnowledgeCategory } from '@/types/core/knowledge/category';
import type { ResourceCategory } from '@/types/core/resources/category';
import { motion, useMotionTemplate, useMotionValue } from 'motion/react';
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

  // Motion values for the hover effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Transform the mouse position into a gradient position
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  // Define the gradient color based on category type
  const gradientColor = isResourceCategory
    ? 'rgba(99, 102, 241, 0.15)' // indigo for resources
    : 'rgba(59, 130, 246, 0.15)'; // blue for knowledge

  return (
    <Link href={`/${categoryType}/${slug}`} className='block h-full'>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onMouseMove={handleMouseMove}
        className={cn(
          'group relative h-full overflow-hidden rounded-xl border border-white/5',
          'bg-gradient-to-b from-[#121212] to-[#0a0a0a]',
          'shadow-md transition-all duration-300',
          'hover:border-white/10 hover:shadow-lg',
          className
        )}
      >
        {/* Subtle border gradient effect that follows cursor */}
        <motion.div
          className='pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100'
          style={{
            background: useMotionTemplate`radial-gradient(250px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 80%)`,
          }}
        />

        {/* Content */}
        <div className='relative z-10 flex h-full flex-col'>
          {imageUrl && <CardImage imageUrl={imageUrl} alt={name} />}
          <CategoryCardContent title={name} description={description} />
        </div>

        {/* Subtle top edge highlight */}
        <div className='absolute inset-0 overflow-hidden rounded-xl'>
          <div className='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent' />
        </div>
      </motion.div>
    </Link>
  );
};
