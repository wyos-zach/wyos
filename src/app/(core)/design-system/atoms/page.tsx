import { AvatarSection } from '@/components/design-system/atoms/avatar-section';
import { BadgeSection } from '@/components/design-system/atoms/badge-section';
import { ButtonSection } from '@/components/design-system/atoms/buttons-section';

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
      </div>
    </div>
  );
}

function Divider() {
  return <hr className='my-8 border-t border-gray-300 dark:border-gray-700' />;
}
