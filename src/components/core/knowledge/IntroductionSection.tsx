'use client';
import { motion } from 'framer-motion';

export function IntroductionSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      aria-labelledby='section-intro'
      className='mx-auto max-w-3xl space-y-6 px-4 text-center'
    >
      <h2 id='section-intro' className='sr-only'>
        About the Knowledge Hub
      </h2>
      <motion.p
        className='text-lg leading-relaxed text-muted-foreground'
        transition={{ delay: 0.1 }}
      >
        Welcome to the WYOS Knowledge Hub—a carefully curated collection of
        practical wisdom and actionable insights. Here you'll find authentic,
        no-fluff resources designed to help you navigate your personal growth
        journey.
      </motion.p>
      <motion.p
        className='text-lg leading-relaxed text-muted-foreground'
        transition={{ delay: 0.2 }}
      >
        Each category represents a crucial area of development, packed with
        expert insights, real-world experiences, and practical tools you can
        apply immediately.
      </motion.p>
    </motion.section>
  );
}
