'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { TextReveal } from '@/components/ui/text-reveal';

const sentences = [
  "Life's getting chaotic.",
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

  const rotateX = useTransform(scrollYProgress, [0, 0.1], [20, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.25],
    [0.9, isMobile ? 1.1 : 1.5] // If desired, change scale from 0.9 to a higher value (e.g. 1.5) to end bigger
  );

  const perspective = 1000;

  return (
    <section ref={containerRef} className='relative h-[400vh]'>
      <div className='sticky top-[20vh] h-screen'>
        <div className='container mx-auto'>
          <motion.div
            initial={{ rotateX: 25, scale: 1 }} // If desired, change scale from 0.09 to a higher value (e.g. 1) to start bigger
            style={{
              rotateX,
              scale,
              transformPerspective: perspective,
              WebkitBackdropFilter: 'blur(64px)',
              backdropFilter: 'blur(64px)',
              backgroundImage:
                'linear-gradient(rgba(16,17,20,.5), rgba(255,255,255,0)), linear-gradient(#060609, #060609)',
            }}
            className='relative mx-auto h-[40rem] w-[90%] max-w-5xl overflow-hidden rounded-[36px] p-4 shadow-2xl'
          >
            {/* Image/Video Background with adjusted padding */}
            <div className='absolute inset-0 rounded-[32px] bg-[#060609]'>
              <div className='relative h-full w-full'>
                <Image
                  src='/images/placeholder.png'
                  alt='Frame'
                  fill
                  className='object-cover'
                  priority
                />
                <div className='absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/70' />
              </div>
            </div>

            {/* Text Content Overlay */}
            <div className='absolute inset-0 flex flex-col items-center justify-center p-8 text-center'>
              {sentences.map((sentence, index) => (
                <TextReveal
                  key={`hero-${sentence.slice(0, 20)}`}
                  text={sentence}
                  progress={scrollYProgress}
                  start={0 + index * 0.15}
                  end={0.1 + index * 0.15}
                  className='mb-6 block !text-white' // Added !text-white to force full opacity
                />
              ))}
            </div>

            {/* Gradient Border */}
            <div
              className='pointer-events-none absolute inset-0 rounded-[36px]'
              style={{
                padding: '1px',
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 80%)',
                WebkitMask:
                  'linear-gradient(#060609, #060609) content-box, linear-gradient(#060609, #060609)',
                WebkitMaskComposite: 'xor',
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
