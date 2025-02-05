import { notFound } from 'next/navigation';
import { KnowledgeService } from '@/models/server/knowledge';
// Import entry header and layout components for different content types
import KnowledgeEntryHeader from '@/components/core/knowledge/KnowledgeEntryHeader';
import ArticleEntry from '@/components/core/knowledge/entries/ArticleEntry';
import VideoEntry from '@/components/core/knowledge/entries/VideoEntry';
import HowToEntry from '@/components/core/knowledge/entries/HowToEntry';
import InfographicEntry from '@/components/core/knowledge/entries/InfographicEntry';
import DefaultEntry from '@/components/core/knowledge/entries/DefaultEntry';

// Resolves which layout component to use based on entry type
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

export default async function KnowledgeEntryPage({
  params,
}: {
  params: { slug: string; categorySlug: string };
}) {
  try {
    // Fetch entry by slug (the service adds the computed "categorySlug")
    const entry = await KnowledgeService.getEntryBySlug(params.slug);
    if (!entry) return notFound();

    // Choose a layout according to the entry type.
    // (Ensure your Knowledge entries have a "type" field in Appwrite.)
    const EntryComponent = getEntryComponent((entry as any).type);

    return (
      <article className='mx-auto max-w-3xl px-4 py-8'>
        {/* Header with title, breadcrumb, badge, date, share/bookmark buttons */}
        <KnowledgeEntryHeader entry={entry} />

        {/* Content area: delegated to a type-specific layout component */}
        <EntryComponent entry={entry} />
      </article>
    );
  } catch (error) {
    console.error('Knowledge entry page error:', error);
    return notFound();
  }
}
