'use client';

import { CardImage } from '@/components/ui/atoms/CardImage';
import { CardContent } from '@/components/ui/molecules/CardContent';
import { CategoryCard } from '@/components/ui/organisms/CategoryCard';

const mockCategory = {
  name: 'Health & Wellness',
  description: 'Explore resources and knowledge for a healthier lifestyle.',
  imageUrl: '/images/placeholder.png',
  slug: 'health-wellness',
  type: 'knowledge' as const,
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
          <CategoryCard category={mockCategory} className='w-full max-w-sm' />
        </div>
      </div>

      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Hover State</h3>
        <p className='text-sm text-muted-foreground'>
          Features a subtle blue glow and scale effect on hover.
        </p>
        <div className='flex flex-wrap gap-6'>
          <CategoryCard category={mockCategory} className='w-full max-w-sm' />
        </div>
      </div>

      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Without Image</h3>
        <div className='flex flex-wrap gap-6'>
          <CategoryCard
            category={{ ...mockCategory, imageUrl: undefined }}
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
            category={mockCategory}
            className='border-1 w-full max-w-sm border-primary/30'
          />
        </div>
      </div>

      <div className='text-sm text-gray-500'>
        <p>Props:</p>
        <ul className='list-inside list-disc'>
          <li>
            category:{' '}
            {`{ name: string; description?: string; imageUrl?: string; slug: string; type: 'knowledge' | 'resources' }`}
          </li>
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
            <CardContent
              title={mockCategory.name}
              description={mockCategory.description}
              type={mockCategory.type}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
