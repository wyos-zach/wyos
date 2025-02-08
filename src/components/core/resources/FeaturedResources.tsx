'use client';

import { useQuery } from '@tanstack/react-query';
import { ResourceCard } from './ResourceCard';
import { Skeleton } from '@/components/ui/skeleton';
import { ResourceService } from '@/models/server/resources';
import type { ResourceEntry } from '@/types/core/resources/entry';

export const FeaturedResources = () => {
  const { data, isLoading, error } = useQuery<ResourceEntry[]>({
    queryKey: ['resources', 'featured'],
    queryFn: () => ResourceService.listFeaturedEntries(3),
  });

  if (isLoading) {
    return (
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className='h-64 w-full rounded-xl' />
        ))}
      </div>
    );
  }

  if (error) {
    return <p className='text-red-500'>Failed to load featured content.</p>;
  }

  return (
    <section className='space-y-6'>
      <h2 className='text-2xl font-bold'>Featured Resources</h2>
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {data?.map((entry) => <ResourceCard key={entry.$id} entry={entry} />)}
      </div>
    </section>
  );
};
