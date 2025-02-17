'use client';

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import type { PageHeaderProps } from '@/types/shared/layout';

const sizeVariants = {
  small: 'text-2xl md:text-3xl lg:text-4xl',
  default: 'text-3xl md:text-5xl lg:text-6xl',
  large: 'text-4xl md:text-6xl lg:text-7xl',
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
      {/* Background Elements */}
      <div className='absolute inset-0 -z-10'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,58,138,0.15),transparent_50%)]' />
        {pattern && (
          <div
            className={cn('absolute inset-0 opacity-[0.05]', {
              'bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]':
                pattern === 'dots',
              'bg-[linear-gradient(to_right,#1e3a8a_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a_1px,transparent_1px)] [background-size:32px_32px]':
                pattern === 'lines',
              'bg-[linear-gradient(to_right,#1e3a8a_1px,transparent_1px)_0_0,linear-gradient(to_bottom,#1e3a8a_1px,transparent_1px)_0_0] [background-size:32px_32px]':
                pattern === 'squares',
            })}
            aria-hidden='true'
          />
        )}
      </div>

      <div className='container relative'>
        <div
          className={cn(
            'mx-auto max-w-[64rem] space-y-6',
            align === 'left' && 'ml-0'
          )}
        >
          <div className='relative'>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={cn(
                'font-bold tracking-tight',
                'bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent',
                sizeVariants[size]
              )}
            >
              {title}
            </motion.h1>
            <div className='absolute -inset-x-2 top-2/3 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-blue-900/50 to-transparent blur-sm' />
          </div>

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className='text-lg text-zinc-400 md:text-xl lg:text-2xl'
            >
              {description}
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
