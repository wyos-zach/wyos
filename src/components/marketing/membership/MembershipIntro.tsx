'use client';

import { motion } from 'motion/react';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';

export function MembershipIntro() {
  return (
    <Section
      className='relative -mt-16 z-10'
      spacing='lg'
      container={false}
    >
      <div className='absolute inset-0 opacity-5'>
        <div className='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-500 to-transparent'></div>
        <div 
          className='h-full w-full bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:2.5rem_2.5rem]'
          style={{ opacity: 0.3 }}
        />
      </div>

      <Container>
        <div className='flex flex-col items-center justify-center pb-16'>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='mx-auto max-w-3xl relative px-4 md:px-8 py-10'
          >
            {/* Subtle border gradient */}
            <div className='absolute inset-0 rounded-2xl bg-gradient-to-b from-zinc-800/30 to-zinc-800/5 p-px'>
              <div className='absolute inset-0 rounded-2xl backdrop-blur-3xl'></div>
            </div>
            
            <div className='relative z-10 px-4 py-6'>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className='text-xl leading-relaxed text-zinc-200 tracking-normal'
              >
                Let's be honest—there's no shortage of platforms asking for your
                credit card these days. Another subscription, another monthly
                payment, another promise that <em>this</em> is the thing that will
                finally help you level up. I get the skepticism. I really do. 
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className='mt-4 text-xl leading-relaxed text-zinc-200 tracking-normal'
              >
                WYOS isn't free, and that's a deliberate choice. Not because I'm trying
                to build some cash-generating machine, but because I believe in
                creating something sustainable that actually helps people—without
                the bullshit that comes with "free" platforms.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}