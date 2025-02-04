'use client';

import { useQuery } from '@tanstack/react-query';
import { KnowledgeService } from '@/models/server/knowledge';
import { KnowledgeCategoryCard } from '@/components/core/knowledge/KnowledgeCategoryCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useKnowledgeStore } from '@/store/useKnowledgeStore';

export const KnowledgeCategoryGrid = () => {
  const { data, isPending } = useQuery({
    queryKey: ['knowledge', 'categories'],
    queryFn: () => KnowledgeService.getKnowledgeCategories(),
    staleTime: 60 * 1000,
  });

  const { selectedCategory } = useKnowledgeStore();

  // If a category is selected, only display that one; otherwise show all.
  const filteredCategories = selectedCategory
    ? data?.filter((category) => category.$id === selectedCategory)
    : data;

  if (isPending) {
    return (
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className='h-64 w-full rounded-xl' />
        ))}
      </div>
    );
  }

  if (!filteredCategories || filteredCategories.length === 0) {
    return (
      <p className='text-center text-muted-foreground'>
        No knowledge categories found.
      </p>
    );
  }

  return (
    <section>
      <h2 className='sr-only'>Knowledge Categories</h2>
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {filteredCategories.map((category) => (
          <KnowledgeCategoryCard
            key={category.$id}
            category={category}
            className='transition-shadow hover:shadow-lg'
          />
        ))}
      </div>
    </section>
  );
};
