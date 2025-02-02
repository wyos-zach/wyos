'use client';
import { useQuery } from '@tanstack/react-query';
import { KnowledgeService } from '@/models/server/knowledge';
import { KnowledgeCategoryCard } from '@/components/core/knowledge/KnowledgeCategoryCard';
import { Skeleton } from '@/components/ui/skeleton';

export const KnowledgeCategoryGrid = () => {
  const { data, isPending } = useQuery({
    queryKey: ['knowledge', 'categories'],
    queryFn: () => KnowledgeService.getMainCategories(),
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

  return (
    <section>
      <h2 className='sr-only'>Knowledge Categories</h2>
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {data?.map((category) => (
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
