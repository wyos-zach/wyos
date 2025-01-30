import { notFound } from 'next/navigation';
import { KnowledgeService } from '@/models/server/knowledge';

export default async function KnowledgeEntryPage({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const entry = await KnowledgeService.getEntryBySlug(params.slug);

    return (
      <article className='prose dark:prose-invert mx-auto'>
        <h1>{entry.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: entry.content }} />
      </article>
    );
  } catch (error) {
    return notFound();
  }
}
