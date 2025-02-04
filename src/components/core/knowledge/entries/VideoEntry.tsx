import type { KnowledgeEntry } from '@/types/core/knowledge/entry';

interface VideoEntryProps {
  entry: KnowledgeEntry;
}

export default function VideoEntry({ entry }: VideoEntryProps) {
  // We'll assume that entry.content holds the transcript and entry.imageUrl contains the video URL.
  // In a real case, you may have a dedicated field (e.g., videoUrl).
  return (
    <section className='mx-auto max-w-3xl'>
      <div className='mb-4 aspect-video'>
        <video controls className='h-full w-full rounded-lg'>
          <source src={entry.imageUrl || ''} type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      </div>
      {/* Transcript (if available) */}
      {entry.content && (
        <div className='prose dark:prose-invert'>
          <h2 className='mb-2 text-2xl font-semibold'>Transcript</h2>
          <div dangerouslySetInnerHTML={{ __html: entry.content }} />
        </div>
      )}
    </section>
  );
}
