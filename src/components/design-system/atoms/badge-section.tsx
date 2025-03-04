import React from 'react';
import { Badge } from '@/components/ui/badge';

export function BadgeSection() {
  return (
    <section className='space-y-6 px-6'>
      <h2 className='font-heading text-2xl font-bold'>Badge</h2>
      <p className='text-muted-foreground'>
        Badges are used to highlight statuses, labels, or categories.
      </p>

      <div className='flex flex-wrap gap-4'>
        <Badge variant='default'>Default</Badge>
        <Badge variant='secondary'>Secondary</Badge>
        <Badge variant='destructive'>Destructive</Badge>
        <Badge variant='outline'>Outline</Badge>
      </div>

      <div className='text-sm text-gray-500'>
        <p>Props:</p>
        <ul className='list-inside list-disc'>
          <li>variant: "default" | "secondary" | "destructive" | "outline"</li>
          <li>className: string (optional)</li>
          <li>children: ReactNode</li>
        </ul>
      </div>
    </section>
  );
}
