'use client';

import { useQuery } from '@tanstack/react-query';
import { ResourceCategoryCard } from './ResourceCategoryCard';
import { Skeleton } from '@/components/ui/skeleton';
import { ResourceService } from '@/models/server/resources';
import type { ResourceCategory } from '@/types/core/resources/category';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

interface ResourceGridProps {
  initialData?: {
    categories: ResourceCategory[];
  };
  searchQuery?: string;
}

export const ResourceGrid = ({
  initialData,
  searchQuery,
}: ResourceGridProps) => {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get('category');

  const {
    data: categories,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['resources', 'categories', categorySlug],
    queryFn: async () => {
      if (categorySlug) {
        // Get main category first
        const mainCategory = await ResourceService.getMainCategoryBySlug(categorySlug);
        // Then get its subcategories
        return ResourceService.getSubcategories(mainCategory.$id);
      } else {
        // If no category selected, get all resource categories
        return ResourceService.getResourceCategories();
      }
    },
  });

  if (isError) {
    return (
      <Alert variant='destructive'>
        <AlertCircle className='h-4 w-4' />
        <AlertDescription>
          {error instanceof Error ? error.message : 'Failed to load resource categories'}
        </AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className='h-[300px] w-full rounded-lg' />
        ))}
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <Alert>
        <AlertDescription>
          No resource categories found {categorySlug ? `in ${categorySlug}` : ''}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      {categories.map((category) => (
        <ResourceCategoryCard key={category.$id} category={category} />
      ))}
    </div>
  );
};
