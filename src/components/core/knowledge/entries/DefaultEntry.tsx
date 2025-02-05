import type { KnowledgeEntry } from '@/types/core/knowledge/entry';

interface DefaultEntryProps {
  entry: KnowledgeEntry;
}

export default function DefaultEntry({ entry }: DefaultEntryProps) {
  return (
    <section className='prose dark:prose-invert mx-auto'>
      <div dangerouslySetInnerHTML={{ __html: entry.content }} />
    </section>
  );
}
