'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { Container } from '@/components/ui/container';

export function NoBs() {
  const coreValues = ['Real Insights', 'Real Growth', 'No BS'];

  return (
    <section className='relative px-[5%] py-[120px]'>
      <Container className='mx-auto max-w-[1280px] px-5'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className='flex items-center gap-2 rounded-xl border border-white/10 bg-[#131316] p-2'
        >
          {coreValues.map((value, index) => (
            <React.Fragment key={value}>
              <div className='flex h-[112px] flex-1 items-center justify-center'>
                <h3 className='gradient-text font-heading text-[32px] font-normal tracking-wide'>
                  {value}
                </h3>
              </div>
              {index < coreValues.length - 1 && (
                <div className='h-[48px] w-px bg-[#363a3f]' />
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
