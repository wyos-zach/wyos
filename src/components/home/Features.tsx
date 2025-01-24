'use client';

import { Container } from '@/components/ui/container';
import { motion } from 'framer-motion';
import { type Feature } from '@/types/home';
import { cn } from '@/lib/utils';

interface FeaturesProps {
  features: Feature[];
  className?: string;
}

export function Features({ features }: FeaturesProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Container as='section' className='relative py-24 md:py-32'>
      {/* Background Elements */}
      <div className='absolute inset-0 -z-10'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,58,138,0.1),transparent_50%)]' />
      </div>

      <motion.div
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-100px' }}
        className='mx-auto max-w-[64rem] text-center'
      >
        <motion.h2
          variants={itemVariants}
          className={cn(
            'text-3xl font-bold tracking-tight',
            'bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent',
            'sm:text-4xl md:text-5xl'
          )}
        >
          Everything you need to write your story
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className='mt-4 text-lg text-zinc-400 sm:text-xl'
        >
          Real tools. No bullshit. Just what works.
        </motion.p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-100px' }}
        className='mx-auto mt-20 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3'
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={cn(
              'group relative rounded-lg border border-zinc-800/50',
              'bg-zinc-900/50 p-6 backdrop-blur-sm',
              'transition-all duration-300 hover:border-blue-900/50',
              'hover:bg-blue-950/10'
            )}
          >
            <div className='relative z-10 flex flex-col items-start text-left'>
              <div className='mb-4 rounded-lg bg-blue-950/50 p-3'>
                {feature.icon}
              </div>
              <h3 className='mb-2 font-semibold tracking-tight'>
                {feature.title}
              </h3>
              <p className='text-sm text-zinc-400 transition-colors group-hover:text-zinc-300'>
                {feature.description}
              </p>
            </div>
            <div className='absolute inset-0 -z-10 rounded-lg bg-gradient-to-b from-transparent to-blue-950/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom Gradient */}
      <div className='absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent' />
    </Container>
  );
}
