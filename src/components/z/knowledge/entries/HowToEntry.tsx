import type { KnowledgeEntry } from '@/types/core/knowledge/entry';

interface HowToEntryProps {
  entry: KnowledgeEntry;
}

export default function HowToEntry({ entry }: HowToEntryProps) {
  // Split steps from entry.content by newline (this is a simplistic approach)
  const steps = entry.content
    .split('\n')
    .filter((step) => step.trim().length > 0);

  return (
    <section className='mx-auto max-w-3xl space-y-6'>
      <h2 className='text-2xl font-bold'>Steps</h2>
      <ol className='space-y-4'>
        {steps.map((step, index) => (
          <li key={index} className='rounded-lg border p-4 shadow-sm'>
            <span className='mr-2 font-semibold'>{index + 1}.</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
