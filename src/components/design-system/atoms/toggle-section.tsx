'use client';

import React, { useState } from 'react';
import { Toggle } from '@/components/ui/atoms/toggle';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ToggleSection() {
  const [isToggled, setIsToggled] = useState(false);
  const [theme, setTheme] = useState('light');

  // Theme toggle sizes
  const themeSizes = {
    sm: { container: 'size-8', icon: 14 },
    md: { container: 'size-9', icon: 16 },
    lg: { container: 'size-10', icon: 18 },
  };

  return (
    <section className='space-y-6 px-6'>
      <h2 className='font-heading text-3xl font-bold'>Toggle</h2>
      <p className='text-muted-foreground'>
        Toggle components allow users to switch between two states, including
        theme switching.
      </p>

      {/* Basic Toggle */}
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Basic Toggle</h3>
        <Toggle
          pressed={isToggled}
          onPressedChange={() => setIsToggled(!isToggled)}
          aria-label={`Toggle is ${isToggled ? 'on' : 'off'}`}
        >
          {isToggled ? 'On' : 'Off'}
        </Toggle>
        <p className='text-sm text-muted-foreground'>
          State: {isToggled ? 'On' : 'Off'}
        </p>
      </div>

      {/* Variants */}
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Variants</h3>
        <div className='flex flex-wrap gap-4'>
          <Toggle variant='default'>Default</Toggle>
          <Toggle variant='outline'>Outline</Toggle>
        </div>
      </div>

      {/* Sizes */}
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Sizes</h3>
        <div className='flex flex-wrap gap-4'>
          <Toggle size='sm'>Small</Toggle>
          <Toggle size='default'>Default</Toggle>
          <Toggle size='lg'>Large</Toggle>
        </div>
      </div>

      {/* Disabled State */}
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Disabled State</h3>
        <Toggle disabled aria-label='Disabled toggle'>
          Disabled
        </Toggle>
      </div>

      {/* Theme Toggle */}
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Theme Toggle Example</h3>
        <p className='text-muted-foreground'>
          A specialized toggle for switching between light and dark themes using
          the base Toggle component.
        </p>
        <div className='flex flex-wrap gap-6'>
          <div className='flex flex-col items-center gap-2'>
            <Toggle
              variant='outline'
              className={cn(
                'group data-[state=on]:bg-transparent data-[state=on]:hover:bg-muted',
                themeSizes.sm.container
              )}
              pressed={theme === 'dark'}
              onPressedChange={() =>
                setTheme(theme === 'dark' ? 'light' : 'dark')
              }
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <Moon
                size={themeSizes.sm.icon}
                strokeWidth={2}
                className='shrink-0 scale-0 opacity-0 transition-all group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100'
                aria-hidden='true'
              />
              <Sun
                size={themeSizes.sm.icon}
                strokeWidth={2}
                className='absolute shrink-0 scale-100 opacity-100 transition-all group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0'
                aria-hidden='true'
              />
            </Toggle>
            <span className='text-xs text-muted-foreground'>Small</span>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <Toggle
              variant='outline'
              className={cn(
                'group data-[state=on]:bg-transparent data-[state=on]:hover:bg-muted',
                themeSizes.md.container
              )}
              pressed={theme === 'dark'}
              onPressedChange={() =>
                setTheme(theme === 'dark' ? 'light' : 'dark')
              }
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <Moon
                size={themeSizes.md.icon}
                strokeWidth={2}
                className='shrink-0 scale-0 opacity-0 transition-all group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100'
                aria-hidden='true'
              />
              <Sun
                size={themeSizes.md.icon}
                strokeWidth={2}
                className='absolute shrink-0 scale-100 opacity-100 transition-all group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0'
                aria-hidden='true'
              />
            </Toggle>
            <span className='text-xs text-muted-foreground'>
              Medium (Default)
            </span>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <Toggle
              variant='outline'
              className={cn(
                'group data-[state=on]:bg-transparent data-[state=on]:hover:bg-muted',
                themeSizes.lg.container
              )}
              pressed={theme === 'dark'}
              onPressedChange={() =>
                setTheme(theme === 'dark' ? 'light' : 'dark')
              }
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <Moon
                size={themeSizes.lg.icon}
                strokeWidth={2}
                className='shrink-0 scale-0 opacity-0 transition-all group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100'
                aria-hidden='true'
              />
              <Sun
                size={themeSizes.lg.icon}
                strokeWidth={2}
                className='absolute shrink-0 scale-100 opacity-100 transition-all group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0'
                aria-hidden='true'
              />
            </Toggle>
            <span className='text-xs text-muted-foreground'>Large</span>
          </div>
        </div>
        <p className='text-sm text-muted-foreground'>Current Theme: {theme}</p>
      </div>

      {/* Custom Toggle Example */}
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Other Custom Toggle Example</h3>
        <p className='text-muted-foreground'>
          You can create any custom toggle using the base Toggle component.
        </p>
        <Toggle
          variant='outline'
          className='group size-9 data-[state=on]:bg-transparent data-[state=on]:hover:bg-muted'
          pressed={isToggled}
          onPressedChange={() => setIsToggled(!isToggled)}
          aria-label={`Custom toggle is ${isToggled ? 'on' : 'off'}`}
        >
          <Moon
            size={16}
            strokeWidth={2}
            className='shrink-0 scale-0 opacity-0 transition-all group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100'
            aria-hidden='true'
          />
          <Sun
            size={16}
            strokeWidth={2}
            className='absolute shrink-0 scale-100 opacity-100 transition-all group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0'
            aria-hidden='true'
          />
        </Toggle>
      </div>

      {/* Documentation */}
      <div className='text-sm text-gray-500'>
        <p>Props:</p>
        <ul className='list-inside list-disc'>
          <li>pressed: boolean</li>
          <li>onPressedChange: (pressed: boolean) {'=>'} void</li>
          <li>variant: "default" | "outline"</li>
          <li>size: "sm" | "default" | "lg"</li>
          <li>disabled: boolean</li>
          <li>className: string</li>
        </ul>
      </div>
    </section>
  );
}
