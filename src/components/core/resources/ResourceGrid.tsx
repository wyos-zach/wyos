'use client';

import { useQuery } from '@tanstack/react-query';
import { ResourceService } from '@/models/server/resources';
import { ResourceCard } from './ResourceCard';
import { Skeleton } from '@/components/ui/skeleton';
import type { ResourceEntry } from '@/types/core/resources/entry';

interface ResourceGridProps {
  initialData?: {
    documents: ResourceEntry[];
    total: number;
    hasMore: boolean;
    nextPage: number;
  };
  searchQuery?: string;
}

export function ResourceGrid({ initialData, searchQuery }: ResourceGridProps) {
  const {
    data: resources,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['resources', 'entries', searchQuery],
    queryFn: () => ResourceService.listResourceEntries({}),
    initialData,
  });

  if (isLoading) {
    return (
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className='h-48 rounded-lg' />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-center'>
        <p className='text-destructive'>Failed to load resources</p>
      </div>
    );
  }

  if (!resources?.documents.length) {
    return (
      <div className='text-center'>
        <p className='text-muted-foreground'>No resources found</p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      {resources.documents.map((resource: ResourceEntry) => (
        <ResourceCard key={resource.$id} entry={resource} />
      ))}
    </div>
  );
}
