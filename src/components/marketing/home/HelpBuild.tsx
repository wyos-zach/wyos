'use client';

import { motion } from 'motion/react';
import { Container } from '@/components/ui/container';

export function HelpBuild() {
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
            <span className='block text-white'>Help Us Build</span>
            <span className='gradient-text -mt-1 block'>A Better Future</span>
          </h2>
          <p className='mx-auto mt-8 max-w-2xl text-[18px] leading-relaxed text-[#A1A1AA]'>
            WYOS isn't about pretending we have all the answers. We hand-pick
            the best info, tools, and advice so you don't waste time, money, or
            energy on BS.
          </p>
        </motion.div>

        <div className='mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='relative rounded-2xl border border-zinc-800/20 bg-zinc-900/30 p-12 backdrop-blur-sm'
          >
            <h3 className='mb-6 text-[28px] font-normal tracking-wide text-white'>
              Save Time
            </h3>
            <p className='text-[18px] leading-relaxed text-[#A1A1AA]'>
              Stop digging for what works. We bring you only the vetted guides
              and tools that deliver real results.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='relative rounded-2xl border border-zinc-800/20 bg-zinc-900/30 p-12 backdrop-blur-sm'
          >
            <h3 className='mb-6 text-[28px] font-normal tracking-wide text-white'>
              Save Money
            </h3>
            <p className='text-[18px] leading-relaxed text-[#A1A1AA]'>
              Avoid scams and overpriced fluff. We spotlight what truly delivers
              value for your investment.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='relative rounded-2xl border border-zinc-800/20 bg-zinc-900/30 p-12 backdrop-blur-sm'
          >
            <h3 className='mb-6 text-[28px] font-normal tracking-wide text-white'>
              Save Effort
            </h3>
            <p className='text-[18px] leading-relaxed text-[#A1A1AA]'>
              Focus on what matters. We cut through the clutter so you can take
              action with confidence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className='relative rounded-2xl border border-zinc-800/20 bg-zinc-900/30 p-12 backdrop-blur-sm'
          >
            <h3 className='mb-6 text-[28px] font-normal tracking-wide text-white'>
              Build Together
            </h3>
            <p className='text-[18px] leading-relaxed text-[#A1A1AA]'>
              This isn't a one-way street. Your input shapes WYOS and helps
              everyone level up together.
            </p>
          </motion.div>
        </div>

        <motion.p
          className='mx-auto mt-24 max-w-2xl text-center text-[18px] leading-relaxed text-[#A1A1AA]'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          We're not promising perfection—just genuine, no-BS value built by real
          people who've been there. Ready to jump in?
        </motion.p>
      </Container>
    </section>
  );
}
