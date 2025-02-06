'use client';

import { useQuery } from '@tanstack/react-query';
import { ResourceService } from '@/models/server/resources';
import { ResourceCategoryCard } from '@/components/core/resources/ResourceCategoryCard';
import { Skeleton } from '@/components/ui/skeleton';

export const ResourceCategoryGrid = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ['resources', 'categories'],
    queryFn: async () => {
      try {
        console.log('Fetching resource categories...');
        const categories = await ResourceService.getResourceCategories();
        console.log('Categories fetched:', categories);
        return categories;
      } catch (err) {
        console.error('Error in ResourceCategoryGrid:', err);
        throw err;
      }
    },
    staleTime: 60 * 1000,
  });

  console.log('Query state:', { isPending, error, dataLength: data?.length });

  if (isPending) {
    return (
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className='h-64 w-full rounded-xl' />
        ))}
      </div>
    );
  }

  if (error) {
    console.error('ResourceCategoryGrid error:', error);
    return (
      <p className='text-center text-red-500'>
        Error loading resource categories. Please try again later.
      </p>
    );
  }

  if (!data || data.length === 0) {
    console.log('No categories found. Data:', data);
    return (
      <p className='text-center text-muted-foreground'>
        No resource categories found.
      </p>
    );
  }

  return (
    <section>
      <h2 className='sr-only'>Resource Categories</h2>
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {data.map((category) => (
          <ResourceCategoryCard
            key={category.$id}
            category={category}
            className='transition-shadow hover:shadow-lg'
          />
        ))}
      </div>
    </section>
  );
};
