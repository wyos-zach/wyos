'use client';
import * as React from 'react';
import { motion } from 'motion/react';
import { Input } from '@/components/ui/atoms/input';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ value, onChange, placeholder = 'Search...', className }, ref) => {
    const handleClear = () => onChange('');

    return (
      <motion.div
        className={cn(
          'relative flex w-full max-w-md items-center rounded-lg border border-zinc-700/40 bg-gradient-to-b from-zinc-900/50 to-zinc-800/50 shadow-sm backdrop-blur-md',
          className
        )}
        initial={{ opacity: 0.9 }}
        whileFocus={{ opacity: 1, boxShadow: '0 0 12px rgba(59,130,246,0.3)' }}
        transition={{ duration: 0.2 }}
      >
        <Search className='absolute left-3 h-4 w-4 text-zinc-300' />
        <Input
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className='h-10 border-none bg-transparent pl-9 pr-12 text-zinc-100 placeholder:text-zinc-400 focus-visible:ring-0'
          aria-label='Search'
        />
        {value && (
          <button
            onClick={handleClear}
            className='absolute right-3 flex h-6 w-6 items-center justify-center text-zinc-300 hover:text-white'
            aria-label='Clear search'
          >
            <X className='h-4 w-4' />
          </button>
        )}
      </motion.div>
    );
  }
);

SearchBar.displayName = 'SearchBar';
