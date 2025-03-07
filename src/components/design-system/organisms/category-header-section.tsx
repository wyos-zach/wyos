'use client';

import { CategoryHeader } from '@/components/ui/organisms/CategoryHeader';
import type { KnowledgeCategory } from '@/types/core/knowledge/category';
import type { ResourceCategory } from '@/types/core/resources/category';

const sampleKnowledgeCategory: KnowledgeCategory = {
  $id: '1',
  name: 'Personal Development',
  slug: 'personal-development',
  description: 'Explore techniques to enhance personal growth and skills.',
  order: 1,
  isActive: true,
  imageUrl: '/placeholder-image.jpg',
  iconUrl: '/placeholder-icon.jpg',
  mainCategoryId: 'main-1',
  $createdAt: new Date().toISOString(),
  $updatedAt: new Date().toISOString(),
};

const sampleResourceCategory: ResourceCategory = {
  $id: '2',
  name: 'Productivity Tools',
  slug: 'productivity-tools',
  order: 1,
  isActive: true,
  description: 'Discover tools to boost your efficiency and workflow.',
  imageUrl: '/placeholder-image.jpg',
  iconUrl: '/placeholder-icon.jpg',
  mainCategoryId: 'main-2',
  type: 'software',
  $createdAt: new Date().toISOString(),
  $updatedAt: new Date().toISOString(),
};

export function CategoryHeaderSection() {
  return (
    <section className='space-y-6 bg-background px-6'>
      <h2 className='font-heading text-3xl font-bold'>CategoryHeader</h2>
      <p className='text-muted-foreground'>
        A sleek, premium header for category pages with minimal breadcrumb
        navigation, title, description, and entry count.
      </p>

      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Knowledge Category Example</h3>
        <div className='w-full'>
          <CategoryHeader
            category={sampleKnowledgeCategory}
            totalEntries={25}
            parentLink='/knowledge'
            parentLabel='Knowledge Hub'
            label='entries'
          />
        </div>
      </div>

      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Resource Category Example</h3>
        <div className='w-full'>
          <CategoryHeader
            category={sampleResourceCategory}
            totalEntries={15}
            parentLink='/resources'
            parentLabel='Resources Hub'
            label='resources'
          />
        </div>
      </div>

      <div className='text-sm text-gray-500'>
        <p>Props:</p>
        <ul className='list-inside list-disc'>
          <li>
            category: KnowledgeCategory | ResourceCategory (category data)
          </li>
          <li>totalEntries: number (count of entries/resources)</li>
          <li>parentLink: string (link to parent hub)</li>
          <li>parentLabel: string (label for parent hub)</li>
          <li>label: string (e.g., "entries" or "resources")</li>
          <li>className: string (optional custom Tailwind classes)</li>
        </ul>
      </div>
    </section>
  );
}
