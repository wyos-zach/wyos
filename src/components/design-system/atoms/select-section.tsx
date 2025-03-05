'use client';

import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/atoms/select';

const CustomSelect = React.forwardRef<
  HTMLButtonElement,
  {
    options: { value: string; label: string }[];
    value: string;
    placeholder?: string;
    disabled?: boolean;
    onChange: (value: string) => void;
  }
>(({ options, value, placeholder, disabled, onChange }, ref) => (
  <Select value={value} onValueChange={onChange} disabled={disabled}>
    <SelectTrigger ref={ref}>
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
      {options.map((option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
));

CustomSelect.displayName = 'CustomSelect';

export function SelectSection() {
  const [value, setValue] = useState('');
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  return (
    <section className='space-y-6 px-6'>
      <h2 className='font-heading text-3xl font-bold'>Select</h2>
      <p className='text-muted-foreground'>
        Select components allow users to choose from a list of options.
      </p>

      <div className='space-y-4'>
        <div>
          <h3 className='mb-2 text-lg font-semibold'>Normal State</h3>
          <CustomSelect
            options={options}
            value={value}
            onChange={setValue}
            placeholder='Choose an option'
          />
        </div>

        <div>
          <h3 className='mb-2 text-lg font-semibold'>Disabled State</h3>
          <CustomSelect
            options={options}
            value=''
            onChange={() => {}}
            placeholder='Disabled select'
            disabled
          />
        </div>
      </div>

      <div className='text-sm text-gray-500'>
        <p className='mb-1 font-semibold'>Props:</p>
        <ul className='list-inside list-disc'>
          <li>options: Array of option objects (value and label)</li>
          <li>value: string (currently selected value)</li>
          <li>placeholder: string (placeholder text)</li>
          <li>disabled: boolean (disables the select)</li>
          <li>onChange: function (callback for value changes)</li>
        </ul>
      </div>
    </section>
  );
}
