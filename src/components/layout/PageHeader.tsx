'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import type { PageHeaderProps } from '@/types/layout';

const sizeVariants = {
  small: 'text-2xl md:text-3xl',
  default: 'text-3xl md:text-5xl',
  large: 'text-4xl md:text-6xl',
};

const alignmentVariants = {
  left: 'text-left',
  center: 'text-center',
};

export function PageHeader({
  title,
  description,
  pattern = 'dots',
  className,
  align = 'center',
  size = 'default',
}: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'relative overflow-hidden py-24 md:py-32',
        alignmentVariants[align],
        className
      )}
    >
      <div className='container relative z-10'>
        <div
          className={cn('mx-auto max-w-[58rem]', align === 'left' && 'ml-0')}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={cn('font-bold leading-tight', sizeVariants[size])}
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className='mt-4 text-lg text-muted-foreground sm:text-xl'
            >
              {description}
            </motion.p>
          )}
        </div>
      </div>
      {pattern && (
        <div
          className={cn('absolute inset-0 -z-10 opacity-20', {
            'bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]':
              pattern === 'dots',
            'bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] [background-size:32px_32px]':
              pattern === 'lines',
            'bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px)_0_0,linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)_0_0] [background-size:32px_32px]':
              pattern === 'squares',
          })}
          aria-hidden='true'
        />
      )}
    </motion.div>
  );
}
