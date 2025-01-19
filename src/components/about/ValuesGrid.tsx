'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { staggerChildrenVariants, fadeInVariants } from '@/types/animations';
import type { ValuesGridProps } from '@/types/about';

export function ValuesGrid({
  values,
  className,
  columns = 3,
}: ValuesGridProps) {
  return (
    <motion.section
      initial='hidden'
      animate='visible'
      variants={staggerChildrenVariants}
      className={cn('relative py-12 md:py-16 lg:py-20', className)}
    >
      <div className='container'>
        <div className='mx-auto max-w-[58rem] text-center'>
          <h2 className='text-3xl font-bold leading-tight sm:text-4xl md:text-5xl'>
            Our Values
          </h2>
          <p className='mt-4 text-lg text-muted-foreground'>
            The principles that guide everything we do
          </p>
        </div>

        <div
          className={cn('mx-auto mt-16 grid gap-8', {
            'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3': columns === 3,
            'grid-cols-1 md:grid-cols-2': columns === 2,
          })}
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={fadeInVariants}
              className='flex flex-col items-center rounded-lg bg-card p-6 text-center'
            >
              {value.icon && (
                <div className='mb-4 rounded-lg bg-secondary p-3'>
                  {value.icon}
                </div>
              )}
              <h3 className='mb-2 text-xl font-semibold'>{value.title}</h3>
              <p className='text-muted-foreground'>{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
