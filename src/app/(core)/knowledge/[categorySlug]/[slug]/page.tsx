import { notFound } from 'next/navigation';
import { KnowledgeService } from '@/models/server/knowledge';
import KnowledgeEntryHeader from '@/components/core/knowledge/KnowledgeEntryHeader';
import ArticleEntry from '@/components/core/knowledge/entries/ArticleEntry';
import VideoEntry from '@/components/core/knowledge/entries/VideoEntry';
import HowToEntry from '@/components/core/knowledge/entries/HowToEntry';
import InfographicEntry from '@/components/core/knowledge/entries/InfographicEntry';
import DefaultEntry from '@/components/core/knowledge/entries/DefaultEntry';
import type { JSX } from 'react';

// We declare that params is a Promise of our expected shape.
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; categorySlug: string }>;
}): Promise<JSX.Element> {
  // Await params. We rename categorySlug to _unusedCategorySlug since it isn’t used.
  const { slug, categorySlug: _unusedCategorySlug } = await params;

  function getEntryComponent(type: string) {
    switch (type) {
      case 'article':
        return ArticleEntry;
      case 'video':
        return VideoEntry;
      case 'how-to':
        return HowToEntry;
      case 'infographic':
        return InfographicEntry;
      default:
        return DefaultEntry;
    }
  }

  try {
    const entry = await KnowledgeService.getEntryBySlug(slug);
    if (!entry) return notFound();

    const EntryComponent = getEntryComponent(entry.type);
    return (
      <article className='mx-auto max-w-3xl px-4 py-8'>
        <KnowledgeEntryHeader entry={entry} />
        <EntryComponent entry={entry} />
      </article>
    );
  } catch (error) {
    console.error('Knowledge entry page error:', error);
    return notFound();
  }
}
