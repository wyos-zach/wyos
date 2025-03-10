'use client';
import { SearchBar } from '@/components/design-system/molecules/SearchBar';
import { useDebounce } from '@/lib/hooks/shared/useDebounce';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import * as React from 'react';

export function SearchBarSection() {
  const [searchValue, setSearchValue] = React.useState('');
  const debouncedValue = useDebounce(searchValue, 300);
  const searchBarRef = React.useRef<HTMLInputElement>(null);

  const items = [
    'Productivity Tips',
    'Mindfulness Guide',
    'Habit Tracker',
    'Goal Setting',
    'Time Management',
  ];

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(debouncedValue.toLowerCase())
  );

  return (
    <section className='space-y-4'>
      <h2 className='text-2xl font-semibold text-foreground'>SearchBar</h2>
      <p className='text-muted-foreground'>
        A sleek, premium search bar with glassmorphic styling and subtle focus
        animations.
      </p>
      <div className='space-y-4 rounded-lg border border-zinc-700/20 bg-background p-4'>
        <SearchBar
          value={searchValue}
          onChange={setSearchValue}
          placeholder='Search items...'
          ref={searchBarRef}
        />
        <ul className='space-y-2'>
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <motion.li
                key={index}
                className={cn(
                  'rounded-lg border border-zinc-700/30 bg-zinc-900/40 p-3 backdrop-blur-md',
                  'text-sm font-medium text-zinc-100 shadow-sm',
                  'bg-gradient-to-r from-zinc-900/50 to-zinc-800/50',
                  'transition-all duration-200 hover:bg-zinc-800/60'
                )}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0 0 8px rgba(59,130,246,0.1)',
                }}
              >
                {item}
              </motion.li>
            ))
          ) : (
            <li
              className={cn(
                'rounded-lg border border-zinc-700/30 bg-zinc-900/40 p-3 backdrop-blur-md',
                'text-sm font-medium text-muted-foreground shadow-sm'
              )}
            >
              No results found
            </li>
          )}
        </ul>
      </div>
      <div className='text-sm text-muted-foreground'>
        <p>
          <strong>Props:</strong>
        </p>
        <ul className='list-disc pl-5'>
          <li>
            <code>value</code>: Current search value
          </li>
          <li>
            <code>onChange</code>: Handler for value changes
          </li>
          <li>
            <code>placeholder</code>: Optional placeholder text
          </li>
        </ul>
        <p>
          <strong>States:</strong> Normal (neutral), Focused (glow effect)
        </p>
      </div>
    </section>
  );
}
