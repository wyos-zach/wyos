'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Spotlight } from '@/components/ui/spotlight-new';
import { HoverButton } from '@/components/ui/hover-button';
import { HeroScrollAnimation } from './HeroScrollAnimation';

export function Hero() {
  return (
    // Increase the overall height to ensure enough scroll space
    <section className='relative h-[350vh]'>
      {/* Spotlight Background */}
      <Spotlight
        gradientFirst='radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210, 100%, 85%, .04) 0, hsla(210, 100%, 55%, .01) 50%, hsla(210, 100%, 45%, 0) 80%)'
        gradientSecond='radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .03) 0, hsla(210, 100%, 55%, .01) 80%, transparent 100%)'
        gradientThird='radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .02) 0, hsla(210, 100%, 45%, .01) 80%, transparent 100%)'
        translateY={-450}
        xOffset={80}
      />

      {/* Hero Content fills the first viewport (100vh) */}
      <div className='relative z-10 flex h-screen items-center justify-center'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='container relative mx-auto flex max-w-4xl flex-col items-center justify-center text-center'
        >
          {/* Main Heading */}
          <motion.h1
            className='font-heading text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Stop Waiting for Change.
          </motion.h1>

          {/* Subheading */}
          <motion.h2
            className='mt-4 font-heading text-4xl font-semibold text-muted-foreground md:text-4xl lg:text-5xl'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Start Writing Your Own Story
          </motion.h2>

          {/* Description */}
          <motion.p
            className='mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Discover the resources, knowledge, and community to help you move
            from where you are to where you want to be—on your terms.
          </motion.p>

          {/* Call-to-Action Buttons */}
          <motion.div
            className='mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link href='/register'>
              <HoverButton>Find Out How</HoverButton>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Position the scroll animation frame relative to the hero section */}
      <div className='absolute left-0 right-0 top-[65vh] z-[5]'>
        <HeroScrollAnimation />
      </div>
    </section>
  );
}
