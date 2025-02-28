'use client';
import Link from 'next/link';
import { motion } from 'motion/react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { KnowledgeCategory } from '@/types/core/knowledge';

interface EnhancedKnowledgeCategoryCardProps {
  category: KnowledgeCategory;
  className?: string;
}

export const EnhancedKnowledgeCategoryCard = ({
  category,
  className,
}: EnhancedKnowledgeCategoryCardProps) => {
  return (
    <Link href={`/knowledge/${category.slug}`}>
      <div
        className={cn(
          'group relative h-full overflow-hidden rounded-xl',
          className
        )}
      >
        {/* Base card with dark background */}
        <div className='absolute inset-0 bg-[#131316]'></div>

        {/* Premium gradient border */}
        <div className='absolute inset-0 rounded-xl p-px'>
          <div className='absolute inset-0 rounded-xl bg-gradient-to-b from-white/20 via-primary/10 to-transparent'></div>
        </div>

        {/* Card content */}
        <div className='relative z-10 flex h-full flex-col'>
          {/* Image with premium overlay */}
          {category.imageUrl && (
            <div className='relative aspect-[16/9] w-full overflow-hidden'>
              <Image
                src={category.imageUrl}
                alt={category.name}
                fill
                className='object-cover transition-transform duration-700 ease-in-out group-hover:scale-110'
                sizes='(max-width: 768px) 100vw, 33vw'
              />

              {/* Premium gradient overlay */}
              <div className='absolute inset-0 bg-gradient-to-t from-[#131316] via-[rgba(19,19,22,0.7)] to-transparent'></div>

              {/* Hover effect overlay */}
              <div className='absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100'></div>
            </div>
          )}

          {/* Content area */}
          <div className='flex flex-1 flex-col p-6'>
            {/* Category name with gradient text */}
            <h3 className='bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-xl font-semibold tracking-tight text-transparent transition-colors duration-300 group-hover:from-primary group-hover:to-primary-foreground/90'>
              {category.name}
            </h3>

            {/* Description */}
            {category.description && (
              <p className='mt-3 line-clamp-3 text-zinc-400'>
                {category.description}
              </p>
            )}

            {/* Call to action */}
            <div className='mt-auto flex items-center pt-6'>
              <motion.span
                className='text-sm font-medium text-zinc-300 transition-colors duration-300 group-hover:text-primary'
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
              >
                Explore category
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='ml-1.5 inline-block h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M13 7l5 5m0 0l-5 5m5-5H6'
                  />
                </svg>
              </motion.span>
            </div>
          </div>

          {/* Subtle inner glow effect on hover */}
          <div
            className='absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100'
            style={{
              background:
                'radial-gradient(circle at center, rgba(255,255,255,0.08) 0%, transparent 70%)',
              boxShadow: 'inset 0 0 30px rgba(255,255,255,0.05)',
            }}
          ></div>
        </div>

        {/* Card shine effect on hover */}
        <div className='absolute inset-0 -left-40 -top-40 h-[200%] w-[200%] translate-x-full translate-y-full rotate-45 bg-white opacity-0 transition-all duration-1000 ease-out group-hover:translate-x-[-50%] group-hover:translate-y-[-50%] group-hover:opacity-5'></div>
      </div>
    </Link>
  );
};
