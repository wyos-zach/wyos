'use client';

import { motion } from 'motion/react';
import { X, Check } from 'lucide-react';
import { Container } from '@/components/ui/container';

export function InternetVsWyos() {
  return (
    <section className='relative pb-[180px] pt-[60px]'>
      {/* Subtle background gradient that blends with sections */}
      <div className='absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[rgba(2,4,105,0.03)] to-transparent' />

      <Container className='mx-auto max-w-[1280px] px-5'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='mb-24 text-center'
        >
          <h2 className='font-heading text-[40px] font-normal tracking-wide'>
            <span className='block text-white'>The Internet's a Mess.</span>
            <span className='gradient-text -mt-1 block'>
              We're Trying to Fix It.
            </span>
          </h2>
          <p className='mx-auto mt-8 max-w-2xl text-[18px] leading-relaxed text-[#A1A1AA]'>
            The internet has everything you need, but it's buried under all the
            scams, noise, and bullshit. We want to change that.
          </p>
        </motion.div>

        <div className='mx-auto flex max-w-5xl items-stretch justify-center gap-20'>
          {/* The Internet Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='relative flex-1 rounded-2xl border border-zinc-800/20 bg-zinc-900/30 p-12 backdrop-blur-sm'
          >
            <h3 className='mb-10 font-heading text-[28px] font-normal tracking-wide text-white'>
              Internet
            </h3>
            <ul className='space-y-6 text-[18px]'>
              <li className='flex items-center gap-4'>
                <X className='h-5 w-5 text-red-500' />
                <span className='text-[#A1A1AA]'>
                  Generic, regurgitated content
                </span>
              </li>
              <li className='flex items-center gap-4'>
                <X className='h-5 w-5 text-red-500' />
                <span className='text-[#A1A1AA]'>
                  Scams and get-rich-quick schemes
                </span>
              </li>
              <li className='flex items-center gap-4'>
                <X className='h-5 w-5 text-red-500' />
                <span className='text-[#A1A1AA]'>
                  Fake gurus and influencers
                </span>
              </li>
            </ul>
          </motion.div>

          {/* Center Divider */}
          <div className='comparison-divider self-stretch' />

          {/* WYOS Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='relative flex-1 rounded-2xl border border-zinc-800/20 bg-zinc-900/30 p-12 backdrop-blur-sm'
          >
            <h3 className='mb-10 font-heading text-[28px] font-normal tracking-wide text-white'>
              WYOS
            </h3>
            <ul className='space-y-6 text-[18px]'>
              <li className='flex items-center gap-4'>
                <Check className='h-5 w-5 text-emerald-500' />
                <span className='text-[#A1A1AA]'>Information that matters</span>
              </li>
              <li className='flex items-center gap-4'>
                <Check className='h-5 w-5 text-emerald-500' />
                <span className='text-[#A1A1AA]'>Tools that work</span>
              </li>
              <li className='flex items-center gap-4'>
                <Check className='h-5 w-5 text-emerald-500' />
                <span className='text-[#A1A1AA]'>
                  People who've been through it
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.p
          className='mx-auto mt-24 max-w-2xl text-center text-[18px] leading-relaxed text-[#A1A1AA]'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          And now AI is making it even worse. That's why we're building WYOS -
          to help you cut through the noise and find what actually works.
        </motion.p>
      </Container>
    </section>
  );
}
