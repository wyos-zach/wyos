'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { TextEffect } from '@/components/ui/text-effect';

const sentences = [
  "Life's chaotic.",
  "Every day, it gets harder to tell what's real or not.",
  "You're overwhelmed with choices and drowning in information.",
  'The more you try to make sense of it, the more lost you become.',
  "But it doesn't have to be this way.",
];

export function HeroScrollAnimation() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [visibleSentences, setVisibleSentences] = useState<boolean[]>(
    new Array(sentences.length).fill(false)
  );

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Frame transformations
  const rotateX = useTransform(scrollYProgress, [0, 0.15], [25, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0.15, 0.5, 0.8],
    [0.8, 1, isMobile ? 1.1 : 1.3]
  );
  const frameY = useTransform(scrollYProgress, [0, 0.15], ['20vh', '0vh']);

  // Create scroll-based triggers for each sentence
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (value) => {
      const newVisibleSentences = sentences.map((_, index) => {
        // Distribute the triggers across the scroll range 0.4 to 0.7
        const triggerPoint = 0.4 + (index * 0.3) / sentences.length;
        return value > triggerPoint;
      });
      setVisibleSentences(newVisibleSentences);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const perspective = 1000;

  return (
    <section ref={containerRef} className='relative -mt-[20vh] h-[300vh]'>
      <div className='sticky top-[20vh] h-screen'>
        <div className='container mx-auto'>
          <motion.div
            initial={{
              rotateX: 25,
              scale: 0.8,
              transformPerspective: perspective,
              y: '20vh',
            }}
            style={{
              rotateX,
              scale,
              y: frameY,
              transformPerspective: perspective,
            }}
            className='mx-auto h-[40rem] w-[90%] max-w-5xl overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900/90 via-zinc-900/80 to-zinc-900/70 p-4 shadow-2xl backdrop-blur-sm'
          >
            {/* Image/Video Background with padding */}
            <div className='relative h-full w-full overflow-hidden rounded-xl'>
              <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30' />
              <div className='relative h-full w-full'>
                <Image
                  src='/images/placeholder.png'
                  alt='Abstract Background'
                  fill
                  className='object-cover'
                  priority
                />
              </div>
            </div>

            {/* Text Content */}
            <div className='absolute inset-0 flex flex-col items-center justify-center p-8 text-center'>
              {sentences.map((sentence, index) => (
                <TextEffect
                  key={index}
                  per='word'
                  preset='blur'
                  trigger={visibleSentences[index]}
                  delay={index * 1.5}
                  className='mb-6 text-xl font-medium text-white/90 last:mb-0 md:text-2xl'
                >
                  {sentence}
                </TextEffect>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
