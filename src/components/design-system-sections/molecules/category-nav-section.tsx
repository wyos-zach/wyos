'use client';
import { CategoryNav } from '@/components/design-system/molecules/CategoryNav';
import * as React from 'react';

export function CategoryNavSection() {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null
  );

  const demoCategories = [
    { id: '1', name: 'Habits', slug: 'habits' },
    { id: '2', name: 'Mindset', slug: 'mindset' },
    { id: '3', name: 'Productivity', slug: 'productivity' },
    { id: '4', name: 'Growth', slug: 'growth' },
  ];

  return (
    <section className='space-y-4'>
      <h2 className='text-2xl font-semibold text-foreground'>CategoryNav</h2>
      <p className='text-muted-foreground'>
        A navigation component for selecting categories with a premium
        glassmorphic design and Motion highlight. Used for filtering content
        like Knowledge or Resources.
      </p>
      <div className='rounded-lg border border-zinc-700/20 bg-background p-4'>
        <CategoryNav
          categories={demoCategories}
          selectedCategory={selectedCategory}
          onSelectAction={setSelectedCategory}
        />
      </div>
      <div className='text-sm text-muted-foreground'>
        <p>
          <strong>Props:</strong>
        </p>
        <ul className='list-disc pl-5'>
          <li>
            <code>categories</code>: Array of category objects (id, name, slug)
          </li>
          <li>
            <code>selectedCategory</code>: Currently selected category slug (or
            null)
          </li>
          <li>
            <code>onSelect</code>: Function to handle category selection
          </li>
        </ul>
        <p>
          <strong>States:</strong> Selected (highlighted with gradient),
          Unselected (neutral glass effect)
        </p>
      </div>
    </section>
  );
}
