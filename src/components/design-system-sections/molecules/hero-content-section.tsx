'use client';

import { HeroContent } from '@/components/design-system/molecules/HeroContent';

export function HeroContentSection() {
  return (
    <section className='space-y-6 px-6'>
      <h2 className='font-heading text-3xl font-bold'>HeroContent</h2>
      <p className='text-muted-foreground'>
        A molecule combining title, description, and dividers for hero sections.
      </p>

      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Default Usage</h3>
        <div className='flex flex-wrap gap-4'>
          <HeroContent
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
        </ul>
      </div>
    </section>
  );
}
