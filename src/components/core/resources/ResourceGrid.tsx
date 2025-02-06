'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { ResourceCard } from './ResourceCard';
import { ResourceCategoryCard } from './ResourceCategoryCard';
import { Skeleton } from '@/components/ui/skeleton';
import { ResourceService } from '@/models/server/resources';
import type { ResourceCategory } from '@/types/core/resources/category';
import type { ResourceEntry } from '@/types/core/resources/entry';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { InfiniteGrid } from '@/components/shared/InfiniteGrid';

interface ResourceGridProps {
  categorySlug?: string;
  initialData?: {
    documents?: ResourceEntry[];
    categories?: ResourceCategory[];
    total?: number;
    hasMore?: boolean;
    nextPage?: number;
  };
  searchQuery?: string;
}

export const ResourceGrid = ({
  initialData,
  categorySlug,
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
    isPending,
  } = useInfiniteQuery({
    queryKey: ['resources', categorySlug, searchQuery],
    queryFn: async ({ pageParam = 1 }) => {
      if (!categorySlug) {
        throw new Error('Category slug is required');
      }
      const response = await ResourceService.listResourceEntries({
        categoryId: categorySlug,
        page: pageParam,
      });
      return {
        documents: response.documents as ResourceEntry[],
        total: response.total,
        hasMore: response.documents.length === 9,
        nextPage: pageParam + 1,
      };
    },
    initialData: initialData?.documents
      ? {
          pages: [initialData],
          pageParams: [1],
        }
      : undefined,
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextPage : undefined,
    enabled: !!categorySlug, // Only run query if categorySlug is provided
  });

  if (isError) {
    return (
      <Alert variant='destructive'>
        <AlertCircle className='h-4 w-4' />
        <AlertDescription>
          {error instanceof Error ? error.message : 'Failed to load resources'}
        </AlertDescription>
      </Alert>
    );
  }

  const entries = data?.pages.flatMap((page) => page.documents) || [];

  if (status === 'success' && entries.length === 0) {
    return (
      <Alert>
        <AlertDescription>
          No resources found {categorySlug ? 'in this category' : ''}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <InfiniteGrid
      hasMore={hasNextPage}
      isFetching={isFetchingNextPage}
      fetchNextAction={() => fetchNextPage()}
    >
      {entries.filter((entry): entry is ResourceEntry => entry !== undefined).map((entry) => (
        <ResourceCard key={entry.$id} entry={entry} />
      ))}
    </InfiniteGrid>
  );
};
