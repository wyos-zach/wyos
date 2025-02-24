'use client';

import { motion } from 'motion/react';
import { Container } from '@/components/ui/container';

interface PrincipleProps {
  title: string;
  description: string;
}

function Principle({ title, description }: PrincipleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className='group relative'
    >
      <div className='relative rounded-2xl border border-zinc-800/50 bg-gradient-to-b from-zinc-900/70 to-zinc-900/20 p-8 backdrop-blur-sm transition-all duration-300 hover:border-zinc-700 hover:shadow-[0_0_30px_-5px_rgba(217,91,60,0.1)]'>
        {/* Animated gradient border on hover */}
        <div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-zinc-800/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100' />

        {/* Subtle glow effect */}
        <div className='absolute -inset-px rounded-2xl bg-gradient-to-r from-zinc-800/5 via-zinc-800/20 to-zinc-800/5 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100' />

        <div className='relative'>
          <h3 className='bg-gradient-to-r from-white via-zinc-300 to-zinc-400 bg-clip-text text-xl font-medium text-transparent'>
            {title}
          </h3>
          <p className='mt-4 text-base leading-relaxed text-zinc-400'>
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function WhatWeBelieve() {
  const principles = [
    {
      title: 'Truth Over Everything',
      description:
        "We don't sugar-coat or hide behind buzzwords. If something works, we'll tell you. If it doesn't, we'll tell you that too. No fake positivity, no manipulation, no hidden agendas. Just the truth, even when it's hard to hear - because that's what actually helps people move forward.",
    },
    {
      title: 'Quality Over Quantity',
      description:
        "We don't need more content - we need better content. Everything on WYOS is carefully chosen because it delivers real results, not because it sounds good or makes us money. No fluff or bs sales tactics.",
    },
    {
      title: 'Stay Independent',
      description:
        'WYOS is funded by member subscriptions, not ads or data selling. We use some affiliate partnerships, but only to keep membership costs low - never to push products. Our loyalty is to our members, not advertisers.',
    },
    {
      title: 'Build Together',
      description:
        "WYOS isn't just another platform - it's being shaped by its founding members. We don't have all the answers, and we don't pretend to. What we have is a vision for something better and a community ready to build it.",
    },
  ];

  return (
    <div className='relative'>
      {/* Background effects */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-40%,rgba(217,91,60,0.05),transparent)]' />
        <div
          className='absolute h-full w-full bg-[linear-gradient(to_right,#000103_1px,transparent_1px),linear-gradient(to_bottom,#000103_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_-20%,#000_70%,transparent_110%)]'
          style={{ opacity: 0.1 }}
        />
      </div>

      <Container className='relative py-24'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='mx-auto max-w-3xl text-center'
        >
          <h2 className='font-heading text-4xl font-bold md:text-5xl'>
            What We Believe
          </h2>
          <div className='mx-auto mt-6 h-px w-20 bg-gradient-to-r from-transparent via-blue-800/50 to-transparent' />
          <p className='mt-4 text-lg text-zinc-400'>
            Principles that guide everything we do at WYOS
          </p>
        </motion.div>
        <div className='mt-16 grid gap-6 md:grid-cols-2'>
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Principle {...principle} />
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
}
