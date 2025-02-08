import type { ResourceEntry } from '@/types/core/resources/entry';
import DOMPurify from 'dompurify';

interface DefaultEntryProps {
  entry: ResourceEntry;
}

export default function DefaultEntry({ entry }: DefaultEntryProps) {
  const safeContent = DOMPurify.sanitize(entry.content);

  return (
    <section className='prose dark:prose-invert mx-auto'>
      <div dangerouslySetInnerHTML={{ __html: safeContent }} />
    </section>
  );
}
