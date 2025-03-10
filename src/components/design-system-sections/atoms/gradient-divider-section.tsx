'use client';

import { GradientDivider } from '@/components/design-system/atoms/GradientDivider';

export function GradientDividerSection() {
  return (
    <section className='space-y-6 px-6'>
      <h2 className='font-heading text-3xl font-bold'>GradientDivider</h2>
      <p className='text-muted-foreground'>
        A subtle animated divider with a gradient effect for section separation.
      </p>

      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Default Usage</h3>
        <div className='flex flex-wrap gap-4'>
          <GradientDivider />
          <GradientDivider className='w-14 from-transparent via-zinc-500 to-transparent' />
        </div>
      </div>

      <div className='text-sm text-gray-500'>
        <p>Props:</p>
        <ul className='list-inside list-disc'>
          <li>className: string (optional custom Tailwind classes)</li>
        </ul>
      </div>
    </section>
  );
}
