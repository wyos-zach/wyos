'use client';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useKnowledgeStore } from '@/store/useKnowledgeStore';
import { KnowledgeService } from '@/models/server/knowledge';
import type { KnowledgeCategory } from '@/types/core/knowledge';

interface CategoryNavProps {
  orientation?: 'horizontal' | 'vertical';
  showAll?: boolean;
  className?: string;
}

export const CategoryNav = ({
  orientation = 'horizontal',
  showAll = true,
  className,
}: CategoryNavProps) => {
  const { selectedCategory, setCategory } = useKnowledgeStore();

  const { data, isPending, isError, refetch } = useQuery<KnowledgeCategory[]>({
    queryKey: ['knowledge', 'categories'],
    queryFn: KnowledgeService.getMainCategories,
    staleTime: 60 * 1000,
  });

  if (isPending) {
    return (
      <div
        className={`flex ${orientation === 'vertical' ? 'flex-col' : 'flex-row'} gap-2 ${className}`}
      >
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className='h-10 w-24 rounded-md' />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className={`flex ${orientation === 'vertical' ? 'flex-col' : 'flex-row'} items-center gap-2 text-destructive ${className}`}
      >
        Failed to load categories
        <Button variant='ghost' size='sm' onClick={() => refetch()}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <nav
      className={`flex ${orientation === 'vertical' ? 'flex-col' : 'flex-row'} gap-2 overflow-x-auto ${className}`}
    >
      {showAll && (
        <Button
          variant={!selectedCategory ? 'default' : 'outline'}
          onClick={() => setCategory(null)}
          className='min-w-[80px]'
        >
          All
        </Button>
      )}
      {data?.map((category) => (
        <Button
          key={category.$id}
          variant={selectedCategory === category.$id ? 'default' : 'outline'}
          onClick={() => setCategory(category.$id)}
          className='min-w-[120px] truncate'
        >
          {category.name}
        </Button>
      ))}
    </nav>
  );
};
