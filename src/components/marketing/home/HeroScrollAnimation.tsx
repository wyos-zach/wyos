'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { TextReveal } from '@/components/ui/text-reveal';

const sentences = [
  "Life's chaotic.",
  "Every day, it gets harder to tell what's real and what's not.",
  "You're overwhelmed with choices and drowning in information.",
  'The more you try to make sense of it, the more lost you become.',
  "But it doesn't have to be this way.",
];

export function HeroScrollAnimation() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Frame transformations
  const rotateX = useTransform(scrollYProgress, [0, 0.15], [25, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0.15, 0.5],
    [0.8, isMobile ? 1.1 : 1.3]
  );
  const frameY = useTransform(scrollYProgress, [0, 0.15], ['20vh', '0vh']);
  const perspective = 1000;

  return (
    <section ref={containerRef} className='relative -mt-[20vh] h-[300vh]'>
      <div className='sticky top-[20vh] h-screen'>
        <div className='container mx-auto'>
          <motion.div
            initial={{ rotateX: 25, scale: 0.8 }}
            style={{
              rotateX,
              scale,
              y: frameY,
              transformPerspective: perspective,
            }}
            className='mx-auto h-[40rem] w-[90%] max-w-5xl overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900/90 via-zinc-900/80 to-zinc-900/70 p-4 shadow-2xl backdrop-blur-sm'
          >
            {/* Image/Video Background */}
            <div className='relative h-full w-full overflow-hidden rounded-xl'>
              <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30' />
              <div className='relative h-full w-full'>
                <Image
                  src='/images/placeholder.png'
                  alt='Frame'
                  fill
                  className='object-cover'
                  priority
                />
              </div>
            </div>

            {/* Text Content Overlay */}
            <div className='absolute inset-0 flex flex-col items-center justify-center p-8 text-center'>
              {sentences.map((sentence, index) => (
                <TextReveal
                  key={`hero-${sentence.slice(0, 20)}`}
                  text={sentence}
                  progress={scrollYProgress}
                  start={0.1 + index * 0.15} // Start earlier and give more time
                  end={0.2 + index * 0.15} // Complete before next sentence
                  className='mb-6 block' // Increased gap between sentences
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
