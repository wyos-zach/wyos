'use client';

import { useInfiniteQuery, UseInfiniteQueryResult } from '@tanstack/react-query';
import { ResourceCard } from './ResourceCard';
import { Skeleton } from '@/components/ui/skeleton';
import { InfiniteGrid } from '@/components/shared/InfiniteGrid';
import { ResourceService } from '@/models/server/resources';
import type { ResourceEntry } from '@/types/core/resources/entry';

interface ResourceGridProps {
  categorySlug?: string;
  initialData?: {
    documents: ResourceEntry[];
    total: number;
    hasMore: boolean;
    nextPage: number;
  };
  searchQuery?: string;
}

export const ResourceGrid = ({
  categorySlug,
  initialData,
  searchQuery,
}: ResourceGridProps) => {
  const {
    data,
    error,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    status,
    refetch,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['resources', categorySlug, searchQuery],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await ResourceService.listResourceEntries({
        categoryId: categorySlug,
        searchQuery,
        page: pageParam,
      });
      const mappedDocuments = response.documents.map((doc) => ({
        ...doc,
      }));
      return {
        documents: mappedDocuments,
        total: response.total,
        hasMore: response.hasMore,
        nextPage: pageParam + 1,
      };
    },
    initialData: initialData ? { pages: [initialData], pageParams: [1] } : undefined,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextPage : undefined,
  });

  const entries = data?.pages.flatMap((page) => page.documents) || [];

  // Show loading state
  if (isLoading) {
    return (
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className='h-64 w-full rounded-xl' />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className='mt-8 text-center'>
        <p className='text-red-500'>
          Error loading entries: {(error as Error).message}
        </p>
        <button
          onClick={() => refetch()}
          className='rounded bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90'
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <InfiniteGrid
      hasMore={hasNextPage}
      isFetching={isFetchingNextPage}
      fetchNextAction={fetchNextPage}
    >
      {entries.map((entry: ResourceEntry) => (
        <ResourceCard key={entry.$id} entry={entry} />
      ))}
    </InfiniteGrid>
  );
};
import type page from '@/app/(marketing)/page';
import pages from 'next/dist/build/templates/pages';
