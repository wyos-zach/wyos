'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { ResourceCard } from './ResourceCard';
import { Skeleton } from '@/components/ui/skeleton';
import { InfiniteGrid } from '@/components/shared/InfiniteGrid';
import { ResourceService } from '@/models/server/resources';
import type { ResourceEntry } from '@/types/core/resources/entry';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

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
    queryKey: ['resources', 'entries', categorySlug, searchQuery],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await ResourceService.listResourceEntries({
        categoryId: categorySlug,
        searchQuery,
        page: pageParam,
      });
      return {
        documents: response.documents,
        total: response.total,
        hasMore: response.hasMore,
        nextPage: pageParam + 1,
      };
    },
    getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextPage : undefined,
    initialData: initialData ? {
      pages: [initialData],
      pageParams: [1],
    } : undefined,
    initialPageParam: 1,
  });

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {error instanceof Error ? error.message : 'Failed to load resources'}
        </AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-[300px] w-full rounded-lg" />
        ))}
      </div>
    );
  }

  const resources = data?.pages.flatMap((page) => page.documents) ?? [];

  if (resources.length === 0) {
    return (
      <Alert>
        <AlertDescription>
          No resources found {categorySlug ? `in ${categorySlug}` : ''} {searchQuery ? `matching "${searchQuery}"` : ''}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <InfiniteGrid
      hasMore={hasNextPage ?? false}
      isFetching={isFetchingNextPage}
      fetchNextAction={fetchNextPage}
    >
      {resources.map((resource: ResourceEntry) => (
        <ResourceCard key={resource.$id} entry={resource} />
      ))}
    </InfiniteGrid>
  );
};
