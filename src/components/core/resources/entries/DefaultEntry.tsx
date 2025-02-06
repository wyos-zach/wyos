import type { ResourceEntry } from '@/types/core/resources/entry';

interface DefaultEntryProps {
  entry: ResourceEntry;
}

export default function DefaultEntry({ entry }: DefaultEntryProps) {
  return (
    <section className='prose dark:prose-invert mx-auto'>
      <div dangerouslySetInnerHTML={{ __html: entry.content }} />
    </section>
  );
}
