import { KnowledgeService } from '@/models/server/knowledge';
import { notFound } from 'next/navigation';
import type { JSX } from 'react';

export default async function KnowledgeEntryPage({
  params,
}: {
  params: { categorySlug: string; slug: string };
}): Promise<JSX.Element> {
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
