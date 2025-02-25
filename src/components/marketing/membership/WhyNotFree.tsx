'use client';

import { motion } from 'motion/react';
import { Container } from '@/components/ui/container';

export function WhyNotFree() {
  const reasons = [
    'It keeps WYOS independent—no investors, no corporate owners, no one to answer to except the members',
    "It ensures we can focus on quality over quantity—we don't need to chase views or clicks",
    "It helps filter out people who aren't serious—when you pay for something, you're more likely to actually use it",
    'It creates a better community—members who invest in their growth tend to contribute more meaningfully',
  ];

  return (
    <section className='relative -mt-32 pb-24'>
      <div className='absolute inset-0 h-[50vh]'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,58,138,0),transparent_50%)]' />
        <div
          className='absolute h-full w-full bg-[linear-gradient(to_right,#000103_1px,transparent_1px),linear-gradient(to_bottom,#000103_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]'
          style={{ opacity: 0.02 }}
        />
        <div className='absolute inset-0 h-full bg-gradient-to-b from-transparent via-background/50 to-background' />
      </div>

      <Container className='relative pt-32'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='mx-auto max-w-3xl'
        >
          <h2 className='font-heading text-3xl font-bold md:text-4xl'>
            Why isn't WYOS free?
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='mt-6 text-lg text-zinc-400'
          >
            When I built WYOS, I had a choice: make it free and fill it with
            ads, sell your data, push affiliate products you don't need, or
            charge a straightforward membership fee. I chose the membership
            model because:
          </motion.p>

          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className='mt-6 space-y-4 text-lg text-zinc-400'
          >
            {reasons.map((reason, index) => (
              <li key={index} className='flex items-start'>
                <span className='mr-3 mt-1 text-primary'>•</span>
                <span>{reason}</span>
              </li>
            ))}
          </motion.ul>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className='mt-6 text-lg text-zinc-400'
          >
            The reality is that building and maintaining WYOS costs money.
            Server costs, development, community hosting, content curation—these
            aren't free. But instead of covering these costs by compromising the
            platform's integrity, I'd rather be upfront about it.
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
