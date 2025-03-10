import { CategoryHeaderSection } from '@/components/design-system-sections/organisms/category-header-section';
import { CoreHeroSection } from '@/components/design-system-sections/organisms/core-hero-section';
import { KnowledgeGrid } from '@/components/design-system-sections/sections/knowledge-grid-section';

export default function SectionsPage() {
  return (
    <div className='space-y-10'>
      <h1 className='font-heading text-4xl font-bold'>Sections</h1>
      <p className='text-lg text-muted-foreground'>
        Sections are page-level objects that place components into a layout.
      </p>
      <Divider />
      <CategoryHeaderSection />
      <Divider />
      <CoreHeroSection />
      <Divider />
      <KnowledgeGrid />
      <Divider />
    </div>
  );
}

function Divider() {
  return <hr className='my-8 border-t border-gray-300 dark:border-gray-700' />;
}
