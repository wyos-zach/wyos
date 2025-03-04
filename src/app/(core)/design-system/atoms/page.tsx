import { ButtonsSection } from '@/components/design-system/buttons-section';
import { InputsSection } from '@/components/design-system/inputs-section';

export default function AtomsPage() {
  return (
    <div className='space-y-10'>
      <h1 className='font-heading text-4xl font-bold'>Atoms</h1>
      <p className='text-lg text-muted-foreground'>
        Basic building blocks of the interface that can't be broken down any
        further without ceasing to be functional.
      </p>

      <ButtonsSection />
      <InputsSection />
      {/* Add more atomic components here */}
    </div>
  );
}
