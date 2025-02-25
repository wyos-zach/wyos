'use client';

import { motion } from 'motion/react';
import { Container } from '@/components/ui/container';

export function MembershipIntro() {
  return (
    <section className='py-16 md:py-20'>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='mx-auto max-w-3xl'
        >
          <motion.p
            className='text-xl leading-relaxed text-zinc-200'
          >
            Let's be honest—there's no shortage of platforms asking for your
            credit card these days. Another subscription, another monthly
            payment, another promise that <em>this</em> is the thing that will
            finally help you level up. I get the skepticism. I really do. WYOS
            isn't free, and that's a deliberate choice. Not because I'm trying
            to build some cash-generating machine, but because I believe in
            creating something sustainable that actually helps people—without
            the bullshit that comes with "free" platforms.
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}