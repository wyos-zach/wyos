import { KnowledgeService } from '@/models/server/knowledge';
import { notFound } from 'next/navigation';

interface PageParams {
  slug: string;
  categorySlug: string;
}

interface Props {
  params: PageParams;
}

export default async function KnowledgeEntryPage({
  params: { slug },
}: Props) {
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
