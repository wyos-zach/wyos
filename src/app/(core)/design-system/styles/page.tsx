import { ColorsSection } from '@/components/design-system-sections/styles/colors-section';
import { TypographySection } from '@/components/design-system-sections/styles/typography-section';

export default function StylesPage() {
  return (
    <div className='space-y-10'>
      <h1 className='font-heading text-4xl font-bold'>Styles</h1>
      <p className='text-lg text-muted-foreground'>
        Styles define the foundational visual language of the application,
        including colors and typography.
      </p>
      <TypographySection />
      <ColorsSection />
    </div>
  );
}
