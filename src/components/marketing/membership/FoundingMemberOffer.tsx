'use client';

import { motion } from 'motion/react';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import Link from 'next/link';
import { ShinyButton } from '@/components/ui/shiny-button';

export function FoundingMemberOffer() {
  const foundingBenefits = [
    'Lock in this price forever—it will never be this low again',
    'Help shape the future of WYOS—founding members get direct input into platform development',
    'Exclusive founding member badge',
  ];

  return (
    <Section
      className='relative overflow-hidden'
      container={false}
      spacing='lg'
    >
      {/* Animated background elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <motion.div
          animate={{
            opacity: [0.4, 0.6, 0.4],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className='absolute -top-[30%] left-[10%] h-[60%] w-[80%] rounded-full bg-blue-600/5 blur-3xl'
        />
        <motion.div
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: 1,
          }}
          className='absolute -bottom-[30%] right-[10%] h-[60%] w-[80%] rounded-full bg-indigo-600/5 blur-3xl'
        />

        {/* Subtle grid pattern */}
        <div
          className='absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem]'
          style={{ opacity: 0.05 }}
        />
      </div>

      <Container className='relative z-10'>
        <div className='mx-auto mb-16 flex justify-center'>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.7 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className='h-px w-24 bg-gradient-to-r from-transparent via-primary/30 to-transparent'
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='mx-auto max-w-5xl'
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className='relative overflow-hidden rounded-2xl bg-gradient-to-b from-zinc-900/95 to-black/95 p-2 md:p-3 shadow-[0_0_50px_-12px_rgba(59,130,246,0.2)]'
          >
            {/* Inner border gradient */}
            <div className='absolute inset-0 rounded-2xl bg-gradient-to-b from-zinc-700/20 to-zinc-800/5 p-px'>
              <div className='absolute inset-0 rounded-2xl backdrop-blur-xl'></div>
            </div>

            <div className='relative z-10 rounded-xl p-8 md:p-10'>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className='text-center font-heading text-3xl font-bold md:text-4xl lg:text-5xl'
              >
                Founding Member{' '}
                <span className='text-blue-400'>Opportunity</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className='mt-4 text-center text-lg text-zinc-300'
              >
                For the first 50 members only —{' '}
                <span className='text-blue-400 font-medium'>
                  be part of something real from the start
                </span>
              </motion.p>

              <div className='mt-12 flex flex-col items-stretch justify-center gap-8 md:flex-row'>
                {/* Monthly plan */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className='flex-1 overflow-hidden rounded-xl bg-gradient-to-b from-zinc-800/50 to-zinc-900/50 p-px shadow-lg'
                  whileHover={{
                    y: -5,
                    boxShadow: '0 20px 40px -15px rgba(0,0,0,0.3)',
                    transition: { duration: 0.2 },
                  }}
                >
                  <div className='h-full rounded-xl bg-gradient-to-b from-black/60 to-black/95 p-6 md:p-8'>
                    <h3 className='font-heading text-2xl font-bold text-white'>
                      Monthly
                    </h3>
                    <p className='mt-2 text-zinc-400'>Flexible option</p>

                    <div className='my-6 flex items-baseline'>
                      <span className='font-heading text-5xl font-bold text-white'>
                        $25
                      </span>
                      <span className='ml-1 text-zinc-400'>/month</span>
                    </div>

                    <Link href='/register' className='mt-6 block'>
                      <ShinyButton className='w-full'>
                        Choose Monthly
                      </ShinyButton>
                    </Link>
                  </div>
                </motion.div>

                {/* Annual plan */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className='relative flex-1 overflow-hidden rounded-xl bg-gradient-to-b from-blue-700/30 to-blue-900/20 p-px shadow-lg'
                  whileHover={{
                    y: -5,
                    boxShadow: '0 20px 40px -15px rgba(0,0,0,0.3)',
                    transition: { duration: 0.2 },
                  }}
                >
                  {/* "Best Value" tag */}
                  <div className='absolute -right-12 top-6 rotate-45 bg-blue-600 px-12 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-md'>
                    Best Value
                  </div>

                  <div className='h-full rounded-xl bg-gradient-to-b from-black/60 to-black/95 p-6 md:p-8'>
                    <h3 className='font-heading text-2xl font-bold text-white'>
                      Annual
                    </h3>
                    <p className='mt-2 text-zinc-400'>Save $120</p>

                    <div className='my-6 flex items-baseline'>
                      <span className='font-heading text-5xl font-bold text-white'>
                        $180
                      </span>
                      <span className='ml-1 text-zinc-400'>/year</span>
                    </div>

                    <Link href='/register' className='mt-6 block'>
                      <ShinyButton className='w-full bg-blue-600/80 hover:bg-blue-600/90'>
                        Choose Annual
                      </ShinyButton>
                    </Link>
                  </div>
                </motion.div>
              </div>

              <div className='mt-12 rounded-xl bg-gradient-to-br from-zinc-900/50 to-black/20 p-6 md:p-8 border border-zinc-800/30'>
                <motion.h4
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className='mb-4 text-lg font-medium text-white'
                >
                  Founding Member Benefits:
                </motion.h4>

                <motion.ul
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className='space-y-4 text-zinc-300'
                >
                  {foundingBenefits.map((benefit, index) => (
                    <motion.li
                      key={index}
                      className='flex items-start'
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    >
                      <span className='mr-3 mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600/20 text-blue-400 text-sm'>
                        ✓
                      </span>
                      <span>{benefit}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className='mt-8 text-center text-zinc-400'
              >
                After the first 50 spots are filled, the price increases to
                $35/month or $300/year for the next 50 members.
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
