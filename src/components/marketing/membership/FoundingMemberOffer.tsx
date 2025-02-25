'use client';

import { motion } from 'motion/react';
import { Container } from '@/components/ui/container';
import Link from 'next/link';
import { HoverButton } from '@/components/ui/hover-button';

export function FoundingMemberOffer() {
  const foundingBenefits = [
    'Lock in this price forever—it will never be this low again',
    'Help shape the future of WYOS—founding members get direct input into platform development',
    'Exclusive founding member badge',
  ];

  return (
    <section className='section-container bg-gradient-bridge'>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='mx-auto max-w-4xl'
        >
          <div className='rounded-2xl border border-white/10 bg-secondary p-8 shadow-xl'>
            <h2 className='text-center font-heading text-3xl font-bold md:text-4xl'>
              Founding Member Opportunity
            </h2>
            <p className='mt-4 text-center text-lg text-zinc-400'>
              For the first 50 members only:
            </p>

            <div className='mt-8 flex flex-col items-center justify-center gap-8 md:flex-row'>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className='flex-1 rounded-xl border border-white/10 bg-card p-6 text-center'
              >
                <h3 className='font-heading text-2xl font-bold'>Monthly</h3>
                <p className='mt-2 text-zinc-400'>Flexible option</p>
                <div className='mt-4'>
                  <span className='font-heading text-4xl font-bold'>$25</span>
                  <span className='text-zinc-400'>/month</span>
                </div>
                <Link href='/register' className='mt-6 block'>
                  <HoverButton className='w-full'>Choose Monthly</HoverButton>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className='relative flex-1 rounded-xl border border-primary bg-card p-6 text-center'
              >
                <div className='absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground'>
                  BEST VALUE
                </div>
                <h3 className='font-heading text-2xl font-bold'>Annual</h3>
                <p className='mt-2 text-zinc-400'>Save $120</p>
                <div className='mt-4'>
                  <span className='font-heading text-4xl font-bold'>$180</span>
                  <span className='text-zinc-400'>/year</span>
                </div>
                <Link href='/register' className='mt-6 block'>
                  <HoverButton className='w-full'>Choose Annual</HoverButton>
                </Link>
              </motion.div>
            </div>

            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className='mt-8 space-y-3 text-zinc-400'
            >
              {foundingBenefits.map((benefit, index) => (
                <li key={index} className='flex items-start'>
                  <span className='mr-3 mt-1 text-primary'>•</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </motion.ul>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className='mt-6 text-zinc-400'
            >
              After the first 50 spots are filled, the price increases to
              $35/month or $300/year for the next 50 members.
            </motion.p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
