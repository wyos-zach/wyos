'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeInVariants } from '@/types/animations';
import type { MissionSectionProps } from '@/types/about';

export function MissionSection({ mission, className }: MissionSectionProps) {
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
          <div className='space-y-8'>
            <div className='space-y-4'>
              <h2 className='text-3xl font-bold leading-tight sm:text-4xl md:text-5xl'>
                Our Mission
              </h2>
              <p className='text-lg text-muted-foreground'>
                {mission.statement}
              </p>
            </div>

            <div className='space-y-4'>
              <h3 className='text-2xl font-bold leading-tight sm:text-3xl'>
                Our Vision
              </h3>
              <p className='text-lg text-muted-foreground'>{mission.vision}</p>
            </div>

            <div className='mt-8 rounded-lg bg-secondary/50 p-6'>
              <p className='text-lg italic'>{mission.description}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
