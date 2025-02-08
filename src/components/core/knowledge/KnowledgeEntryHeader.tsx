'use client';
import Link from 'next/link';
import { BookOpen, Share2 } from 'lucide-react';
import type { KnowledgeEntry } from '@/types/core/knowledge/entry';

interface KnowledgeEntryHeaderProps {
  entry: KnowledgeEntry;
}

export default function KnowledgeEntryHeader({
  entry,
}: KnowledgeEntryHeaderProps) {
  // Example: derive formatted date and breadcrumb text
  const publishedDate = new Date(entry.$createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // For badge we capitalize the entry type
  const contentTypeBadge = entry.type ? entry.type.toUpperCase() : 'UNKNOWN';

  return (
    <header className='mb-8 border-b pb-4'>
      {/* Breadcrumb */}
      <nav className='mb-2 text-sm text-gray-500'>
        <ol className='flex items-center space-x-2'>
          <li>
            <Link href='/knowledge' className='hover:text-primary'>
              Knowledge Hub
            </Link>
          </li>
          <li aria-hidden='true'>/</li>
          <li>
            <Link
              href={`/knowledge/${entry.categorySlug}`}
              className='hover:text-primary'
            >
              {entry.categorySlug}
            </Link>
          </li>
          <li aria-hidden='true'>/</li>
          <li className='font-medium'>{entry.title}</li>
        </ol>
      </nav>
      {/* Title Area */}
      <div className='flex flex-col justify-between md:flex-row md:items-center'>
        <h1 className='bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-4xl font-bold text-transparent'>
          {entry.title}
        </h1>
        <div className='mt-4 flex items-center space-x-4 md:mt-0'>
          <span className='rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700'>
            {contentTypeBadge}
          </span>
          <span className='text-sm text-gray-600'>{publishedDate}</span>
          {/* Action buttons */}
          <button
            aria-label='Share'
            className='rounded-full p-2 hover:bg-gray-200'
          >
            <Share2 className='h-5 w-5 text-gray-600' />
          </button>
          <button
            aria-label='Save Entry'
            className='rounded-full p-2 hover:bg-gray-200'
          >
            <BookOpen className='h-5 w-5 text-gray-600' />
          </button>
        </div>
      </div>
    </header>
  );
}
