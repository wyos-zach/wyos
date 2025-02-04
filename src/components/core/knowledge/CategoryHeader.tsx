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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'relative border-b border-border/40',
        'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        className
      )}
    >
      <div className='container relative py-12'>
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          aria-label='Breadcrumb'
          className='mb-8'
        >
          <ol className='flex items-center space-x-2 text-sm text-muted-foreground'>
            <li>
              <Link
                href='/knowledge'
                className='transition-colors hover:text-foreground'
              >
                Knowledge Hub
              </Link>
            </li>
            <li aria-hidden='true'>/</li>
            <li className='font-medium text-foreground' aria-current='page'>
              {category.name}
            </li>
          </ol>
        </motion.nav>

        {/* Content */}
        <div className='max-w-2xl'>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className='text-4xl font-bold tracking-tight md:text-5xl'
          >
            {category.name}
          </motion.h1>

          {category.description && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className='mt-4 text-lg text-muted-foreground'
            >
              {category.description}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className='mt-6'
          >
            <span className='inline-flex items-center rounded-md bg-primary/10 px-4 py-2 text-sm font-medium text-primary'>
              {totalEntries} curated entries
            </span>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};
