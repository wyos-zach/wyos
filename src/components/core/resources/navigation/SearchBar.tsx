'use client';

import { useEffect, useState } from 'react';
import { useDebounce } from '@/lib/hooks/shared/useDebounce';
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
  placeholder = 'Search resources...',
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
        aria-label='Search resources'
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
    </div>
  );
}
