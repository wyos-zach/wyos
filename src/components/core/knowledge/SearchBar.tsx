'use client';
import { useDebounce } from '@/lib/hooks/shared/useDebounce';
import { Input } from '@/components/ui/input';
import { Search, X, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useKnowledgeStore } from '@/store/useKnowledgeStore';

export const SearchBar = () => {
  const [localQuery, setLocalQuery] = useState('');
  const debouncedQuery = useDebounce(localQuery, 300);
  const { setSearchQuery, isFetching } = useKnowledgeStore();

  useEffect(() => {
    setSearchQuery(debouncedQuery);
  }, [debouncedQuery, setSearchQuery]);

  return (
    <div className='relative w-full max-w-md'>
      <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2' />
      <Input
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        placeholder='Search knowledge base...'
        className='pl-9 pr-12'
      />
      {localQuery && (
        <button
          onClick={() => setLocalQuery('')}
          className='absolute right-3 top-1/2 -translate-y-1/2'
          aria-label='Clear search'
        >
          {isFetching ? (
            <Loader2 className='h-4 w-4 animate-spin' />
          ) : (
            <X className='h-4 w-4' />
          )}
        </button>
      )}
    </div>
  );
};
