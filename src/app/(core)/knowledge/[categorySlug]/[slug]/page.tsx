import { KnowledgeService } from '@/models/server/knowledge';
import { notFound } from 'next/navigation';

export default async function KnowledgeEntryPage({
  params,
  searchParams: _searchParams,
}: {
  params: { categorySlug: string; slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const entry = await KnowledgeService.getEntryBySlug(params.slug);

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
