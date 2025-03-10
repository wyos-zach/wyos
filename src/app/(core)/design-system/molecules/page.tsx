import { AccordionSection } from '@/components/design-system-sections/molecules/accordion-section';
import { AuthButtonsSection } from '@/components/design-system-sections/molecules/auth-button-section';
import { AuthFieldsSection } from '@/components/design-system-sections/molecules/auth-fields-section';
import { AuthFormSection } from '@/components/design-system-sections/molecules/auth-form-section';
import { AuthHeaderSection } from '@/components/design-system-sections/molecules/auth-header-section';
import { CardsSection } from '@/components/design-system-sections/molecules/cards-section';
import { CategoryNavSection } from '@/components/design-system-sections/molecules/category-nav-section';
import { CommentsSection } from '@/components/design-system-sections/molecules/comments-section';
import { DialogsSection } from '@/components/design-system-sections/molecules/dialogs-section';
import { DropdownMenuSection } from '@/components/design-system-sections/molecules/dropdown-section';
import { FilterBarSection } from '@/components/design-system-sections/molecules/filter-bar-section';
import { FormFieldSection } from '@/components/design-system-sections/molecules/form-field-section';
import { HeroContentSection } from '@/components/design-system-sections/molecules/hero-content-section';
import { InputGroupSection } from '@/components/design-system-sections/molecules/input-group-section';
import { SearchBarSection } from '@/components/design-system-sections/molecules/search-bar-section';
import { SocialAuthSection } from '@/components/design-system-sections/molecules/social-auth-section';

export default function MoleculesPage() {
  return (
    <div className='space-y-10'>
      <h1 className='font-heading text-4xl font-bold'>Molecules</h1>
      <p className='text-lg text-muted-foreground'>
        Molecules are combinations of atoms that form reusable components like
        cards and dialogs.
      </p>
      <AccordionSection />
      <Divider />
      <AuthButtonsSection />
      <Divider />
      <AuthFieldsSection />
      <Divider />
      <AuthFormSection />
      <Divider />
      <AuthHeaderSection />
      <Divider />
      <CardsSection />
      <Divider />
      <CategoryNavSection />
      <Divider />
      <CommentsSection />
      <Divider />
      <DialogsSection />
      <Divider />
      <DropdownMenuSection />
      <Divider />
      <FilterBarSection />
      <Divider />
      <FormFieldSection />
      <Divider />
      <HeroContentSection />
      <Divider />
      <InputGroupSection />
      <Divider />
      <SearchBarSection />
      <Divider />
      <SocialAuthSection />
      <Divider />
    </div>
  );
}

function Divider() {
  return <hr className='my-8 border-t border-gray-300 dark:border-gray-700' />;
}
