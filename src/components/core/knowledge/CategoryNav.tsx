'use client';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useKnowledgeStore } from '@/store/useKnowledgeStore';
import { KnowledgeService } from '@/models/server/knowledge';
import { useRouter, usePathname } from 'next/navigation';

export const CategoryNav = () => {
  const { selectedCategory, setCategory } = useKnowledgeStore();
  const { data: categories, isPending } = useQuery({
    queryKey: ['knowledge', 'categories'],
    queryFn: () => KnowledgeService.getKnowledgeCategories(),
    staleTime: 60 * 1000,
  });
  const router = useRouter();
  const pathname = usePathname();

  const handleCategorySelect = async (category: {
    $id: string;
    slug: string;
  }) => {
    // Update state with the internal ID (used for filtering)
    setCategory(category.$id);
    // Update URL with friendly slug
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('category', category.slug);
    router.push(`${pathname}?${searchParams.toString()}`);
  };

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
        onClick={() => {
          setCategory(null);
          const searchParams = new URLSearchParams(window.location.search);
          searchParams.delete('category');
          router.push(`${pathname}?${searchParams.toString()}`);
        }}
        className='min-w-[80px]'
      >
        All
      </Button>
      {categories?.map((category) => (
        <Button
          key={category.$id}
          variant={selectedCategory === category.$id ? 'default' : 'outline'}
          onClick={() => handleCategorySelect(category)}
          className='min-w-[120px] truncate'
        >
          {category.name}
        </Button>
      ))}
    </nav>
  );
};
