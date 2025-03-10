'use client';

import { Skeleton } from '@/components/design-system/atoms/skeleton';
import { ResourceCategoryCard } from '@/components/z/resources/ResourceCategoryCard';
import { ResourceService } from '@/models/server/resources';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

export const ResourceCategoryGrid = () => {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get('category');

  const { data, isPending, error } = useQuery({
    queryKey: ['resources', 'categories', categorySlug],
    queryFn: async () => {
      try {
        if (categorySlug) {
          // Get main category first
          const mainCategory =
            await ResourceService.getMainCategoryBySlug(categorySlug);

          // Then get its subcategories
          return ResourceService.getSubcategories(mainCategory.$id);
        } else {
          // If no category selected, get all resource categories
          return ResourceService.getResourceCategories();
        }
      } catch (err) {
        console.error('Error in ResourceCategoryGrid:', err);
        throw err;
      }
    },
    staleTime: 60 * 1000,
  });

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
    return (
      <p className='text-center text-muted-foreground'>
        No resource categories found {categorySlug ? `for ${categorySlug}` : ''}
        .
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
