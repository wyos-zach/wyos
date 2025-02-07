import { notFound } from 'next/navigation';
import { KnowledgeService } from '@/models/server/knowledge';
import KnowledgeEntryHeader from '@/components/core/knowledge/KnowledgeEntryHeader';
import ArticleEntry from '@/components/core/knowledge/entries/ArticleEntry';
import VideoEntry from '@/components/core/knowledge/entries/VideoEntry';
import HowToEntry from '@/components/core/knowledge/entries/HowToEntry';
import InfographicEntry from '@/components/core/knowledge/entries/InfographicEntry';
import DefaultEntry from '@/components/core/knowledge/entries/DefaultEntry';
import type { JSX } from 'react';

export default async function Page({
  params,
}: {
  params:
    | { slug: string; categorySlug: string }
    | Promise<{ slug: string; categorySlug: string }>;
}): Promise<JSX.Element> {
  // Rename categorySlug to _unusedCategorySlug if you don't need it
  const { slug, categorySlug: _unusedCategorySlug } =
    await Promise.resolve(params);

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

    const EntryComponent = getEntryComponent(entry.type as string);

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
