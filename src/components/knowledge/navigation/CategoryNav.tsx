'use client';

import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  orderIndex: number;
  isActive: boolean;
}

interface CategoryNavProps {
  currentCategoryId?: string;
  onCategoryChange?: (categoryId: string) => void;
}

export function CategoryNav({
  currentCategoryId,
  onCategoryChange,
}: CategoryNavProps) {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      // We'll implement this API call later
      const response = await fetch('/api/categories');
      return response.json() as Promise<Category[]>;
    },
  });

  if (isLoading) {
    return (
      <div className='flex gap-4 overflow-x-auto pb-2'>
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className='h-10 w-24 flex-shrink-0' />
        ))}
      </div>
    );
  }

  return (
    <nav className='flex gap-4 overflow-x-auto pb-2'>
      {categories?.map((category) => (
        <Button
          key={category.id}
          variant={currentCategoryId === category.id ? 'default' : 'outline'}
          className='flex-shrink-0'
          onClick={() => onCategoryChange?.(category.id)}
        >
          {category.name}
        </Button>
      ))}
    </nav>
  );
}
