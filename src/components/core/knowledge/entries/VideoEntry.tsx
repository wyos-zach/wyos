import type { KnowledgeEntry } from '@/types/core/knowledge/entry';
import DOMPurify from 'dompurify';

interface VideoEntryProps {
  entry: KnowledgeEntry;
}

const VideoPlayer = ({ videoUrl }: { videoUrl: string }) => (
  <div className='mb-4 aspect-video'>
    <video
      controls
      className='h-full w-full rounded-lg'
      aria-label='Video content'
    >
      <source src={videoUrl} type='video/mp4' />
      Your browser does not support the video tag.
    </video>
  </div>
);

const Transcript = ({ content }: { content: string }) => (
  <div className='prose dark:prose-invert'>
    <h2 className='mb-2 text-2xl font-semibold'>Transcript</h2>
    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
  </div>
);

export default function VideoEntry({ entry }: VideoEntryProps) {
  const videoUrl = entry.imageUrl || 'fallback-video-url.mp4'; // Provide a better fallback URL

  return (
    <section className='mx-auto max-w-3xl'>
      <VideoPlayer videoUrl={videoUrl} />
      {entry.content && <Transcript content={entry.content} />}
    </section>
  );
}
