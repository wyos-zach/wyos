'use client';

import { HeroSection } from '@/components/ui/organisms/HeroSection';

export function CoreHeroSection() {
  return (
    <section className='space-y-6 px-6'>
      <h2 className='font-heading text-3xl font-bold'>HeroSection</h2>
      <p className='text-muted-foreground'>
        A full hero section with animated content, gradient background, and
        glassmorphism effect.
      </p>

      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Default Usage</h3>
        <div className='flex flex-wrap gap-4'>
          <HeroSection
            title='Welcome to Knowledge Hub'
            description='Explore a world of insights and resources.'
          />
        </div>
      </div>

      <div className='text-sm text-gray-500'>
        <p>Props:</p>
        <ul className='list-inside list-disc'>
          <li>title: string (the hero title)</li>
          <li>description: string (the hero description)</li>
          <li>className: string (optional custom Tailwind classes)</li>
        </ul>
      </div>
    </section>
  );
}
