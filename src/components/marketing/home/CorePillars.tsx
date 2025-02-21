'use client';

import { Container } from '@/components/ui/container';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const AUTOPLAY_DELAY = 7500; // 5 seconds per slide

const pillars = [
  {
    id: 'knowledge',
    title: 'Knowledge',
    description:
      "The Knowledge Section brings together the best insights and wisdom from across the internet, all in one place. Whether you're trying to build better habits, start a business, or just figure life out - you'll find practical, actionable information without having to wade through endless garbage to get it.",
    image: '/images/knowledge-section.jpg',
  },
  {
    id: 'resources',
    title: 'Resources',
    description:
      "The Resources Section is where you'll find tools that actually work. We test everything ourselves and only recommend what delivers real results. From meditation apps to productivity tools, you'll find the best options without the overwhelming choice paralysis.",
    image: '/images/resources-section.jpg',
  },
  {
    id: 'community',
    title: 'Community',
    description:
      "The Community is for people who are done with the fake stuff. It's a place where you can be real about your struggles, share what's actually working, and connect with others who are serious about leveling up. No judgment, no toxic positivity - just honest conversations and real support.",
    image: '/images/community-section.jpg',
  },
];

export function CorePillars() {
  const [activePillar, setActivePillar] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const advanceSlide = useCallback(() => {
    setActivePillar((current) => (current + 1) % pillars.length);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!isPaused) {
      interval = setInterval(advanceSlide, AUTOPLAY_DELAY);
    }

    return () => clearInterval(interval);
  }, [isPaused, advanceSlide]);

  const handlePillarClick = (index: number) => {
    setActivePillar(index);
    setIsPaused(true);
  };

  return (
    <section className='relative px-[5%] py-[120px]'>
      <Container className='mx-auto max-w-[1280px] px-5'>
        <div className='mb-12 flex flex-col items-center text-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className='font-heading text-[40px] font-semibold tracking-wide'>
              <span className='block text-white'>One Platform.</span>
              <span className='gradient-text -mt-1 block font-medium'>
                Everything You Need
              </span>
            </h2>
            <div className='mx-auto mt-6 h-px w-20 bg-gradient-to-r from-transparent via-blue-800/50 to-transparent' />
            <p className='mx-auto mt-6 max-w-2xl text-[18px] leading-relaxed text-[#A1A1AA]'>
              The idea behind WYOS is to combine everything you need into one
              platform so you can move from where you are now to where you want
              to be.
            </p>
          </motion.div>

          <div className='mt-10 flex justify-center'>
            <div className='flex w-full max-w-2xl justify-between gap-12'>
              {pillars.map((pillar, index) => (
                <div key={pillar.id} className='relative'>
                  <button
                    onClick={() => handlePillarClick(index)}
                    className={cn(
                      'relative min-w-[100px] text-[16px] font-medium transition-all duration-300',
                      activePillar === index
                        ? 'text-white'
                        : 'text-[#71717A] hover:text-[#A1A1AA]'
                    )}
                  >
                    {pillar.title}
                  </button>
                  {activePillar === index && (
                    <motion.div
                      layoutId='activeTab'
                      className='absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent'
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className='relative mt-12 h-[500px] w-full overflow-hidden rounded-xl border border-white/10 bg-[#131316]'
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Progress Bar */}
          <div className='absolute left-0 top-0 h-px w-full'>
            <motion.div
              className='h-full w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent'
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 5, ease: 'linear' }}
              key={activePillar}
            />
          </div>

          <AnimatePresence mode='wait'>
            {pillars.map(
              (pillar, index) =>
                activePillar === index && (
                  <motion.div
                    key={pillar.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className='absolute inset-0'
                  >
                    <Image
                      src={pillar.image}
                      alt={pillar.title}
                      fill
                      className='object-cover'
                      priority={index === 0}
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-[#0C0C0E]/90 via-[#0C0C0E]/50 to-[#0C0C0E]/20' />
                    <div className='absolute bottom-0 left-0 p-8 sm:p-12'>
                      <h3 className='gradient-text mb-4 font-heading text-[32px] font-bold tracking-wide'>
                        {pillar.title}
                      </h3>
                      <p className='max-w-xl text-lg text-zinc-400'>
                        {pillar.description}
                      </p>
                    </div>
                  </motion.div>
                )
            )}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}
