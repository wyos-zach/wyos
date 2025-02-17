'use client';

import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { ShinyButton } from '@/components/ui/shiny-button';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface CTAProps {
  headline: string;
  buttonText: string;
  subtext?: string;
}

export function CTA({ headline, buttonText, subtext }: CTAProps) {
  return (
    <Container as='section' className='relative py-24 md:py-32'>
      <div className='absolute inset-0'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,58,138,0.15),transparent_50%)]' />
        <div className='absolute h-full w-full bg-[linear-gradient(to_right,#000103_1px,transparent_1px),linear-gradient(to_bottom,#000103_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]' />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className='relative mx-auto flex max-w-[64rem] flex-col items-center gap-8 text-center'
      >
        <h2
          className={cn(
            'text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl',
            'bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent'
          )}
        >
          {headline}
        </h2>

        {subtext && (
          <p className='max-w-2xl text-lg text-zinc-400 md:text-xl'>
            {subtext}
          </p>
        )}

        <Link href='/register'>
          <ShinyButton className='text-lg font-medium'>
            {buttonText}
          </ShinyButton>
        </Link>
      </motion.div>
    </Container>
  );
}
