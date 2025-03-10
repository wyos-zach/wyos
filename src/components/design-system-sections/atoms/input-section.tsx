'use client';

import { Input } from '@/components/design-system/atoms/input';
import { useState } from 'react';

export function InputSection() {
  const [value, setValue] = useState('');

  return (
    <section className='space-y-6 px-6'>
      <h2 className='font-heading text-3xl font-bold'>Input</h2>
      <p className='text-muted-foreground'>
        Input components allow users to input single-line text.
      </p>

      {/* Basic Input */}
      <div className='space-y-2'>
        <h3 className='text-lg font-semibold'>Basic Input</h3>
        <Input
          type='text'
          placeholder='Enter your text here'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      {/* States */}
      <div className='space-y-2'>
        <h3 className='text-lg font-semibold'>States</h3>
        <div className='space-y-2'>
          <Input type='text' placeholder='Normal state' />
          <Input type='text' placeholder='Disabled state' disabled />
          <Input
            type='text'
            placeholder='Error state'
            className='border-destructive'
          />
        </div>
      </div>

      {/* Input with Animated Label */}
      <div className='space-y-2'>
        <h3 className='text-lg font-semibold'>Input with Animated Label</h3>
        <Input label='Your Name' />
        <Input label='Email' type='email' error='Please enter a valid email' />
      </div>

      {/* Documentation */}
      <div className='text-sm text-gray-500'>
        <p>Props:</p>
        <ul className='list-inside list-disc'>
          <li>type: string (e.g., "text", "password")</li>
          <li>value: string</li>
          <li>placeholder: string</li>
          <li>disabled: boolean</li>
          <li>className: string</li>
          <li>
            onChange: (event: React.ChangeEvent&lt;HTMLInputElement&gt;) = void
          </li>
          <li>label: string (optional, adds animated label)</li>
          <li>error: string (optional, shows error message)</li>
        </ul>
      </div>
    </section>
  );
}
