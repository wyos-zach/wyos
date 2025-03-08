'use client';

import { CardImage } from '@/components/ui/atoms/CardImage';
import { EntryCardContent } from '@/components/ui/molecules/EntryCardContent';
import { EntryCard } from '@/components/ui/organisms/EntryCard';
import type { KnowledgeEntry } from '@/types/core/knowledge/entry';

const mockEntry: KnowledgeEntry = {
  $id: 'mock-entry-1',
  title: 'Mindset',
  summary: 'A comprehensive guide to building a growth mindset.',
  content: 'Full content of the mindfulness guide would go here.',
  type: 'Article',
  imageUrl: '/images/placeholder.png',
  slug: 'mindset',
  categoryId: 'personal-development',
  categorySlug: 'personal-development',
  featured: true,
  $createdAt: new Date().toISOString(),
  $updatedAt: new Date().toISOString(),
  $permissions: [],
};

export function EntryCardSection() {
  return (
    <section className='space-y-6 bg-background px-6 py-12'>
      <h2 className='gradient-text font-heading text-3xl font-bold'>
        Entry Card
      </h2>
      <p className='max-w-prose text-muted-foreground'>
        A premium card for displaying entries in Knowledge and Resources
        sections, reusing the CategoryCard design system with added date.
      </p>

      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Default State</h3>
        <div className='flex flex-wrap gap-6'>
          <EntryCard entry={mockEntry} className='w-full max-w-sm' />
        </div>
      </div>

      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Hover State</h3>
        <p className='text-sm text-muted-foreground'>
          Subtle scale and shadow lift on hover for a refined interaction.
        </p>
        <div className='flex flex-wrap gap-6'>
          <EntryCard entry={mockEntry} className='w-full max-w-sm' />
        </div>
      </div>

      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Without Image</h3>
        <div className='flex flex-wrap gap-6'>
          <EntryCard
            entry={{
              ...mockEntry,
              imageUrl: undefined,
            }}
            className='w-full max-w-sm'
          />
        </div>
      </div>

      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Custom Styling</h3>
        <p className='text-sm text-muted-foreground'>
          Use the `className` prop to apply custom styles.
        </p>
        <div className='flex flex-wrap gap-6'>
          <EntryCard
            entry={mockEntry}
            className='w-full max-w-sm border-2 border-primary/30'
          />
        </div>
      </div>

      <div className='text-sm text-gray-500'>
        <p>Props:</p>
        <ul className='list-inside list-disc'>
          <li>entry: `KnowledgeEntry | ResourceEntry`</li>
          <li>className?: string (custom Tailwind classes)</li>
        </ul>
      </div>

      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Atomic Breakdown</h3>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <div>
            <h4 className='font-semibold'>CardImage</h4>
            <CardImage
              imageUrl={mockEntry.imageUrl}
              alt={`Cover image for ${mockEntry.title}`}
            />
          </div>
          <div>
            <h4 className='font-semibold'>CardContent</h4>
            <EntryCardContent
              date={mockEntry.$createdAt}
              title={mockEntry.title}
              summary={mockEntry.summary}
              type='knowledge'
            />
          </div>
        </div>
      </div>
    </section>
  );
}
