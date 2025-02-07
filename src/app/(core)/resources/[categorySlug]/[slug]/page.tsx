import { notFound } from 'next/navigation';
import { ResourceService } from '@/models/server/resources';
import ResourceHeader from '@/components/core/resources/ResourceHeader';
import AppResource from '@/components/core/resources/entries/AppEntry';
import DefaultResource from '@/components/core/resources/entries/DefaultEntry';

type PageProps = {
  params: {
    slug: string;
    categorySlug: string;
  };
};

export default async function Page({ params }: PageProps) {
  function getResourceEntryComponent(type: string) {
    switch (type) {
      case 'article':
        return AppResource;
      default:
        return DefaultResource;
    }
  }

  try {
    const entry = await ResourceService.getEntryBySlug(params.slug);
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
