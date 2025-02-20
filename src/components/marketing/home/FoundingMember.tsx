'use client';

import { motion } from 'motion/react';
import { Container } from '@/components/ui/container';
import { Star, Users, MessageSquare, Zap } from 'lucide-react';

export const FoundingMember = () => {
  const benefits = [
    {
      icon: <Users className='h-5 w-5 text-blue-400' />,
      title: 'Shape The Platform',
      description:
        'Direct input on features, community guidelines, and platform direction',
    },
    {
      icon: <Star className='h-5 w-5 text-blue-400' />,
      title: 'Lifetime Benefits',
      description:
        'Special perks and rates that remain exclusive to founding members',
    },
    {
      icon: <MessageSquare className='h-5 w-5 text-blue-400' />,
      title: 'Core Community',
      description:
        'Help build the foundation of our no-BS community from day one',
    },
    {
      icon: <Zap className='h-5 w-5 text-blue-400' />,
      title: 'Early Access',
      description:
        'First access to new features and content before anyone else',
    },
  ];

  return (
    <section className='relative py-24'>
      {/* Background gradient */}
      <div className='absolute inset-0 bg-gradient-to-b from-background/0 via-background/80 to-background' />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='relative'
        >
          {/* Founding member badge */}
          <div className='mx-auto mb-12 flex justify-center'>
            <div className='inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-2'>
              <Star className='h-4 w-4 text-blue-400' />
              <span className='text-sm font-medium text-blue-400'>
                Limited Founding Member Spots
              </span>
            </div>
          </div>

          {/* Main content */}
          <div className='mx-auto max-w-4xl text-center'>
            <h2 className='mb-6 text-3xl font-bold md:text-4xl'>
              Build Something Real
              <span className='block text-blue-400'>With Us</span>
            </h2>

            <p className='mb-8 text-lg text-zinc-400'>
              This isn't about following someone else's vision. It's about
              building something together—a space where we can all grow, learn,
              and succeed on our own terms.
            </p>

            {/* Benefits grid */}
            <div className='mb-12 grid gap-6 md:grid-cols-2'>
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className='group relative rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 transition-colors hover:border-blue-500/50 hover:bg-blue-500/5'
                >
                  <div className='mb-3 inline-flex rounded-full bg-blue-500/10 p-3'>
                    {benefit.icon}
                  </div>
                  <h3 className='mb-2 text-lg font-semibold text-white'>
                    {benefit.title}
                  </h3>
                  <p className='text-sm text-zinc-400'>{benefit.description}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA section */}
            <div className='space-y-6'>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-3 font-medium text-white transition-colors hover:bg-blue-500'
              >
                Become a Founding Member
              </motion.button>

              <p className='text-sm text-zinc-500'>
                <span className='font-medium text-blue-400'>
                  Only 100 spots available
                </span>{' '}
                · Join the waitlist today
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
