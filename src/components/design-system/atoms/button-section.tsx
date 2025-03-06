'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/atoms/button';

export function ButtonSection() {
  const [isLoading, setIsLoading] = useState(false);

  const toggleLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <section className='space-y-6 px-6'>
      <h2 className='font-heading text-3xl font-bold'>Button</h2>
      <p className='text-muted-foreground'>
        Buttons trigger actions or navigate users through the interface with a
        premium, polished design.
      </p>

      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Variants</h3>
        <div className='flex flex-wrap gap-4'>
          <Button variant='default'>Default</Button>
          <Button variant='destructive'>Destructive</Button>
          <Button variant='outline'>Outline</Button>
          <Button variant='secondary'>Secondary</Button>
          <Button variant='ghost'>Ghost</Button>
          <Button variant='link'>Link</Button>
        </div>
      </div>

      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Sizes</h3>
        <div className='flex flex-wrap gap-4'>
          <Button size='sm'>Small</Button>
          <Button size='default'>Default</Button>
          <Button size='lg'>Large</Button>
          <Button size='icon' aria-label='Icon Button'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-5 w-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 4.5v15m7.5-7.5h-15'
              />
            </svg>
          </Button>
        </div>
      </div>

      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Loading States</h3>
        <div className='flex flex-wrap gap-4'>
          <Button loading={isLoading} onClick={toggleLoading}>
            Toggle Loading
          </Button>
          <Button
            loading={isLoading}
            loadingText='Submitting...'
            onClick={toggleLoading}
          >
            Toggle with Text
          </Button>
        </div>
      </div>

      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Disabled State</h3>
        <div className='flex flex-wrap gap-4'>
          <Button disabled>Disabled</Button>
          <Button variant='destructive' disabled>
            Destructive Disabled
          </Button>
          <Button variant='outline' disabled>
            Outline Disabled
          </Button>
        </div>
      </div>

      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Tooltip</h3>
        <div className='flex flex-wrap gap-4'>
          <Button tooltipText='Click to proceed'>With Tooltip</Button>
        </div>
      </div>

      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Animations</h3>
        <p className='text-muted-foreground'>
          Subtle hover, tap, and custom animations enhance interactivity.
        </p>
        <div className='flex flex-wrap gap-4'>
          <Button variant='glowingRing'>Glowing Ring</Button>
          <Button variant='shimmer'>Shimmer Effect</Button>
          <Button variant='perimeterShimmer'>Perimeter Shimmer</Button>
          <Button variant='hoverGlow'>Hover Glow</Button>
        </div>
      </div>

      <div className='text-sm text-gray-500'>
        <p>Props:</p>
        <ul className='list-inside list-disc'>
          <li>
            variant: "default" | "destructive" | "outline" | "secondary" |
            "ghost" | "link" | "glowingRing" | "shimmer" | "perimeterShimmer" |
            "hoverGlow"
          </li>
          <li>size: "sm" | "default" | "lg" | "icon"</li>
          <li>loading: boolean (shows a spinner)</li>
          <li>loadingText: string (optional text while loading)</li>
          <li>tooltipText: string (optional tooltip text)</li>
          <li>asChild: boolean (renders as a child component)</li>
        </ul>
      </div>
    </section>
  );
}
