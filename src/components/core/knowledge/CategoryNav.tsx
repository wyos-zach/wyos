'use client';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useKnowledgeStore } from '@/store/useKnowledgeStore';
import { KnowledgeService } from '@/models/server/knowledge';
import type { KnowledgeCategory } from '@/types/core/knowledge';

export const CategoryNav = () => {
  const { selectedCategory, setCategory } = useKnowledgeStore();

  // Fixed query function with proper typing
  const { data, isPending, isError, refetch } = useQuery<KnowledgeCategory[]>({
    queryKey: ['knowledge', 'categories'],
    queryFn: async () => {
      const response = await KnowledgeService.getMainCategories();
      return response;
    },
  });

  if (isPending) {
    return (
      <div className='flex gap-2 pb-4'>
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className='h-10 w-24 rounded-md' />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className='pb-4 text-destructive'>
        Failed to load categories.{' '}
        <Button
          variant='link'
          className='h-auto p-0 text-destructive'
          onClick={() => refetch()}
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <nav className='flex gap-2 overflow-x-auto pb-4'>
      <Button
        variant={!selectedCategory ? 'default' : 'outline'}
        onClick={() => setCategory(null)}
      >
        All
      </Button>
      {/* Fixed data mapping - removed .documents */}
      {data?.map((category) => (
        <Button
          key={category.$id}
          variant={selectedCategory === category.$id ? 'default' : 'outline'}
          onClick={() => setCategory(category.$id)}
        >
          {category.name}
        </Button>
      ))}
    </nav>
  );
};
