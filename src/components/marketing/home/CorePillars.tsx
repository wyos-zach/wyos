'use client';

import { Container } from '@/components/ui/container';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const pillars = [
  {
    id: 'knowledge',
    title: 'Knowledge',
    description:
      "The Knowledge Section brings together the best insights and wisdom from across the internet, all in one place. Whether you're trying to build better habits, start a business, or just figure life out - you'll find practical, actionable information without having to wade through endless garbage to get it.",
    image: '/images/placeholder.png',
  },
  {
    id: 'resources',
    title: 'Resources',
    description:
      "The Resources Section is where you'll find tools that actually work. We test everything ourselves and only recommend what delivers real results. From meditation apps to productivity tools, you'll find the best options without the overwhelming choice paralysis.",
    image: '/images/placeholder.png',
  },
  {
    id: 'community',
    title: 'Community',
    description:
      "The Community is for people who are done with the fake stuff. It's a place where you can be real about your struggles, share what's actually working, and connect with others who are serious about leveling up. No judgment, no toxic positivity - just honest conversations and real support.",
    image: '/images/placeholder.png',
  },
];

export function CorePillars() {
  const [activePillar, setActivePillar] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const startTimer = useCallback(() => {
    return setInterval(() => {
      setIsResetting(true);
      setTimeout(() => {
        setActivePillar((current) => (current + 1) % pillars.length);
        setIsResetting(false);
      }, 50); // Small delay to ensure CSS transition is reset
    }, 5000);
  }, []);

  useEffect(() => {
    if (!isPaused) {
      const timer = startTimer();
      return () => clearInterval(timer);
    }
  }, [isPaused, startTimer]);

  const handleTabClick = (index: number) => {
    if (index === activePillar) return;
    setIsResetting(true);
    setTimeout(() => {
      setActivePillar(index);
      setIsResetting(false);
    }, 50);
  };

  return (
    <section className='relative px-[5%] py-[120px]'>
      {/* Gradient transition */}
      <div className='gradient-transition' />

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
            <p className='mx-auto mt-6 max-w-2xl text-[18px] leading-relaxed text-[#A1A1AA]'>
              The idea behind WYOS is to combine everything you need into one
              platform so you can move from where you are now to where you want
              to be.
            </p>
          </motion.div>

          {/* Tabs */}
          <div className='mt-10 flex justify-center'>
            <div className='flex w-full max-w-2xl justify-between gap-12'>
              {pillars.map((pillar, index) => (
                <div key={pillar.id} className='tab-container'>
                  <button
                    onClick={() => handleTabClick(index)}
                    className={cn(
                      'tab-progress min-w-[100px] text-[16px] font-medium transition-colors',
                      activePillar === index
                        ? 'active text-white'
                        : 'text-[#71717A] hover:text-[#A1A1AA]',
                      isResetting && activePillar === index && 'reset'
                    )}
                  >
                    {pillar.title}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className='relative h-[500px] w-full overflow-hidden rounded-xl border border-white/10 bg-[#131316]'
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
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
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-[#0C0C0E]/90 via-[#0C0C0E]/50 to-[#0C0C0E]/20' />
                    <div className='absolute bottom-0 left-0 p-8 sm:p-12'>
                      <h3 className='gradient-text mb-4 font-heading text-[32px] font-bold tracking-wide'>
                        {pillar.title}
                      </h3>
                      <p className='max-w-xl text-[18px] leading-relaxed text-[#E4E4E7]'>
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
