'use client';

import { useQuery } from '@tanstack/react-query';
import { ResourceService } from '@/models/server/resources';
import { ResourceCard } from './ResourceCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useSearchParams } from 'next/navigation';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useResourcesStore } from '@/store/useResourcesStore';
import { useEffect } from 'react';
import type { ResourceEntry } from '@/types/core/resources/entry';

interface ResourceGridProps {
  initialData?: {
    documents?: ResourceEntry[];
    total?: number;
    hasMore?: boolean;
    nextPage?: number;
  };
  searchQuery?: string;
}

export const ResourceGrid = ({
  initialData,
  searchQuery,
}: ResourceGridProps) => {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get('category');
  const setIsFetching = useResourcesStore((state) => state.setIsFetching);

  const { data: resources, isPending, error, isError } = useQuery({
    queryKey: ['resources', 'entries', categorySlug, searchQuery],
    queryFn: async () => {
      try {
        console.log('Fetching resource entries for:', categorySlug);
        if (categorySlug) {
          // Get category first
          const category = await ResourceService.getCategoryBySlug(categorySlug);
          console.log('Category found:', category);
          // Then get its entries
          return ResourceService.listResourceEntries({
            categoryId: category.$id,
          });
        } else {
          // If no category selected, get all resources
          return ResourceService.listResourceEntries({});
        }
      } catch (err) {
        console.error('Error in ResourceGrid:', err);
        throw err;
      }
    },
    initialData: initialData?.documents
      ? {
          documents: initialData.documents,
          total: initialData.total,
          hasMore: initialData.hasMore,
          nextPage: initialData.nextPage,
        }
      : undefined,
  });

  // Update isFetching state in store
  useEffect(() => {
    setIsFetching(isPending);
  }, [isPending, setIsFetching]);

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

  if (isPending) {
    return (
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className='h-64 w-full rounded-xl' />
        ))}
      </div>
    );
  }

  if (!resources?.documents.length) {
    return (
      <Alert>
        <AlertDescription>
          No resources found {categorySlug ? 'in this category' : ''}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      {resources.documents.map((resource) => (
        <ResourceCard key={resource.$id} entry={resource} />
      ))}
    </div>
  );
};
