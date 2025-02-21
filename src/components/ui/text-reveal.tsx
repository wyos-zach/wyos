'use client';

import {
  motion,
  type MotionValue,
  useScroll,
  useTransform,
} from 'motion/react';
import type { ComponentPropsWithoutRef, FC, ReactNode } from 'react';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(
    progress,
    [range[0], range[0] + 0.015, range[1]],
    [0, 1, 1]
  );

  return (
    <motion.span
      style={{
        opacity,
      }}
      className='text-white'
    >
      {children}
    </motion.span>
  );
};

export interface TextRevealProps extends ComponentPropsWithoutRef<'div'> {
  text: string;
  progress?: MotionValue<number>;
  start?: number;
  end?: number;
}

export const TextReveal: FC<TextRevealProps> = ({
  text,
  className,
  progress,
  start = 0,
  end = 1,
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  });

  const scrollProgress = progress || scrollYProgress;
  const words = text.split(' ');
  const totalDuration = end - start;
  const wordDuration = totalDuration / words.length;

  return (
    <div ref={targetRef} className={cn('relative', className)}>
      <p className='text-xl font-medium md:text-2xl'>
        {words.map((word, i) => {
          const wordStart = start + i * wordDuration;
          const wordEnd = wordStart + wordDuration;

          return (
            <span key={`${word}-${wordStart}`}>
              <Word progress={scrollProgress} range={[wordStart, wordEnd]}>
                {word}
              </Word>{' '}
            </span>
          );
        })}
      </p>
    </div>
  );
};
