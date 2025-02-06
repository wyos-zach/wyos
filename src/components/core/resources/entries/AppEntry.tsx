import type { ResourceEntry } from '@/types/core/resources/entry';

interface AppEntryProps {
  entry: ResourceEntry;
}

export default function AppEntry({ entry }: AppEntryProps) {
  return (
    <section className='prose dark:prose-invert mx-auto'>
      {/* Render content as HTML – ensure content is sanitized upstream */}
      <div dangerouslySetInnerHTML={{ __html: entry.content }} />
    </section>
  );
}
