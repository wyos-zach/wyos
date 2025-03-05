import React from 'react';
import { Spinner } from '@/components/ui/atoms/spinner';

export function SpinnerSection() {
  return (
    <section className='space-y-6 px-6'>
      <h2 className='font-heading text-3xl font-bold'>Spinner</h2>
      <p className='text-muted-foreground'>
        Spinners indicate loading states in the application.
      </p>

      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Variants</h3>
        <div className='flex flex-wrap gap-28'>
          <Spinner variant='default' size={32} />
          <Spinner variant='circle' size={32} />
          <Spinner variant='pinwheel' size={32} />
          <Spinner variant='circle-filled' size={32} />
          <Spinner variant='ellipsis' size={32} />
          <Spinner variant='ring' size={32} />
          <Spinner variant='bars' size={32} />
          <Spinner variant='infinite' size={32} />
        </div>
      </div>

      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Sizes</h3>
        <div className='flex flex-wrap items-center gap-28'>
          <Spinner size={16} />
          <Spinner size={24} />
          <Spinner size={32} />
          <Spinner size={48} />
        </div>
      </div>

      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Colors</h3>
        <div className='flex flex-wrap gap-28'>
          <Spinner size={32} color='currentColor' />
          <Spinner size={32} color='#1677ff' />
          <Spinner size={32} color='#52c41a' />
          <Spinner size={32} color='#faad14' />
          <Spinner size={32} color='#ff4d4f' />
        </div>
      </div>

      <div className='text-sm text-gray-500'>
        <p className='mb-1 font-semibold'>Props:</p>
        <ul className='list-inside list-disc'>
          <li>
            variant: "default" | "circle" | "pinwheel" | "circle-filled" |
            "ellipsis" | "ring" | "bars" | "infinite"
          </li>
          <li>size: number (size in pixels)</li>
          <li>color: string (CSS color value)</li>
        </ul>
      </div>
    </section>
  );
}
