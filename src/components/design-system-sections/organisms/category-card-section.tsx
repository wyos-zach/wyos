'use client';

import { CardImage } from '@/components/design-system/atoms/CardImage';
import { CategoryCardContent } from '@/components/design-system/molecules/CategoryCardContent';
import { CategoryCard } from '@/components/design-system/organisms/CategoryCard';
import type { KnowledgeCategory } from '@/types/core/knowledge/category';

// Create a mock KnowledgeCategory for demonstration
const mockCategory: KnowledgeCategory = {
  $id: 'mock-category-1',
  name: 'Health & Wellness',
  description: 'Explore resources and knowledge for a healthier lifestyle.',
  imageUrl: '/images/placeholder.png',
  slug: 'health-wellness',
  order: 1,
  isActive: true,
  $createdAt: new Date().toISOString(),
  $updatedAt: new Date().toISOString(),
};

export function CategoryCardSection() {
  return (
    <section className='space-y-6 bg-background px-6 py-12'>
      <h2 className='gradient-text font-heading text-3xl font-bold'>
        Category Card
      </h2>
      <p className='max-w-prose text-muted-foreground'>
        A premium card for displaying categories in Knowledge and Resources
        sections, featuring glassmorphism, refined gradients, and subtle
        animations.
      </p>

      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Default State</h3>
        <div className='flex flex-wrap gap-6'>
          <CategoryCard
            category={mockCategory as KnowledgeCategory}
            className='w-full max-w-sm'
          />
        </div>
      </div>

      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Hover State</h3>
        <p className='text-sm text-muted-foreground'>
          Features a subtle blue glow and scale effect on hover.
        </p>
        <div className='flex flex-wrap gap-6'>
          <CategoryCard
            category={mockCategory as KnowledgeCategory}
            className='w-full max-w-sm'
          />
        </div>
      </div>

      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Without Image</h3>
        <div className='flex flex-wrap gap-6'>
          <CategoryCard
            category={
              {
                ...mockCategory,
                imageUrl: undefined,
              } as KnowledgeCategory
            }
            className='w-full max-w-sm'
          />
        </div>
      </div>

      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Custom Styling</h3>
        <p className='text-sm text-muted-foreground'>
          Use the `className` prop to apply custom styles.
        </p>
        <div className='flex flex-wrap gap-6'>
          <CategoryCard
            category={mockCategory as KnowledgeCategory}
            className='border-1 w-full max-w-sm border-primary/30'
          />
        </div>
      </div>

      <div className='text-sm text-gray-500'>
        <p>Props:</p>
        <ul className='list-inside list-disc'>
          <li>category: `KnowledgeCategory | ResourceCategory`</li>
          <li>className?: string (custom Tailwind classes)</li>
        </ul>
      </div>

      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Atomic Breakdown</h3>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <div>
            <h4 className='font-semibold'>CardImage</h4>
            <CardImage
              imageUrl={mockCategory.imageUrl}
              alt={mockCategory.name}
            />
          </div>
          <div>
            <h4 className='font-semibold'>CardContent</h4>
            <CategoryCardContent
              title={mockCategory.name}
              description={mockCategory.description}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
