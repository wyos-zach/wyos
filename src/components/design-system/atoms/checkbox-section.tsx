import React from 'react';
import {
  Checkbox,
  GradientCheckbox,
  TransformerCheckbox,
  AnimatedCheckbox,
} from '@/components/ui/atoms/checkbox';

export function CheckboxSection() {
  return (
    <section className='space-y-6 px-6'>
      <h2 className='font-heading text-3xl font-bold'>Checkbox</h2>
      <p className='text-muted-foreground'>
        Checkboxes allow users to toggle options on or off.
      </p>

      {/* Default Checkbox */}
      <div>
        <h3 className='text-lg font-semibold'>Default Checkbox</h3>
        <div className='flex flex-wrap gap-4'>
          <Checkbox id='default-checkbox' />
          <Checkbox id='checked-checkbox' checked />
          <Checkbox id='disabled-checkbox' disabled />
        </div>
      </div>

      {/* Gradient Checkbox */}
      <div>
        <h3 className='text-lg font-semibold'>Gradient Checkbox</h3>
        <div className='flex flex-wrap gap-4'>
          <GradientCheckbox id='gradient-checkbox' />
          <GradientCheckbox id='gradient-checked-checkbox' checked />
          <GradientCheckbox id='gradient-disabled-checkbox' disabled />
        </div>
      </div>

      {/* Transformer Checkbox */}
      <div>
        <h3 className='text-lg font-semibold'>Transformer Checkbox</h3>
        <div className='flex flex-wrap gap-4'>
          <TransformerCheckbox id='transformer-checkbox' />
          <TransformerCheckbox id='transformer-checked-checkbox' checked />
          <TransformerCheckbox id='transformer-disabled-checkbox' disabled />
        </div>
      </div>

      {/* Animated Checkbox */}
      <div>
        <h3 className='text-lg font-semibold'>Animated Checkbox</h3>
        <div className='flex flex-wrap gap-4'>
          <AnimatedCheckbox id='animated-checkbox' />
          <AnimatedCheckbox id='animated-checked-checkbox' checked />
          <AnimatedCheckbox id='animated-disabled-checkbox' disabled />
        </div>
      </div>

      {/* Documentation */}
      <div className='text-sm text-gray-500'>
        <p>Props:</p>
        <ul className='list-inside list-disc'>
          <li>id: string (unique identifier for the checkbox)</li>
          <li>checked: boolean (whether the checkbox is checked)</li>
          <li>label: string (optional label for accessibility)</li>
          <li>disabled: boolean (whether the checkbox is disabled)</li>
          <li>onChange: function (callback for state changes)</li>
        </ul>
      </div>
    </section>
  );
}
