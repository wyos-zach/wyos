'use client';
import * as React from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/atoms/button'; // Your Button
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/ui/molecules/dropdown';
import { SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterBarProps {
  filters: FilterOption[]; // e.g., [{ label: "Books", value: "books" }]
  activeFilters: string[]; // e.g., ["books", "4-stars"]
  sortBy: string | null; // e.g., "name", "date"
  onFilterChangeAction: (updates: {
    activeFilters?: string[];
    sortBy?: string | null;
  }) => void;
  className?: string;
}

export const FilterBar = ({
  filters,
  activeFilters,
  sortBy,
  onFilterChangeAction,
  className,
}: FilterBarProps) => {
  const [open, setOpen] = React.useState(false);

  const handleFilterToggle = (value: string) => {
    const newFilters = activeFilters.includes(value)
      ? activeFilters.filter((f) => f !== value)
      : [...activeFilters, value];
    onFilterChangeAction({ activeFilters: newFilters });
  };

  const handleSortChange = (newSortBy: string) => {
    onFilterChangeAction({ sortBy: newSortBy === sortBy ? null : newSortBy });
  };

  const sortOptions = [
    { label: 'Name (A-Z)', value: 'name' },
    { label: 'Date (Newest)', value: 'date' },
  ];

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant='hoverGlow' // Premium variant from your Button
          size='sm'
          className={cn(
            'gap-2 rounded-lg border-zinc-700/30 bg-zinc-900/40 text-zinc-100 backdrop-blur-md',
            'hover:bg-zinc-800/60',
            activeFilters.length > 0 &&
              'border-primary/40 bg-gradient-to-b from-primary/20 to-primary/10',
            className
          )}
        >
          <SlidersHorizontal className='h-4 w-4' />
          Filters{' '}
          {activeFilters.length > 0 && (
            <span className='ml-1 text-xs text-primary'>
              ({activeFilters.length})
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: open ? 1 : 0, scale: open ? 1 : 0.95 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <DropdownMenuContent
          align='end'
          className='w-56 border-zinc-700/30 bg-zinc-900/60 text-zinc-100 shadow-lg backdrop-blur-md'
        >
          <DropdownMenuLabel className='text-zinc-200'>
            Filter by
          </DropdownMenuLabel>
          <DropdownMenuSeparator className='bg-zinc-700/50' />
          {filters.map((filter) => (
            <DropdownMenuCheckboxItem
              key={filter.value}
              checked={activeFilters.includes(filter.value)}
              onCheckedChange={() => handleFilterToggle(filter.value)}
              className='text-sm text-zinc-200 hover:bg-zinc-800/50 focus:bg-zinc-800/50'
            >
              <motion.span
                animate={{
                  scale: activeFilters.includes(filter.value) ? 1.05 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                {filter.label}
              </motion.span>
            </DropdownMenuCheckboxItem>
          ))}
          <DropdownMenuSeparator className='bg-zinc-700/50' />
          <DropdownMenuLabel className='text-zinc-200'>
            Sort by
          </DropdownMenuLabel>
          {sortOptions.map((option) => (
            <DropdownMenuCheckboxItem
              key={option.value}
              checked={sortBy === option.value}
              onCheckedChange={() => handleSortChange(option.value)}
              className='text-sm text-zinc-200 hover:bg-zinc-800/50 focus:bg-zinc-800/50'
            >
              <motion.span
                animate={{ scale: sortBy === option.value ? 1.05 : 1 }}
                transition={{ duration: 0.2 }}
              >
                {option.label}
              </motion.span>
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </motion.div>
    </DropdownMenu>
  );
};

FilterBar.displayName = 'FilterBar';
