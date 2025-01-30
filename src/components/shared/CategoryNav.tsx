'use client';
import { useQuery } from '@tanstack/react-query';
import { useKnowledgeStore } from '@/store/useKnowledgeStore';
import { KnowledgeService } from '@/models/server/knowledge';

export function CategoryNav() {
  const { data: categories } = useQuery({
    queryKey: ['knowledge-categories'],
    queryFn: () => KnowledgeService.getMainCategories(),
  });

  const { selectedCategory, setCategory } = useKnowledgeStore();

  return (
    <nav className='flex gap-2 overflow-x-auto'>
      <button
        onClick={() => setCategory(null)}
        className={!selectedCategory ? 'active' : ''}
      >
        All
      </button>
      {categories?.map((category) => (
        <button
          key={category.$id}
          onClick={() => setCategory(category.$id)}
          className={selectedCategory === category.$id ? 'active' : ''}
        >
          {category.name}
        </button>
      ))}
    </nav>
  );
}
