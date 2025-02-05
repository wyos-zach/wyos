import type { KnowledgeEntry } from '@/types/core/knowledge/entry';

interface ArticleEntryProps {
  entry: KnowledgeEntry;
}

export default function ArticleEntry({ entry }: ArticleEntryProps) {
  return (
    <section className='prose dark:prose-invert mx-auto'>
      {/* Render content as HTML – ensure content is sanitized upstream */}
      <div dangerouslySetInnerHTML={{ __html: entry.content }} />
    </section>
  );
}
