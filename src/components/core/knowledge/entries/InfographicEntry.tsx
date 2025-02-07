'use client';
import { useState } from 'react';
import Image from 'next/image';
import type { KnowledgeEntry } from '@/types/core/knowledge/entry';

interface InfographicEntryProps {
  entry: KnowledgeEntry;
}

export default function InfographicEntry({ entry }: InfographicEntryProps) {
  const [zoomed, setZoomed] = useState(false);

  return (
    <section className='mx-auto max-w-3xl'>
      <button
        className='relative w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
        onClick={() => setZoomed((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setZoomed((prev) => !prev);
          }
        }}
        aria-expanded={zoomed}
        aria-label={zoomed ? 'Zoom out image' : 'Zoom in image'}
      >
        <Image
          src={entry.imageUrl || ''}
          alt={entry.title}
          width={800}
          height={450}
          className={`w-full rounded-lg transition-transform duration-300 ${
            zoomed ? 'scale-125' : 'scale-100'
          }`}
          sizes='(max-width: 768px) 100vw, 800px'
        />
        <p className='mt-2 text-center text-sm text-gray-500' aria-hidden='true'>
          {zoomed ? 'Click to zoom out' : 'Click to zoom in'}
        </p>
      </button>
    </section>
  );
}
