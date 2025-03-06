import { AvatarSection } from '@/components/design-system/atoms/avatar-section';
import { BadgeSection } from '@/components/design-system/atoms/badge-section';
import { ButtonSection } from '@/components/design-system/atoms/buttons-section';
import { CardSection } from '@/components/design-system/atoms/card-section';
import { CheckboxSection } from '@/components/design-system/atoms/checkbox-section';
import { IconSection } from '@/components/design-system/atoms/icon-section';
import { LabelSection } from '@/components/design-system/atoms/label-section';
import { SelectSection } from '@/components/design-system/atoms/select-section';
import { SpinnerSection } from '@/components/design-system/atoms/spinner-section';
import { RatingSection } from '@/components/design-system/atoms/rating-section';
import { TextareaSection } from '@/components/design-system/atoms/textarea-section';
import { InputSection } from '@/components/design-system/atoms/input-section';
import { ToggleSection } from '@/components/design-system/atoms/toggle-section';
import { BreadcrumbSection } from '@/components/design-system/atoms/breadcrumb-section';
import { RadioGroupSection } from '@/components/design-system/atoms/radio-group-section';
import { SkeletonSection } from '@/components/design-system/atoms/skeleton-section';
import { TabsSection } from '@/components/design-system/atoms/tabs-section';
import { ToastSection } from '@/components/design-system/atoms/toast-section';

export default function AtomsPage() {
  return (
    <div className='space-y-10'>
      <h1 className='font-heading text-4xl font-bold'>Atoms</h1>
      <p className='text-lg text-muted-foreground'>
        Basic building blocks of the interface that can't be broken down any
        further without ceasing to be functional.
      </p>

      {/* Sections with dividers */}
      <div className='space-y-10'>
        <AvatarSection />
        <Divider />
        <BadgeSection />
        <Divider />
        <ButtonSection />
        <Divider />
        <BreadcrumbSection />
        <Divider />
        <CardSection />
        <Divider />
        <CheckboxSection />
        <Divider />
        <IconSection />
        <Divider />
        <InputSection />
        <Divider />
        <LabelSection />
        <Divider />
        <RadioGroupSection />
        <Divider />
        <RatingSection />
        <Divider />
        <SelectSection />
        <Divider />
        <SkeletonSection />
        <Divider />
        <SpinnerSection />
        <Divider />
        <TabsSection />
        <Divider />
        <TextareaSection />
        <Divider />
        <ToastSection />
        <Divider />
        <ToggleSection />
        <Divider />
      </div>
    </div>
  );
}

function Divider() {
  return <hr className='my-8 border-t border-gray-300 dark:border-gray-700' />;
}
