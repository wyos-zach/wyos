'use client';

import { motion } from 'motion/react';
import { Container } from '@/components/ui/container';
import { Star, Users, MessageSquare, Zap } from 'lucide-react';
import { HoverButton } from '@/components/ui/hover-button';
import { Section } from '@/components/ui/section';
import React from 'react';

export const FoundingMember = () => {
  const benefits = [
    {
      icon: <Users className='h-6 w-6' strokeWidth={1.5} />,
      title: 'Shape The Platform',
      description:
        'Direct input on features, community guidelines, and platform direction',
    },
    {
      icon: <Star className='h-6 w-6' strokeWidth={1.5} />,
      title: 'Lifetime Benefits',
      description:
        'Special perks and rates that remain exclusive to founding members',
    },
    {
      icon: <MessageSquare className='h-6 w-6' strokeWidth={1.5} />,
      title: 'Core Community',
      description:
        'Help build the foundation of our no-BS community from day one',
    },
    {
      icon: <Zap className='h-6 w-6' strokeWidth={1.5} />,
      title: 'Early Access',
      description:
        'First access to new features and content before anyone else',
    },
  ];

  return (
    <Section background='gradient'>
      <Container>
        {/* Title Section with Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='relative mb-12 text-center'
        >
          {/* Limited Spots Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='mb-6 flex justify-center'
          >
            <div className='inline-flex items-center gap-2 rounded-full border border-blue-900/20 bg-blue-500/5 px-4 py-2'>
              <Star className='h-4 w-4 text-blue-500' />
              <span className='text-sm font-medium text-blue-500'>
                Limited Founding Member Spots
              </span>
            </div>
          </motion.div>

          <h2 className='font-heading text-[40px] tracking-wide'>
            <span className='block font-semibold text-white'>Become A</span>
            <span className='gradient-text -mt-1 block font-medium'>
              Founding Member
            </span>
          </h2>
          <div className='mx-auto mt-6 h-px w-20 bg-gradient-to-r from-transparent via-blue-800/50 to-transparent' />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='mx-auto max-w-3xl'
        >
          <p className='text-center text-lg leading-relaxed text-zinc-400 md:text-xl'>
            This isn't about following someone else's vision. It's about
            building something together—a space where we can all grow, learn,
            and succeed on our own terms.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className='mt-16 grid gap-4 sm:grid-cols-2'>
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className='group rounded-xl border border-white/10 bg-[#131316] p-6'
            >
              <div className='flex items-start gap-4'>
                <div className='rounded-lg border border-white/[0.08] bg-white/[0.02] p-3'>
                  {benefit.icon}
                </div>
                <div>
                  <h3 className='gradient-text text-lg font-semibold'>
                    {benefit.title}
                  </h3>
                  <p className='mt-2 text-sm text-zinc-400'>
                    {benefit.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='mt-16 text-center'
        >
          <HoverButton>Become a Founding Member</HoverButton>
        </motion.div>
      </Container>
    </Section>
  );
};
