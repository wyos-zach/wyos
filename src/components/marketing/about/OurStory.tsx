'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import type { OurStoryProps } from '@/types/marketing/about';
import Image from 'next/image';

export function OurStory({ story, className }: OurStoryProps) {
  return (
    <section className={cn('relative py-24 md:py-32', className)}>
      <div className='absolute inset-0 bg-[linear-gradient(to_right,#000103_1px,transparent_1px),linear-gradient(to_bottom,#000103_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]' />

      <div className='container relative'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='mx-auto max-w-[64rem] space-y-8'
        >
          <div className='relative space-y-4'>
            <h2
              className={cn(
                'text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl',
                'gradient-text'
              )}
            >
              {story.title}
            </h2>
            <div className='h-px w-full bg-gradient-to-r from-blue-900/50 via-blue-800/50 to-transparent' />
          </div>

          <div className='space-y-6 text-lg text-zinc-400 md:text-xl'>
            {story.content.split('\n\n').map((paragraph, _index) => (
              <p
                key={`paragraph-${paragraph.slice(0, 20).toLowerCase().replace(/\s+/g, '-')}`}
                className='leading-relaxed'
              >
                {paragraph}
              </p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className='relative mt-12 flex items-center gap-6'
          >
            {story.author.image && (
              <div className='relative'>
                <Image
                  src={story.author.image}
                  alt={story.author.name}
                  className='h-16 w-16 rounded-lg object-cover grayscale'
                />
                <div className='absolute -inset-px rounded-lg bg-blue-500/20 blur-sm' />
              </div>
            )}
            <div>
              <div className='font-mono text-sm text-zinc-500'>Written by</div>
              <div className='font-semibold tracking-tight text-white'>
                {story.author.name}
              </div>
              <div className='text-sm text-zinc-500'>{story.author.role}</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
