import { notFound } from 'next/navigation';
import { ResourceService } from '@/models/server/resources';
import ResourceHeader from '@/components/core/resources/ResourceHeader';
import AppResource from '@/components/core/resources/entries/AppEntry';
import DefaultResource from '@/components/core/resources/entries/DefaultEntry';

// Declare params as a Promise carrying our URL parameters.
export default async function Page({
  params,
}: {
  params: Promise<{ categorySlug: string; slug: string }>;
}) {
  // We rename categorySlug to _unusedCategorySlug since it isn’t used here.
  const { slug, categorySlug: _unusedCategorySlug } = await params;

  const entry = await ResourceService.getEntryBySlug(slug);
  if (!entry) return notFound();

  const EntryComponent = entry.type === 'app' ? AppResource : DefaultResource;
  return (
    <article className='mx-auto max-w-3xl px-4 py-8'>
      <ResourceHeader entry={entry} />
      <EntryComponent entry={entry} />
    </article>
  );
}
