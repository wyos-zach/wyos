'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { ResourceCategory } from '@/types/core/resources/category';

export interface CategoryHeaderProps {
  category: ResourceCategory;
  totalEntries: number;
  className?: string;
}

export const CategoryHeader = ({
  category,
  totalEntries,
  className,
}: CategoryHeaderProps) => {
  return (
    <header
      className={cn(
        'relative overflow-hidden bg-gradient-to-br from-green-900/80 to-teal-900/50',
        'border-b border-green-800/30 backdrop-blur-lg',
        className
      )}
    >
      <div className='container relative py-16 md:py-24'>
        {/* Breadcrumb Navigation */}
        <nav aria-label='Breadcrumb' className='mb-6 text-sm text-green-200'>
          <ol className='flex items-center space-x-2'>
            <li>
              <Link
                href='/resources'
                className='transition-colors hover:text-primary'
              >
                Resources Hub
              </Link>
            </li>
            <li aria-hidden='true' className='text-green-400'>
              /
            </li>
            <li className='font-medium text-white' aria-current='page'>
              {category.name}
            </li>
          </ol>
        </nav>
        {/* Main Header Content */}
        <div className='max-w-3xl'>
          <h1 className='text-4xl font-bold tracking-tight text-white md:text-5xl'>
            {category.name}
          </h1>
          {category.description && (
            <p className='mt-4 text-lg text-green-100'>
              {category.description}
            </p>
          )}
          <div className='mt-6 flex items-center gap-4'>
            <span className='inline-flex items-center rounded-full bg-green-800/30 px-4 py-2 text-sm font-medium text-green-100'>
              {totalEntries} curated resources
            </span>
          </div>
        </div>
        {/* Gradient Overlay */}
        <div
          className='absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(30,58,138,0.4),transparent_60%)]'
          aria-hidden='true'
        />
      </div>
    </header>
  );
};
