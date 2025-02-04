'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { KnowledgeCategory } from '@/types/core/knowledge/category';

export interface CategoryHeaderProps {
  category: KnowledgeCategory;
  totalEntries: number;
  className?: string;
}

export const CategoryHeader = ({
  category,
  totalEntries,
  className,
}: CategoryHeaderProps) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'relative overflow-hidden',
        'bg-gradient-to-b from-background to-background/95',
        className
      )}
    >
      <div
        className='bg-grid-white/[0.02] absolute inset-0'
        aria-hidden='true'
      />

      <div className='absolute inset-0'>
        <div className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
          <div
            className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-background opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>

      <div className='mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8'>
        <nav className='flex items-center space-x-4 text-sm'>
          <Link
            href='/knowledge'
            className='text-muted-foreground transition-colors hover:text-foreground'
          >
            Knowledge Hub
          </Link>
          <span className='text-muted-foreground/40'>/</span>
          <span className='font-medium text-foreground'>{category.name}</span>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className='mt-10 max-w-3xl'
        >
          <h1 className='text-4xl font-bold tracking-tight sm:text-6xl'>
            {category.name}
          </h1>

          {category.description && (
            <p className='mt-6 text-lg leading-8 text-muted-foreground'>
              {category.description}
            </p>
          )}

          <div className='mt-8'>
            <span className='inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20'>
              {totalEntries} curated entries
            </span>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};
