'use client';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useKnowledgeStore } from '@/store/useKnowledgeStore';
import { KnowledgeService } from '@/models/server/knowledge';

export const CategoryNav = () => {
  const { selectedCategory, setCategory } = useKnowledgeStore();
  const { data: categories, isPending } = useQuery({
    queryKey: ['knowledge', 'categories'],
    queryFn: () => KnowledgeService.getKnowledgeCategories(),
    staleTime: 60 * 1000,
  });

  if (isPending) {
    return (
      <div className='flex gap-2'>
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className='h-10 w-24 rounded-md' />
        ))}
      </div>
    );
  }

  return (
    <nav className='mb-8 flex gap-2 overflow-x-auto'>
      <Button
        variant={!selectedCategory ? 'default' : 'outline'}
        onClick={() => setCategory(null)}
        className='min-w-[80px]'
      >
        All
      </Button>
      {categories?.map((category) => (
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
