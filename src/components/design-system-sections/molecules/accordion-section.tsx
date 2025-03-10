import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/design-system/atoms/accordion';

export function AccordionSection() {
  return (
    <section className='space-y-6 px-6 py-12'>
      <h2 className='font-heading text-3xl font-bold text-foreground'>
        Accordion
      </h2>
      <p className='text-muted-foreground'>
        A collapsible component for displaying content in a compact, elegant
        manner.
      </p>

      <Accordion type='single' collapsible className='w-full max-w-md'>
        <AccordionItem value='item-1'>
          <AccordionTrigger>What is the membership platform?</AccordionTrigger>
          <AccordionContent>
            It’s a premium community platform built with Next.js, Appwrite, and
            Stripe, offering a sleek user experience.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-2'>
          <AccordionTrigger>Can I customize it?</AccordionTrigger>
          <AccordionContent>
            Yes, it’s highly customizable with Tailwind CSS and a modular design
            system.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className='text-sm text-muted-foreground'>
        <p>Props:</p>
        <ul className='list-inside list-disc'>
          <li>type: "single" | "multiple" (Accordion)</li>
          <li>collapsible: boolean (Accordion)</li>
          <li>value: string (AccordionItem)</li>
          <li>className: string (all components)</li>
          <li>children: ReactNode (Trigger & Content)</li>
        </ul>
      </div>
    </section>
  );
}
