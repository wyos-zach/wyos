'use client';

import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { categoryApi } from '@/lib/services/appwrite/api';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  order: number;
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
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery<Category[]>({
    queryKey: ['resource-categories'],
    queryFn: categoryApi.fetchResourceCategories,
  });

  if (error) {
    return (
      <div className='text-sm text-destructive' role='alert'>
        Failed to load categories
      </div>
    );
  }

  if (isLoading) {
    return (
      <div
        className='flex gap-4 overflow-x-auto pb-2'
        role='navigation'
        aria-label='Category navigation loading'
      >
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className='h-10 w-24 flex-shrink-0' />
        ))}
      </div>
    );
  }

  return (
    <nav
      className='flex gap-4 overflow-x-auto pb-2'
      role='navigation'
      aria-label='Category navigation'
    >
      <Button
        variant={!currentCategoryId ? 'default' : 'outline'}
        className='flex-shrink-0'
        onClick={() => onCategoryChange?.('')}
      >
        All
      </Button>
      {categories?.map((category) => (
        <Button
          key={category.id}
          variant={currentCategoryId === category.id ? 'default' : 'outline'}
          className='flex-shrink-0'
          onClick={() => onCategoryChange?.(category.id)}
          aria-current={currentCategoryId === category.id ? 'page' : undefined}
        >
          {category.name}
        </Button>
      ))}
    </nav>
  );
}
