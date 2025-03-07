import { CoreHeroSection } from '@/components/design-system/organisms/core-hero-section';
import { KnowledgeGridSection } from '@/components/design-system/organisms/grid-section';

export default function OrganismsPage() {
  return (
    <div className='space-y-10'>
      <h1 className='font-heading text-4xl font-bold'>Organisms</h1>
      <p className='text-lg text-muted-foreground'>
        Organisms are complex components composed of molecules and atoms, such
        as grid layouts.
      </p>
      <Divider />
      <CoreHeroSection />
      <Divider />
      <KnowledgeGridSection />
    </div>
  );
}

function Divider() {
  return <hr className='my-8 border-t border-gray-300 dark:border-gray-700' />;
}
