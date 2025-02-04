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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn(
        'relative min-h-[320px] border-b border-border/10',
        'bg-gradient-to-br from-blue-950 via-indigo-950 to-slate-950',
        'after:bg-grid-white/[0.02] after:absolute after:inset-0',
        className
      )}
    >
      <div className='container relative z-10 py-16'>
        <nav className='mb-8'>
          <ol className='flex items-center space-x-2 text-sm text-blue-300/80'>
            <li>
              <Link
                href='/knowledge'
                className='transition-colors hover:text-blue-200'
              >
                Knowledge Hub
              </Link>
            </li>
            <li className='text-blue-400/50'>/</li>
            <li className='font-medium text-blue-200'>{category.name}</li>
          </ol>
        </nav>

        <div className='relative max-w-3xl'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className='bg-gradient-to-br from-blue-200 to-blue-400 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-6xl'>
              {category.name}
            </h1>
            {category.description && (
              <p className='mt-6 text-lg leading-relaxed text-blue-200/90'>
                {category.description}
              </p>
            )}
            <div className='mt-8 flex items-center gap-4'>
              <span className='inline-flex items-center rounded-full bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300 ring-1 ring-blue-500/20'>
                {totalEntries} curated entries
              </span>
            </div>
          </motion.div>

          <div className='absolute -right-64 top-0 h-48 w-[500px] bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-purple-500/20 blur-3xl' />
        </div>
      </div>
    </motion.header>
  );
};
