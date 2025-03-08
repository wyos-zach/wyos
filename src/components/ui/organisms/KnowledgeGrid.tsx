'use client';

import { KnowledgeCard } from '@/components/ui/molecules/KnowledgeCard';

export function KnowledgeGridSection() {
  const sampleCategories = [
    {
      title: 'React',
      description: 'Modern JavaScript library for building user interfaces.',
      imageUrl: '/images/placeholder.png',
      category: 'Frontend',
    },
    {
      title: 'Next.js',
      description: 'The React framework for production.',
      imageUrl: '/images/placeholder.png',
      category: 'Framework',
    },
  ];

  return (
    <section className='space-y-6 px-6'>
      <h2 className='font-heading text-3xl font-bold'>Knowledge Grid</h2>
      <p className='text-gray-400'>
        A responsive grid layout showcasing premium, modern cards with hover
        effects and animations for the Knowledge and Resources sections.
      </p>

      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Preview</h3>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          {sampleCategories.map((category, index) => (
            <KnowledgeCard
              key={index}
              title={category.title}
              description={category.description}
              imageUrl={category.imageUrl}
              category={category.category}
            />
          ))}
        </div>
      </div>

      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Hover States</h3>
        <p className='text-gray-400'>
          Cards scale and reveal descriptions with subtle animations on hover.
        </p>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <KnowledgeCard
            title='React'
            description='Modern JavaScript library for building user interfaces.'
            imageUrl='/images/placeholder.png'
            category='Frontend'
          />
        </div>
      </div>

      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Responsive Behavior</h3>
        <p className='text-gray-400'>
          Adapts to screen size with 1 column (mobile), 2 columns (md), and 3
          columns (lg).
        </p>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          {sampleCategories.map((category, index) => (
            <KnowledgeCard
              key={index}
              title={category.title}
              description={category.description}
              imageUrl={category.imageUrl}
              category={category.category}
            />
          ))}
        </div>
      </div>

      <div className='text-sm text-gray-500'>
        <p>Props:</p>
        <ul className='list-inside list-disc'>
          <li>title: string (required)</li>
          <li>description: string (required)</li>
          <li>imageUrl: string (required)</li>
          <li>category?: string (optional)</li>
        </ul>
      </div>
    </section>
  );
}
