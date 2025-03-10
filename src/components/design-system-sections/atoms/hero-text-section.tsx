'use client';

import { HeroText } from '@/components/design-system/atoms/HeroText';

export function HeroTextSection() {
  return (
    <section className='space-y-6 px-6'>
      <h2 className='font-heading text-3xl font-bold'>HeroText</h2>
      <p className='text-muted-foreground'>
        Animated text component for hero sections with smooth fade-in and
        slide-up effects.
      </p>

      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Default Usage</h3>
        <div className='flex flex-wrap gap-20'>
          <HeroText className='gradient-text text-4xl font-bold'>
            Sample Title
          </HeroText>
          <HeroText className='text-lg text-muted-foreground'>
            Sample Description
          </HeroText>
        </div>
      </div>

      <div className='text-sm text-gray-500'>
        <p>Props:</p>
        <ul className='list-inside list-disc'>
          <li>children: ReactNode (the text content)</li>
          <li>className: string (optional custom Tailwind classes)</li>
        </ul>
      </div>
    </section>
  );
}
