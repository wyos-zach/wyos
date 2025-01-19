'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeInVariants } from '@/types/animations';
import type { OurStoryProps } from '@/types/about';

export function OurStory({ story, className }: OurStoryProps) {
  return (
    <motion.section
      initial='hidden'
      animate='visible'
      variants={fadeInVariants}
      className={cn(
        'relative overflow-hidden py-12 md:py-16 lg:py-20',
        className
      )}
    >
      <div className='container relative z-10'>
        <div className='mx-auto max-w-[58rem]'>
          <h2 className='text-3xl font-bold leading-tight sm:text-4xl md:text-5xl'>
            {story.title}
          </h2>
          <div className='mt-6 space-y-6 text-lg text-muted-foreground'>
            <p className='leading-relaxed'>{story.content}</p>
          </div>
          <div className='mt-8 flex items-center gap-4'>
            {story.author.image && (
              <img
                src={story.author.image}
                alt={story.author.name}
                className='h-12 w-12 rounded-full object-cover'
              />
            )}
            <div>
              <div className='font-semibold'>{story.author.name}</div>
              <div className='text-sm text-muted-foreground'>
                {story.author.role}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
