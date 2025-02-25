'use client';

import { motion } from 'motion/react';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';

export function WhyNotFree() {
  const reasons = [
    'It keeps WYOS independent—no investors, no corporate owners, no one to answer to except the members',
    "It ensures we can focus on quality over quantity—we don't need to chase views or clicks",
    "It helps filter out people who aren't serious—when you pay for something, you're more likely to actually use it",
    'It creates a better community—members who invest in their growth tend to contribute more meaningfully',
  ];

  return (
    <Section 
      className='relative pt-20' 
      container={false}
      spacing='lg'
    >
      <div className='absolute inset-0 h-full'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,58,138,0.05),transparent_50%)]' />
        <div
          className='absolute h-full w-full bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]'
          style={{ opacity: 0.2 }}
        />
      </div>

      <Container className='relative'>
        <div className='flex flex-col items-center mb-16'>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className='h-px w-20 bg-gradient-to-r from-transparent via-primary/40 to-transparent mb-12'
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='mx-auto max-w-3xl'
        >
          <h2 className='font-heading text-3xl font-bold md:text-4xl text-center mb-12'>
            Why isn't WYOS free?
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className='bg-zinc-900/30 backdrop-blur-sm rounded-2xl p-8 border border-zinc-800/40'
          >
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='text-lg text-zinc-300'
            >
              When I built WYOS, I had a choice: make it free and fill it with
              ads, sell your data, push affiliate products you don't need, or
              charge a straightforward membership fee. I chose the membership
              model because:
            </motion.p>

            <motion.ul
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className='mt-8 space-y-5 text-lg'
            >
              {reasons.map((reason, index) => (
                <motion.li 
                  key={index} 
                  className='flex items-start'
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                >
                  <span className='mr-3 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary text-sm'>
                    {index + 1}
                  </span>
                  <span className='text-zinc-200'>{reason}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className='mt-8 text-lg text-zinc-300'
            >
              The reality is that building and maintaining WYOS costs money.
              Server costs, development, community hosting, content curation—these
              aren't free. But instead of covering these costs by compromising the
              platform's integrity, I'd rather be upfront about it.
            </motion.p>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
