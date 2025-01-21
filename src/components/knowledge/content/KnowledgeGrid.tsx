'use client';

import { useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { KnowledgeCard } from './KnowledgeCard';
import { knowledgeApi } from '@/lib/services/appwrite/api';
import { Skeleton } from '@/components/ui/skeleton';

interface KnowledgeGridProps {
  categoryId?: string;
  searchQuery?: string;
}

export function KnowledgeGrid({ categoryId, searchQuery }: KnowledgeGridProps) {
  const observerRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
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
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (status === 'pending') {
    return (
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className='h-[300px] w-full rounded-lg' />
        ))}
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className='text-center text-muted-foreground'>
        Failed to load content
      </div>
    );
  }

  return (
    <div className='space-y-8'>
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {data?.pages.map((page) =>
          page.entries.map((entry) => (
            <KnowledgeCard
              key={entry.id}
              title={entry.title}
              summary={entry.summary}
              categoryId={entry.categoryId}
              metadata={entry.metadata}
            />
          ))
        )}
      </div>
      <div ref={observerRef} className='h-8' />
    </div>
  );
}
