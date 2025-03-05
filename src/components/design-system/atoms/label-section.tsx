import React from 'react';
import { Label } from '@/components/ui/atoms/label';

export function LabelSection() {
  return (
    <section className='space-y-6 px-6'>
      <h2 className='font-heading text-3xl font-bold'>Label</h2>
      <p className='text-muted-foreground'>
        Labels provide context and improve accessibility for form inputs.
      </p>

      <div className='space-y-4'>
        <div>
          <h3 className='mb-2 text-lg font-semibold'>Normal State</h3>
          <div className='rounded-lg p-4 shadow-md'>
            <Label htmlFor='username' className='mb-2 block'>
              Username
            </Label>
            <input
              id='username'
              type='text'
              className='w-full rounded border px-3 py-2'
              placeholder='Enter username'
            />
          </div>
        </div>

        <div>
          <h3 className='mb-2 text-lg font-semibold'>Required State</h3>
          <div className='rounded-lg p-4 shadow-md'>
            <Label htmlFor='email' required className='mb-2 block'>
              Email Address
            </Label>
            <input
              id='email'
              type='email'
              className='w-full rounded border px-3 py-2'
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
