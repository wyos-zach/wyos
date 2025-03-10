import { AvatarSection } from '@/components/design-system-sections/atoms/avatar-section';
import { BadgeSection } from '@/components/design-system-sections/atoms/badge-section';
import { BreadcrumbSection } from '@/components/design-system-sections/atoms/breadcrumb-section';
import { ButtonSection } from '@/components/design-system-sections/atoms/button-section';
import { CardSection } from '@/components/design-system-sections/atoms/card-section';
import { CheckboxSection } from '@/components/design-system-sections/atoms/checkbox-section';
import { GradientDividerSection } from '@/components/design-system-sections/atoms/gradient-divider-section';
import { HeroTextSection } from '@/components/design-system-sections/atoms/hero-text-section';
import { IconSection } from '@/components/design-system-sections/atoms/icon-section';
import { InputSection } from '@/components/design-system-sections/atoms/input-section';
import { LabelSection } from '@/components/design-system-sections/atoms/label-section';
import { RadioGroupSection } from '@/components/design-system-sections/atoms/radio-group-section';
import { RatingSection } from '@/components/design-system-sections/atoms/rating-section';
import { SelectSection } from '@/components/design-system-sections/atoms/select-section';
import { SkeletonSection } from '@/components/design-system-sections/atoms/skeleton-section';
import { SpinnerSection } from '@/components/design-system-sections/atoms/spinner-section';
import { TabsSection } from '@/components/design-system-sections/atoms/tabs-section';
import { TextareaSection } from '@/components/design-system-sections/atoms/textarea-section';
import { ToastSection } from '@/components/design-system-sections/atoms/toast-section';
import { ToggleSection } from '@/components/design-system-sections/atoms/toggle-section';

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
        <GradientDividerSection />
        <Divider />
        <HeroTextSection />
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
