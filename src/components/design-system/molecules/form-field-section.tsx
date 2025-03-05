'use client';
import * as React from 'react';
import { FormField } from '@/components/ui/molecules/FormField';
import { Input } from '@/components/ui/atoms/input'; // Your atom (assuming renamed from Input)
import { Checkbox } from '@/components/ui/atoms/checkbox'; // Your atom

export function FormFieldSection() {
  const textInputRef = React.useRef<HTMLInputElement>(null);
  const checkboxRef = React.useRef<HTMLInputElement>(null);

  return (
    <section className='space-y-4'>
      <h2 className='text-2xl font-semibold text-foreground'>FormField</h2>
      <p className='text-muted-foreground'>
        A premium form field component with glassmorphic styling, supporting
        normal and error states, used for input grouping.
      </p>
      <div className='space-y-6 rounded-lg border border-zinc-700/20 bg-background p-4'>
        {/* Normal State with TextInput */}
        <FormField label='Username' htmlFor='username-demo' ref={textInputRef}>
          <Input placeholder='Enter your username' />
        </FormField>
        {/* Error State with TextInput */}
        <FormField
          label='Email'
          htmlFor='email-demo'
          error='Invalid email address'
          ref={textInputRef}
        >
          <Input placeholder='Enter your email' />
        </FormField>
        {/* Normal State with Checkbox */}
        <FormField
          label='Agree to terms'
          htmlFor='terms-demo'
          ref={checkboxRef}
        >
          <Checkbox />
        </FormField>
      </div>
      <div className='text-sm text-muted-foreground'>
        <p>
          <strong>Props:</strong>
        </p>
        <ul className='list-disc pl-5'>
          <li>
            <code>label</code>: Field label text
          </li>
          <li>
            <code>htmlFor</code>: ID linking label to input
          </li>
          <li>
            <code>children</code>: Input component (e.g., TextInput, Checkbox)
          </li>
          <li>
            <code>error</code>: Optional error message
          </li>
        </ul>
        <p>
          <strong>States:</strong> Normal (clean), Error (red highlights)
        </p>
      </div>
    </section>
  );
}
