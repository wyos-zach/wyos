// src/components/sections/LabelSection.tsx
import { Label } from '@/components/design-system/atoms/label';

export function LabelSection() {
  return (
    <section className='space-y-6 px-6'>
      <h2 className='font-heading text-3xl font-bold'>Label</h2>
      <p className='text-muted-foreground'>
        Elegant labels with gradient text and subtle animations for form
        context.
      </p>

      <div className='space-y-6'>
        <div>
          <h3 className='mb-2 text-lg font-semibold'>Normal State</h3>
          <div className='rounded-xl border border-zinc-700/30 bg-gradient-to-br from-zinc-900/70 to-zinc-800/50 p-4 shadow-md backdrop-blur-sm'>
            <Label htmlFor='username' className='mb-2 block'>
              Username
            </Label>
            <input
              id='username'
              type='text'
              className='w-full rounded-lg border border-zinc-700/40 bg-zinc-900/50 px-3 py-2 text-foreground transition-all duration-200 placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50'
              placeholder='Enter username'
            />
          </div>
        </div>

        <div>
          <h3 className='mb-2 text-lg font-semibold'>Required State</h3>
          <div className='rounded-xl border border-zinc-700/30 bg-gradient-to-br from-zinc-900/70 to-zinc-800/50 p-4 shadow-md backdrop-blur-sm'>
            <Label htmlFor='email' required className='mb-2 block'>
              Email Address
            </Label>
            <input
              id='email'
              type='email'
              className='w-full rounded-lg border border-zinc-700/40 bg-zinc-900/50 px-3 py-2 text-foreground transition-all duration-200 placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50'
              placeholder='Enter email'
              required
            />
          </div>
        </div>
      </div>

      <div className='text-sm text-gray-500'>
        <p className='mb-1 font-semibold'>Props:</p>
        <ul className='list-inside list-disc'>
          <li>htmlFor: string (ID of the associated input element)</li>
          <li>children: ReactNode (content inside the label)</li>
          <li>required: boolean (indicates if the field is required)</li>
          <li>className: string (additional CSS classes)</li>
        </ul>
      </div>
    </section>
  );
}
