import type { Metadata } from 'next';
import { TypographySection } from '@/components/design-system/typography-section';
import { ColorsSection } from '@/components/design-system/colors-section';
import { ButtonsSection } from '@/components/design-system/buttons-section';
import { InputsSection } from '@/components/design-system/inputs-section';
import { CardsSection } from '@/components/design-system/cards-section';
import { DialogsSection } from '@/components/design-system/dialogs-section';
import { ButtonTest } from '@/components/design-system/button-test';
import { KnowledgeGridSection } from '@/components/design-system/grid-section';

export const metadata: Metadata = {
  title: 'Design System | WYOS',
  description: 'A comprehensive showcase of the WYOS design system components',
};

export default function DesignSystemPage() {
  return (
    <div className='container py-10'>
      <h1 className='mb-8 mt-8 font-heading text-4xl font-bold'>
        WYOS Design System
      </h1>
      <p className='mb-10 text-lg'>
        A comprehensive showcase of all UI components, styles, and patterns used
        throughout the WYOS application.
      </p>

      <div className='grid grid-cols-1 gap-8'>
        <section id='navigation' className='space-y-2'>
          <h2 className='font-heading text-2xl font-semibold'>Navigation</h2>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
            <a
              href='#typography'
              className='block rounded-lg border p-4 transition-colors hover:bg-muted'
            >
              Typography
            </a>
            <a
              href='#colors'
              className='block rounded-lg border p-4 transition-colors hover:bg-muted'
            >
              Colors
            </a>
            <a
              href='#buttons'
              className='block rounded-lg border p-4 transition-colors hover:bg-muted'
            >
              Buttons
            </a>
            <a
              href='#inputs'
              className='block rounded-lg border p-4 transition-colors hover:bg-muted'
            >
              Inputs & Forms
            </a>
            <a
              href='#cards'
              className='block rounded-lg border p-4 transition-colors hover:bg-muted'
            >
              Cards
            </a>
            <a
              href='#grid'
              className='block rounded-lg border p-4 transition-colors hover:bg-muted'
            >
              Grid Layout
            </a>
            <a
              href='#dialogs'
              className='block rounded-lg border p-4 transition-colors hover:bg-muted'
            >
              Dialogs & Modals
            </a>
          </div>
        </section>

        <TypographySection />
        <ColorsSection />
        <ButtonsSection />
        <InputsSection />
        <CardsSection />
        <KnowledgeGridSection />
        <DialogsSection />
        <ButtonTest />
      </div>
    </div>
  );
}
