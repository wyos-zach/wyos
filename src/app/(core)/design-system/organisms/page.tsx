import { KnowledgeGridSection } from '@/components/design-system/grid-section';

export default function OrganismsPage() {
  return (
    <div className='space-y-10'>
      <h1 className='font-heading text-4xl font-bold'>Organisms</h1>
      <p className='text-lg text-muted-foreground'>
        Organisms are complex components composed of molecules and atoms, such
        as grid layouts.
      </p>
      <KnowledgeGridSection />
    </div>
  );
}
