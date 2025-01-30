'use client';
import { LoadingOverlay } from '@/components/core/knowledge/LoadingOverlay';
import { CategoryNav } from '@/components/core/knowledge/CategoryNav';
import { SearchBar } from '@/components/core/knowledge/SearchBar';
import { KnowledgeGrid } from '@/components/core/knowledge/KnowledgeGrid';

export default function KnowledgePage() {
  return (
    <section className='space-y-8'>
      <LoadingOverlay />
      <div className='flex flex-col gap-6'>
        <SearchBar />
        <CategoryNav />
      </div>
      <KnowledgeGrid />
    </section>
  );
}
