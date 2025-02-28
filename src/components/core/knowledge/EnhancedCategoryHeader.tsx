'use client';
import { motion } from 'motion/react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { KnowledgeCategory } from '@/types/core/knowledge';

interface EnhancedCategoryHeaderProps {
  category: KnowledgeCategory;
  totalEntries: number;
  className?: string;
}

export function EnhancedCategoryHeader({
  category,
  totalEntries,
  className,
}: EnhancedCategoryHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'relative overflow-hidden rounded-xl border bg-card p-8 shadow-sm',
        className
      )}
    >
      {/* Background gradient */}
      <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent' />

      {/* Background pattern */}
      <div className='absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] opacity-[0.05] [background-size:16px_16px]' />

      <div className='relative z-10 flex flex-col items-center justify-between gap-6 md:flex-row'>
        <div className='flex flex-1 items-center gap-6'>
          {category.imageUrl && (
            <div className='relative hidden h-24 w-24 overflow-hidden rounded-xl border shadow-sm md:block'>
              <Image
                src={category.imageUrl}
                alt={category.name}
                fill
                className='object-cover'
              />
            </div>
          )}

          <div className='flex flex-col items-center text-center md:items-start md:text-left'>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className='text-3xl font-bold tracking-tight md:text-4xl'
            >
              {category.name}
            </motion.h1>
            {category.description && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className='mt-2 max-w-2xl text-muted-foreground'
              >
                {category.description}
              </motion.p>
            )}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className='flex flex-col items-center rounded-lg border bg-background p-4 shadow-sm'
        >
          <span className='text-3xl font-bold text-primary'>
            {totalEntries}
          </span>
          <span className='text-sm text-muted-foreground'>
            {totalEntries === 1 ? 'Entry' : 'Entries'}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
