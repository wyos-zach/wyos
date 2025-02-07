import { notFound } from 'next/navigation';
import { ResourceService } from '@/models/server/resources';
import ResourceHeader from '@/components/core/resources/ResourceHeader';
import AppResource from '@/components/core/resources/entries/AppEntry';
import DefaultResource from '@/components/core/resources/entries/DefaultEntry';

export default async function Page({
  params,
}: {
  params: { slug: string; categorySlug: string };
}) {
  // Await params to ensure it meets Next.js’s expected type.
  const { slug, categorySlug } = await Promise.resolve(params);

  function getResourceEntryComponent(type: string) {
    switch (type) {
      case 'article':
        return AppResource;
      default:
        return DefaultResource;
    }
  }

  try {
    const entry = await ResourceService.getEntryBySlug(slug);
    if (!entry) return notFound();
    const EntryComponent = getResourceEntryComponent(entry.type);
    return (
      <article className='mx-auto max-w-3xl px-4 py-8'>
        <ResourceHeader entry={entry} />
        <EntryComponent entry={entry} />
      </article>
    );
  } catch (error) {
    console.error('Resource entry page error:', error);
    return notFound();
  }
}
