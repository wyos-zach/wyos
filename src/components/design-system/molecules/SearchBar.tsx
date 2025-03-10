'use client';

import { Input } from '@/components/design-system/atoms/input';
import { useDebounce } from '@/lib/hooks/shared/useDebounce';
import { cn } from '@/lib/utils';
import { useContentStore } from '@/store/useContentStore';
import { Search, X } from 'lucide-react';
import { motion } from 'motion/react';
import * as React from 'react';

export interface SearchBarProps {
  section?: 'knowledge' | 'resources';
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ section, placeholder = 'Search...', className, value, onChange }, ref) => {
    const [query, setQuery] = React.useState(value || '');
    const debouncedQuery = useDebounce(query, 300);
    const setSearchQuery = useContentStore((state) => state.setSearchQuery);

    React.useEffect(() => {
      if (section) {
        setSearchQuery(section, debouncedQuery);
      }
    }, [debouncedQuery, section, setSearchQuery]);

    const handleClear = () => {
      setQuery('');
      if (onChange) {
        onChange('');
      }
      if (section) {
        setSearchQuery(section, '');
      }
    };

    return (
      <motion.div
        className={cn(
          'glass-effect relative flex w-full max-w-md items-center rounded-xl border border-border/20 bg-card/40 p-1 shadow-md backdrop-blur-md transition-shadow duration-200 hover:shadow-lg',
          className
        )}
        initial={{ opacity: 0.9, scale: 0.98 }}
        whileFocus={{
          opacity: 1,
          scale: 1,
          boxShadow: '0 0 15px rgba(59,130,246,0.2)',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <Search className='absolute left-4 h-5 w-5 text-muted-foreground' />
        <Input
          ref={ref}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (onChange) {
              onChange(e.target.value);
            }
          }}
          placeholder={placeholder}
          className='h-12 w-full border-none bg-transparent pl-12 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-0'
          aria-label='Search'
        />
        {query && (
          <button
            onClick={handleClear}
            className='absolute right-4 flex h-6 w-6 items-center justify-center text-muted-foreground transition-colors duration-200 hover:text-foreground'
            aria-label='Clear search'
          >
            <X className='h-5 w-5' />
          </button>
        )}
      </motion.div>
    );
  }
);

SearchBar.displayName = 'SearchBar';

export default SearchBar;
