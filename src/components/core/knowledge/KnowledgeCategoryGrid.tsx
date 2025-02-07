'use client';

import { useQuery } from '@tanstack/react-query';
import { KnowledgeService } from '@/models/server/knowledge';
import { KnowledgeCategoryCard } from '@/components/core/knowledge/KnowledgeCategoryCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useSearchParams } from 'next/navigation';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useKnowledgeStore } from '@/store/useKnowledgeStore';
import { useEffect } from 'react';

export const KnowledgeCategoryGrid = () => {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get('category');
  const setIsFetching = useKnowledgeStore((state) => state.setIsFetching);

  const {
    data: categories,
    isPending,
    error,
    isError,
  } = useQuery({
    queryKey: ['knowledge', 'categories', categorySlug],
    queryFn: async () => {
      try {
        if (categorySlug) {
          // Get main category first
          const mainCategory =
            await KnowledgeService.getMainCategoryBySlug(categorySlug);

          // Then get its subcategories
          return KnowledgeService.getSubcategories(mainCategory.$id);
        } else {
          // If no category selected, get all knowledge categories
          return KnowledgeService.getKnowledgeCategories();
        }
      } catch (err) {
        console.error('Error in KnowledgeCategoryGrid:', err);
        throw err;
      }
    },
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
          {error instanceof Error
            ? error.message
            : 'Failed to load knowledge categories'}
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

  if (!categories?.length) {
    return (
      <Alert>
        <AlertDescription>No knowledge categories found</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      {categories.map((category) => (
        <KnowledgeCategoryCard key={category.$id} category={category} />
      ))}
    </div>
  );
};
