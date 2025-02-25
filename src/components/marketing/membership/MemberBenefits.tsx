'use client';

import { motion } from 'motion/react';
import { Container } from '@/components/ui/container';

export function MemberBenefits() {
  const benefits = [
    {
      title: 'The Knowledge Section',
      description:
        'Curated insights and practical wisdom that actually works—no fluff, no generic advice',
    },
    {
      title: 'The Resource Library',
      description:
        'Over 1,000 vetted tools across books, apps, courses, podcasts, software, and YouTube channels',
    },
    {
      title: 'The Community',
      description:
        'Connect with others who are serious about growth and success',
    },
    {
      title: 'Direct Input',
      description:
        "Help shape what WYOS becomes—this isn't just my platform, it's ours",
    },
    {
      title: 'Comment & Rate',
      description:
        'Share your experiences with resources to help other members',
    },
    {
      title: 'Support Real Change',
      description:
        'Help build an alternative to the manipulation-driven internet we have today',
    },
  ];

  return (
    <section className='section-container'>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='mx-auto max-w-4xl text-center'
        >
          <h2 className='section-title'>What You Get as a Member</h2>

          <div className='mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className='value-card flex-col text-left'
              >
                <h3 className='mb-3 font-heading text-xl font-bold'>
                  {benefit.title}
                </h3>
                <p className='text-zinc-400'>{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
