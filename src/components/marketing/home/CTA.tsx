'use client';

import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { ShinyButton } from '@/components/ui/shiny-button';
import { motion } from 'motion/react';

interface CTAProps {
  headline: string;
  buttonText: string;
  subtext?: string;
}

export function CTA({ headline, buttonText, subtext }: CTAProps) {
  return (
    <div className='relative py-24 md:py-32'>
      {/* Angled gradient background that creates a dynamic transition */}
      <div className='absolute inset-0 overflow-hidden'>
        <div
          className='absolute inset-0 bg-gradient-to-br from-blue-900/20 via-background to-background'
          style={{ transform: 'skewY(-6deg)', transformOrigin: 'top left' }}
        />
      </div>

      {/* Floating orbs effect */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-blue-900/20 blur-3xl' />
        <div className='absolute -right-20 top-1/2 h-72 w-72 rounded-full bg-blue-800/10 blur-3xl' />
      </div>

      <Container className='relative'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='mx-auto max-w-3xl text-center'
        >
          <h2 className='font-heading text-[40px] tracking-wide'>
            <span className='gradient-text block font-semibold'>
              {headline}
            </span>
          </h2>

          {subtext && (
            <p className='mx-auto mt-4 text-lg leading-relaxed text-[#A1A1AA]'>
              {subtext}
            </p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='mt-16'
          >
            <Link href='/register'>
              <ShinyButton className='text-lg font-medium'>
                {buttonText}
              </ShinyButton>
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
}
