import { KnowledgeService } from '@/models/server/knowledge';
import { notFound } from 'next/navigation';

export default async function KnowledgeEntryPage({
  params: { slug },
}: {
  params: { slug: string; categorySlug: string };
}) {
  const entry = await KnowledgeService.getEntryBySlug(slug);

  if (!entry) {
    return notFound();
  }

  return (
    <div>
      <h1>{entry.title}</h1>
      <div>{entry.content}</div>
    </div>
  );
}
