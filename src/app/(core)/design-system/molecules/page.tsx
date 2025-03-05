import { CardsSection } from '@/components/design-system/molecules/cards-section';
import { DialogsSection } from '@/components/design-system/molecules/dialogs-section';
import { CategoryNavSection } from '@/components/design-system/molecules/category-nav-section';
import { CommentsSection } from '@/components/design-system/molecules/comments-section';
import { FilterBarSection } from '@/components/design-system/molecules/filter-bar-section';
import { FormFieldSection } from '@/components/design-system/molecules/form-field-section';

export default function MoleculesPage() {
  return (
    <div className='space-y-10'>
      <h1 className='font-heading text-4xl font-bold'>Molecules</h1>
      <p className='text-lg text-muted-foreground'>
        Molecules are combinations of atoms that form reusable components like
        cards and dialogs.
      </p>
      <CardsSection />
      <Divider />
      <CategoryNavSection />
      <Divider />
      <CommentsSection />
      <Divider />
      <DialogsSection />
      <Divider />
      <FilterBarSection />
      <Divider />
      <FormFieldSection />
      <Divider />
    </div>
  );
}

function Divider() {
  return <hr className='my-8 border-t border-gray-300 dark:border-gray-700' />;
}
