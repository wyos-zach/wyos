'use client';

import { useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { KnowledgeCard } from './KnowledgeCard';
import { knowledgeApi } from '@/models/server/api';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface KnowledgeGridProps {
  categoryId?: string;
  searchQuery?: string;
}

export function KnowledgeGrid({ categoryId, searchQuery }: KnowledgeGridProps) {
  const observerRef = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    isRefetching,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['knowledge', categoryId, searchQuery],
    queryFn: ({ pageParam = 0 }) =>
      knowledgeApi.fetchKnowledgeEntries({
        categoryId,
        searchQuery,
        page: pageParam,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextPage : undefined,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          void fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    const currentObserver = observerRef.current;
    if (currentObserver) {
      observer.observe(currentObserver);
    }

    return () => {
      if (currentObserver) {
        observer.disconnect();
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (status === 'pending') {
    return <KnowledgeGridSkeleton />;
  }

  if (status === 'error') {
    return (
      <div className='flex flex-col items-center justify-center gap-4 py-12 text-center'>
        <AlertCircle className='h-12 w-12 text-destructive' />
        <div className='space-y-2'>
          <p className='text-lg font-semibold'>Failed to load content</p>
          <p className='text-sm text-muted-foreground'>{error.message}</p>
        </div>
        <Button onClick={() => refetch()} variant='outline'>
          Try again
        </Button>
      </div>
    );
  }

  const entries = data?.pages.flatMap((page) => page.entries) ?? [];
  const isEmpty = entries.length === 0;

  if (isEmpty) {
    return (
      <div className='flex flex-col items-center justify-center gap-4 py-12 text-center'>
        <p className='text-lg font-semibold'>No entries found</p>
        <p className='text-sm text-muted-foreground'>
          {searchQuery
            ? 'Try adjusting your search terms'
            : 'Check back later for new content'}
        </p>
      </div>
    );
  }

  return (
    <div className='space-y-8'>
      <div className='relative'>
        {isRefetching && (
          <div className='absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm'>
            <Loader2 className='h-8 w-8 animate-spin' />
          </div>
        )}
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {entries.map((entry) => (
            <KnowledgeCard
              key={entry.id}
              title={entry.title}
              summary={entry.summary}
              categoryId={entry.categoryId}
              metadata={entry.metadata}
            />
          ))}
        </div>
      </div>
      {hasNextPage && (
        <div ref={observerRef} className='flex justify-center py-8'>
          {isFetchingNextPage && (
            <Loader2 className='h-6 w-6 animate-spin text-muted-foreground' />
          )}
        </div>
      )}
    </div>
  );
}

function KnowledgeGridSkeleton() {
  return (
    <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      {[...Array(6)].map((_, i) => (
        <Skeleton key={i} className='h-[300px] w-full rounded-lg' />
      ))}
    </div>
  );
}
