'use client';

import Link from 'next/link';
import { BookOpen, Share2 } from 'lucide-react';
import type { ResourceEntry } from '@/types/core/resources/entry';

interface ResourceEntryHeaderProps {
  entry: ResourceEntry;
}

export default function ResourceEntryHeader({
  entry,
}: ResourceEntryHeaderProps) {
  const publishedDate = new Date(entry.$createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const contentTypeBadge = entry.type ? entry.type.toUpperCase() : 'UNKNOWN';
  return (
    <header className='mb-8 border-b pb-4'>
      <nav className='mb-2 text-sm text-gray-500'>
        <ol className='flex items-center space-x-2'>
          <li>
            <Link href='/resources' className='hover:text-primary'>
              Resources
            </Link>
          </li>
          <li aria-hidden='true'>/</li>
          <li>
            <Link
              href={`/resources/${entry.categorySlug}`}
              className='hover:text-primary'
            >
              {entry.categorySlug}
            </Link>
          </li>
          <li aria-hidden='true'>/</li>
          <li className='font-medium'>{entry.title}</li>
        </ol>
      </nav>
      <div className='flex flex-col justify-between md:flex-row md:items-center'>
        <h1 className='bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-4xl font-bold text-transparent'>
          {entry.title}
        </h1>
        <div className='mt-4 flex items-center space-x-4 md:mt-0'>
          <span className='rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700'>
            {contentTypeBadge}
          </span>
          <span className='text-sm text-gray-600'>{publishedDate}</span>
          <button
            aria-label='Share'
            className='rounded-full p-2 hover:bg-gray-200'
          >
            <Share2 className='h-5 w-5 text-gray-600' />
          </button>
          <button
            aria-label='Save Resource'
            className='rounded-full p-2 hover:bg-gray-200'
          >
            <BookOpen className='h-5 w-5 text-gray-600' />
          </button>
        </div>
      </div>
    </header>
  );
}
