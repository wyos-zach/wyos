'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShinyButton } from '@/components/ui/shiny-button';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

interface HeroProps {
  headline: string;
  subheadline: string;
  showCTA?: boolean;
}

export function Hero({ headline, subheadline, showCTA = true }: HeroProps) {
  return (
    <Container as='section' className='relative'>
      {/* Background Elements */}
      <div className='absolute inset-0 -z-10'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,58,138,0.15),transparent_50%)]' />
        <div className='absolute h-full w-full bg-[linear-gradient(to_right,#000103_1px,transparent_1px),linear-gradient(to_bottom,#000103_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]' />
      </div>

      <div className='relative space-y-6 pb-20 pt-24 md:pb-32 md:pt-36 lg:pb-40 lg:pt-48'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='mx-auto flex max-w-[64rem] flex-col items-center gap-8'
        >
          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className='relative'
          >
            <h1
              className={cn(
                'text-center text-4xl font-bold tracking-tight',
                'bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent',
                'sm:text-5xl md:text-6xl lg:text-7xl'
              )}
            >
              {headline}
            </h1>
            <div className='absolute -inset-x-2 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-blue-900/50 to-transparent blur-sm' />
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className='text-center text-lg text-zinc-400 sm:text-xl md:text-2xl'
          >
            {subheadline}
          </motion.p>

          {/* CTAs */}
          {showCTA && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className='flex flex-col gap-4 sm:flex-row'
            >
              <Link href='/register'>
                <ShinyButton className='h-12 min-w-[200px] text-lg font-medium'>
                  Get Started
                </ShinyButton>
              </Link>
              <Link href='/login'>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    'inline-flex h-12 items-center justify-center rounded-lg',
                    'border border-zinc-800 bg-background/50 px-8',
                    'text-lg font-medium text-zinc-300',
                    'backdrop-blur-sm transition-colors',
                    'hover:border-zinc-700 hover:bg-zinc-900/50 hover:text-white'
                  )}
                >
                  Sign In
                </motion.button>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Bottom Gradient */}
      <div className='absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent' />
    </Container>
  );
}
