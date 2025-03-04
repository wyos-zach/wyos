import React from 'react';
import { Button } from '@/components/ui/button';

export function ButtonSection() {
  return (
    <section className='space-y-6 px-6'>
      <h2 className='font-heading text-3xl font-bold'>Button</h2>
      <p className='text-muted-foreground'>
        Buttons are used to trigger actions or navigate users throuph the
        interface.
      </p>

      {/* Variants */}
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

      {/* Sizes */}
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Sizes</h3>
        <div className='flex flex-wrap gap-4'>
          <Button size='sm'>Small</Button>
          <Button size='default'>Default</Button>
          <Button size='lg'>Large</Button>
          <Button size='icon' aria-label='Icon Button'>
            {/* Example Icon */}
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

      {/* Loading States */}
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Loading States</h3>
        <div className='flex flex-wrap gap-4'>
          <Button loading>Loading</Button>
          <Button loading loadingText='Submitting...'>
            Loading with Text
          </Button>
        </div>
      </div>

      {/* Disabled State */}
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

      {/* Animations */}
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Animations</h3>
        <p className='text-muted-foreground'>
          Hover and tap animatipns are built into the button using Motion.
        </p>
        <div className='flex flex-wrap gap-4'>
          <Button variant='ringHover'>Hover Ring</Button>
          <Button variant='glowingRing'>Glowing Ring</Button>
          <Button variant='shimmer'>Shimmer Effect</Button>
          <Button variant='perimeterShimmer'>Perimeter Shimmer</Button>
          <Button variant='bouncing'>Bouncing Animation</Button>
        </div>
      </div>

      {/* Documentation */}
      <div className='text-sm text-gray-500'>
        <p>Props:</p>
        <ul className='list-inside list-disc'>
          <li>
            variant: "default" | "destructive" | "outline" | "secondary" |
            "ghost" | "link" | etc.
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
