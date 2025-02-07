import { notFound } from 'next/navigation';
import { ResourceService } from '@/models/server/resources';
import ResourceHeader from '@/components/core/resources/ResourceHeader';
import AppResource from '@/components/core/resources/entries/AppEntry';
import DefaultResource from '@/components/core/resources/entries/DefaultEntry';
import type { JSX } from 'react';

export default async function Page({
  params,
}: {
  // Allow params to be given as an object or a promise.
  params:
    | { slug: string; categorySlug: string }
    | Promise<{ slug: string; categorySlug: string }>;
}): Promise<JSX.Element> {
  // Ensure params is treated as a promise.
  const resolvedParams = await Promise.resolve(
    params as { slug: string; categorySlug: string }
  );
  const { slug, categorySlug } = resolvedParams;

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
