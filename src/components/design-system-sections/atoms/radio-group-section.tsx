'use client';

import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/design-system/atoms/radio-group';
import React from 'react';

export function RadioGroupSection() {
  const [value, setValue] = React.useState('option1');

  return (
    <section className='space-y-6 border-t border-zinc-700/30 px-6 py-8'>
      <h2 className='font-heading text-3xl font-bold text-zinc-100'>
        Radio Group
      </h2>
      <p className='text-zinc-400'>
        Radio groups allow single selection from multiple options. Used for
        forms or filters.
      </p>

      {/* Demo 1: Basic Usage */}
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold text-zinc-200'>Basic Selection</h3>
        <RadioGroup
          value={value}
          onValueChange={setValue}
          aria-label='Select an option'
        >
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='option1' id='option1' />
            <label htmlFor='option1' className='text-zinc-100'>
              Option 1
            </label>
          </div>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='option2' id='option2' />
            <label htmlFor='option2' className='text-zinc-100'>
              Option 2
            </label>
          </div>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='option3' id='option3' />
            <label htmlFor='option3' className='text-zinc-100'>
              Option 3
            </label>
          </div>
        </RadioGroup>
      </div>

      {/* Demo 2: Disabled State */}
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold text-zinc-200'>Disabled State</h3>
        <RadioGroup value='disabled' disabled aria-label='Disabled options'>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='disabled' id='disabled' />
            <label htmlFor='disabled' className='text-zinc-400'>
              Disabled Option
            </label>
          </div>
        </RadioGroup>
      </div>

      <div className='text-sm text-zinc-500'>
        <p>Props:</p>
        <ul className='list-inside list-disc'>
          <li>value: string (selected value)</li>
          <li>
            onValueChange: function(value: string): void (updates selection)
          </li>
          <li>disabled: boolean (disables group or item)</li>
        </ul>
      </div>
    </section>
  );
}
