import type { KnowledgeEntry } from '@/types/core/knowledge/entry';
import DOMPurify from 'dompurify';

interface ArticleEntryProps {
  entry: KnowledgeEntry;
}

export default function ArticleEntry({ entry }: ArticleEntryProps) {
  const safeContent = DOMPurify.sanitize(entry.content);

  return (
    <section className='prose dark:prose-invert mx-auto'>
      <div dangerouslySetInnerHTML={{ __html: safeContent }} />
    </section>
  );
}
