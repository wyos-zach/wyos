import type { Variants } from 'framer-motion';

export interface AnimationConfig {
  initial?: string | object;
  animate?: string | object;
  exit?: string | object;
  transition?: {
    duration?: number;
    delay?: number;
    ease?: string | number[];
  };
}

export interface MotionVariants {
  hidden: object;
  visible: object;
  exit?: object;
}

export const defaultTransition = {
  duration: 0.3,
  ease: [0.25, 0.1, 0.25, 1.0],
};

export const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
};

export const staggerChildrenVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};
