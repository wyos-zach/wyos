'use client';

import { useState } from 'react';
import { ResourceGrid } from '@/components/resources/content/ResourceGrid';
import { CategoryNav } from '@/components/resources/navigation/CategoryNav';
import { SearchBar } from '@/components/resources/navigation/SearchBar';
import { FilterPanel } from '@/components/resources/filters/FilterPanel';

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section className='space-y-8'>
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <SearchBar
            onSearch={setSearchQuery}
            placeholder='Search resources...'
          />
          <FilterPanel />
        </div>
        <CategoryNav
          currentCategoryId={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>
      <ResourceGrid categoryId={selectedCategory} searchQuery={searchQuery} />
    </section>
  );
}
