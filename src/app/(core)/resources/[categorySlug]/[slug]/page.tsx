import { notFound } from 'next/navigation';
import { ResourceService } from '@/models/server/resources';
import ResourceHeader from '@/components/core/resources/ResourceHeader';
import AppResource from '@/components/core/resources/entries/AppEntry';
import DefaultResource from '@/components/core/resources/entries/DefaultEntry';
import type { JSX } from 'react';

export default async function Page({
  params,
}: {
  params: { categorySlug: string; slug: string };
}): Promise<JSX.Element> {
  const entry = await ResourceService.getEntryBySlug(params.slug);

  if (!entry) {
    return notFound();
  }

  const EntryComponent = entry.type === 'app' ? AppResource : DefaultResource;

  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <ResourceHeader entry={entry} />
      <EntryComponent entry={entry} />
    </article>
  );
}
