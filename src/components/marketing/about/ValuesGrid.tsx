'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import type { ValuesGridProps } from '@/types/marketing/about';

export function ValuesGrid({
  values,
  className,
  columns = 3,
}: ValuesGridProps) {
  return (
    <section className={cn('relative py-24 md:py-32', className)}>
      {/* Background Elements */}
      <div className='absolute inset-0 -z-10'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,58,138,0.15),transparent_50%)]' />
        <div className='absolute h-full w-full bg-[linear-gradient(to_right,#000103_1px,transparent_1px),linear-gradient(to_bottom,#000103_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]' />
      </div>

      <div className='container'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='mx-auto max-w-[64rem] space-y-4 text-center'
        >
          <h2
            className={cn(
              'text-4xl font-bold tracking-tight md:text-5xl',
              'bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent'
            )}
          >
            No Bullshit Values
          </h2>
          <p className='text-lg text-zinc-400 md:text-xl'>
            What we believe in. What we stand for. No fluff.
          </p>
        </motion.div>

        <div
          className={cn('mx-auto mt-20 grid gap-8', {
            'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3': columns === 3,
            'grid-cols-1 md:grid-cols-2': columns === 2,
          })}
        >
          {values.map((value) => (
            <motion.div
              key={`value-${value.title.toLowerCase().replace(/\s+/g, '-')}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={cn(
                'group relative rounded-lg border border-zinc-800/50',
                'bg-zinc-900/50 p-8 backdrop-blur-sm',
                'transition-all duration-300 hover:border-blue-900/50',
                'hover:bg-blue-950/10'
              )}
            >
              <div className='relative z-10 space-y-4'>
                {value.icon && (
                  <div className='inline-flex rounded-lg bg-blue-950/50 p-3'>
                    {value.icon}
                  </div>
                )}
                <div className='space-y-2'>
                  <h3 className='text-xl font-semibold tracking-tight text-white'>
                    {value.title}
                  </h3>
                  <div className='h-px w-12 bg-gradient-to-r from-blue-900/50 to-transparent' />
                </div>
                <p className='text-base text-zinc-400 transition-colors group-hover:text-zinc-300'>
                  {value.description}
                </p>
              </div>
              <div className='absolute inset-0 -z-10 rounded-lg bg-gradient-to-b from-transparent to-blue-950/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
