'use client';
import {
  FilterBar,
  type FilterOption,
} from '@/components/design-system/molecules/FilterBar';
import * as React from 'react';

export function FilterBarSection() {
  const [activeFilters, setActiveFilters] = React.useState<string[]>([]);
  const [sortBy, setSortBy] = React.useState<string | null>(null);

  const demoFilters: FilterOption[] = [
    { label: 'Books', value: 'books' },
    { label: 'Apps', value: 'apps' },
    { label: '4+ Stars', value: '4-stars' },
    { label: 'Free', value: 'free' },
  ];

  const handleFilterChange = (updates: {
    activeFilters?: string[];
    sortBy?: string | null;
  }) => {
    if (updates.activeFilters !== undefined)
      setActiveFilters(updates.activeFilters);
    if (updates.sortBy !== undefined) setSortBy(updates.sortBy);
  };

  return (
    <section className='space-y-4'>
      <h2 className='text-2xl font-semibold text-foreground'>FilterBar</h2>
      <p className='text-muted-foreground'>
        A premium filter component with glassmorphic dropdown and Motion toggles
        for filtering and sorting content.
      </p>
      <div className='rounded-lg border border-zinc-700/20 bg-background p-4'>
        <FilterBar
          filters={demoFilters}
          activeFilters={activeFilters}
          sortBy={sortBy}
          onFilterChangeAction={handleFilterChange}
        />
      </div>
      <div className='text-sm text-muted-foreground'>
        <p>
          <strong>Props:</strong>
        </p>
        <ul className='list-disc pl-5'>
          <li>
            <code>filters</code>: Array of filter options (label, value)
          </li>
          <li>
            <code>activeFilters</code>: Array of active filter values
          </li>
          <li>
            <code>sortBy</code>: Current sort option (or null)
          </li>
          <li>
            <code>onFilterChange</code>: Callback for filter/sort updates
          </li>
        </ul>
        <p>
          <strong>States:</strong> Active filters shown with toggles and Motion
          scaling
        </p>
      </div>
    </section>
  );
}
