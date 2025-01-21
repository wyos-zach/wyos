'use client';

import { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/use-debounce';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  isLoading?: boolean;
}

export function SearchBar({
  onSearch,
  placeholder = 'Search knowledge...',
  isLoading = false,
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedValue = useDebounce(searchQuery, 300);

  useEffect(() => {
    onSearch?.(debouncedValue);
  }, [debouncedValue, onSearch]);

  const handleClear = () => {
    setSearchQuery('');
    onSearch?.('');
  };

  return (
    <div className='relative w-full max-w-md'>
      <Search
        className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground'
        aria-hidden='true'
      />
      <Input
        type='search'
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className='pl-9 pr-12'
        disabled={isLoading}
        aria-label='Search knowledge base'
        role='searchbox'
      />
      {searchQuery && (
        <Button
          variant='ghost'
          size='sm'
          className='absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 p-0'
          onClick={handleClear}
          disabled={isLoading}
          aria-label='Clear search'
        >
          <X className='h-4 w-4' />
        </Button>
      )}
      {isLoading && (
        <div className='absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2'>
          <div className='h-full w-full animate-spin rounded-full border-2 border-muted-foreground/20 border-t-muted-foreground' />
        </div>
      )}
    </div>
  );
}
