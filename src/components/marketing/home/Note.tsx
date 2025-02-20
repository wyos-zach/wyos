'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { Container } from '@/components/ui/container';

export function Note() {
  return (
    <section className='relative py-[120px] px-[5%]'>
      <Container className='relative z-[9] mx-auto w-full max-w-[1072px]'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='relative flex flex-col items-center justify-start overflow-hidden rounded-[32px] bg-[#0A0A0B] text-center'
        >
          {/* Content wrapper */}
          <div className='relative flex w-full flex-col items-center justify-center overflow-hidden rounded-[32px] px-24 pb-20 pt-24'>
            {/* Inner content */}
            <div className='flex w-full max-w-[1000px] flex-col items-center justify-start'>
              {/* Title */}
              <div className='mb-8 w-full max-w-[600px]'>
                <h3 className='text-[30px] font-[500] tracking-[-0.02em] text-white'>
                  From the Founder
                </h3>
              </div>

              {/* Text content */}
              <div className='max-w-[800px] text-[18px] leading-[1.8] tracking-[-0.02em] text-[#9ca0ab]'>
                <p className='mb-8'>
                  I was tired of wasting time on generic advice, fake gurus, and
                  endless fluff. I wanted a space where people could find real tools,
                  real insights, and real community—without the BS. That's why I
                  created WYOS.
                </p>
                <p className='mb-8'>
                  WYOS isn't perfect—and it's not supposed to be. It's a work in
                  progress, built by people like you who want to grow, share, and make
                  something better together.
                </p>
                <p>
                  If you're ready to stop wasting time and start building something
                  real—with us—I'd love for you to join.
                </p>
              </div>

              {/* Image and signature */}
              <div className='mt-6 flex items-center'>
                <div className='flex h-[48px] w-[48px] items-center justify-center rounded-[99px] bg-[#141415]'>
                  <Image
                    src='/images/placeholder.png'
                    alt='Founder'
                    width={48}
                    height={48}
                    className='h-full w-full rounded-full object-cover'
                  />
                </div>
                <div className='flex flex-col items-center py-6 px-6'>
                  <span className='text-[12px] tracking-[-0.08em] text-[#9ca0ab]'>
                    Zach
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Linear border */}
          <div className='pointer-events-none absolute inset-0 rounded-[36px] p-px [background:linear-gradient(180deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_80%)] [mask:linear-gradient(#060609,#060609)_content-box,linear-gradient(#060609,#060609)] [mask-composite:xor]' />
        </motion.div>
      </Container>
    </section>
  );
}
