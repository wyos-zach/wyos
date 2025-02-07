import { KnowledgeService } from '@/models/server/knowledge';
import { notFound } from 'next/navigation';

interface PageProps {
  params: { categorySlug: string; slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function KnowledgeEntryPage(props: PageProps) {
  const entry = await KnowledgeService.getEntryBySlug(props.params.slug);

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
