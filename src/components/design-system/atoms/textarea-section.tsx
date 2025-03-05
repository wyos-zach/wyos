'use client';

import React, { useState } from 'react';
import { Textarea } from '@/components/ui/atoms/textarea';

export function TextareaSection() {
  const [value, setValue] = useState('');

  return (
    <section className='space-y-6 px-6'>
      <h2 className='font-heading text-3xl font-bold'>Textarea</h2>
      <p className='text-muted-foreground'>
        Textarea components allow users to input multi-line text.
      </p>

      {/* Basic Textarea */}
      <div className='space-y-2'>
        <h3 className='text-lg font-semibold'>Basic Textarea</h3>
        <Textarea placeholder='Enter your message here' />
      </div>

      {/* States */}
      <div className='space-y-2'>
        <h3 className='text-lg font-semibold'>States</h3>
        <div className='space-y-2'>
          <Textarea placeholder='Normal state' />
          <Textarea placeholder='Disabled state' disabled />
          <Textarea placeholder='Error state' hasError />
        </div>
      </div>

      {/* Animated Label */}
      <div className='space-y-2'>
        <h3 className='text-lg font-semibold'>Animated Label</h3>
        <Textarea animatedLabel label='Your Message' placeholder=' ' />
      </div>

      {/* Auto-growing */}
      <div className='space-y-2'>
        <h3 className='text-lg font-semibold'>Auto-growing</h3>
        <Textarea
          autoGrow
          placeholder='Start typing to see me grow...'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      {/* Documentation */}
      <div className='text-sm text-gray-500'>
        <p>Props:</p>
        <ul className='list-inside list-disc'>
          <li>value: string</li>
          <li>placeholder: string</li>
          <li>rows: number</li>
          <li>disabled: boolean</li>
          <li>hasError: boolean</li>
          <li>animatedLabel: boolean</li>
          <li>autoGrow: boolean</li>
          <li>label: string</li>
          <li>
            onChange: (event: React.ChangeEvent&lt;HTMLTextAreaElement&gt;)
            =&gt; void
          </li>
        </ul>
      </div>
    </section>
  );
}
