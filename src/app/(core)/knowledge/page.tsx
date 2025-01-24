'use client';

import { useState } from 'react';
import { KnowledgeGrid } from '@/components/core/knowledge/content/KnowledgeGrid';
import { CategoryNav } from '@/components/core/knowledge/navigation/CategoryNav';
import { SearchBar } from '@/components/core/knowledge/navigation/SearchBar';
import { FilterPanel } from '@/components/core/knowledge/filters/FilterPanel';
import { Skeleton } from '@/components/ui/skeleton';

export default function KnowledgePage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section className='space-y-8'>
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <SearchBar
            onSearch={setSearchQuery}
            placeholder='Search knowledge base...'
          />
          <FilterPanel />
        </div>
        <CategoryNav
          currentCategoryId={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>
      <KnowledgeGrid categoryId={selectedCategory} searchQuery={searchQuery} />
    </section>
  );
}
