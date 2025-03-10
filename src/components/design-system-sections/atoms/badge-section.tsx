import { Badge } from '@/components/design-system/atoms/Badge';

export function BadgeSection() {
  return (
    <section className='space-y-6 px-6'>
      <h2 className='font-heading text-2xl font-bold'>Badge</h2>
      <p className='text-muted-foreground'>
        A sleek, premium badge with subtle gradients and glassmorphism for
        highlighting content.
      </p>

      <div className='flex flex-wrap gap-4'>
        <Badge variant='default'>Default</Badge>
        <Badge variant='secondary'>Secondary</Badge>
        <Badge variant='destructive'>Destructive</Badge>
        <Badge variant='outline'>Outline</Badge>
      </div>

      <div className='text-sm text-gray-500'>
        <p>Props:</p>
        <ul className='list-inside list-disc'>
          <li>variant: "default" | "secondary" | "destructive" | "outline"</li>
          <li>className: string (optional)</li>
          <li>children: ReactNode</li>
        </ul>
      </div>
    </section>
  );
}
