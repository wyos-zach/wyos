'use client';

import { CategoryNav } from '@/components/design-system/molecules/CategoryNav';
import { useState } from 'react';

// Resource categories - in a real implementation, these would come from a data source
const resourceCategories = [
  { id: 'books', name: 'Books', slug: 'books' },
  { id: 'courses', name: 'Courses', slug: 'courses' },
  { id: 'tools', name: 'Tools', slug: 'tools' },
  { id: 'articles', name: 'Articles', slug: 'articles' },
  { id: 'podcasts', name: 'Podcasts', slug: 'podcasts' },
];

export function CategoryNavWrapper() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategorySelect = (slug: string | null) => {
    setSelectedCategory(slug);

    // In a real implementation, this would:
    // 1. Update a Zustand store
    // 2. Trigger filtering of resources
    // 3. Possibly update the URL for shareable states
  };

  return (
    <CategoryNav
      categories={resourceCategories}
      selectedCategory={selectedCategory}
      onSelectAction={handleCategorySelect}
    />
  );
}
