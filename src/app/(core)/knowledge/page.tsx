'use client';

import { useState } from 'react';
import { SearchBar } from '@/components/core/knowledge/navigation/SearchBar';
import { CategoryNav } from '@/components/core/knowledge/navigation/CategoryNav';
import { KnowledgeGrid } from '@/components/core/knowledge/content/KnowledgeGrid';

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
