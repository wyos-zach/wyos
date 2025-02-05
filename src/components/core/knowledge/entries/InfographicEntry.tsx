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
      <div
        className='relative cursor-pointer'
        onClick={() => setZoomed((prev) => !prev)}
      >
        <Image
          src={entry.imageUrl || ''}
          alt={entry.title}
          width={800}
          height={450}
          className={`w-full rounded-lg transition-transform duration-300 ${zoomed ? 'scale-125' : 'scale-100'}`}
          sizes='(max-width: 768px) 100vw, 800px'
        />
        <p className='mt-2 text-center text-sm text-gray-500'>
          {zoomed ? 'Click to zoom out' : 'Click to zoom in'}
        </p>
      </div>
    </section>
  );
}
