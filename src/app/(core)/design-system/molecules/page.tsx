import { CardsSection } from '@/components/design-system/molecules/cards-section';
import { DialogsSection } from '@/components/design-system/molecules/dialogs-section';

export default function MoleculesPage() {
  return (
    <div className='space-y-10'>
      <h1 className='font-heading text-4xl font-bold'>Molecules</h1>
      <p className='text-lg text-muted-foreground'>
        Molecules are combinations of atoms that form reusable components like
        cards and dialogs.
      </p>
      <CardsSection />
      <DialogsSection />
    </div>
  );
}
