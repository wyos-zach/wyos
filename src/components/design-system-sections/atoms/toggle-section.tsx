// src/components/sections/ToggleSection.tsx
'use client';

import { Toggle } from '@/components/design-system/atoms/toggle';
import { cn } from '@/lib/utils';
import { Moon } from '@phosphor-icons/react'; // Use Phosphor Moon icon
import { motion } from 'framer-motion';
import { Sun } from 'lucide-react';
import { useState } from 'react';

export function ToggleSection() {
  const [isToggled, setIsToggled] = useState(false);
  const [theme, setTheme] = useState('light');

  const themeSizes = {
    sm: { container: 'size-8', icon: 14 },
    md: { container: 'size-9', icon: 16 },
    lg: { container: 'size-10', icon: 18 },
  };

  return (
    <section className='space-y-6 px-6'>
      <h2 className='font-heading text-3xl font-bold'>Toggle</h2>
      <p className='text-muted-foreground'>
        Sleek toggles with glassmorphic design and smooth animations for state
        switching.
      </p>

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

      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Variants</h3>
        <div className='flex flex-wrap gap-4'>
          <Toggle variant='default'>Default</Toggle>
          <Toggle variant='outline'>Outline</Toggle>
        </div>
      </div>

      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Sizes</h3>
        <div className='flex flex-wrap gap-4'>
          <Toggle size='sm'>Small</Toggle>
          <Toggle size='default'>Default</Toggle>
          <Toggle size='lg'>Large</Toggle>
        </div>
      </div>

      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Disabled State</h3>
        <Toggle disabled aria-label='Disabled toggle'>
          Disabled
        </Toggle>
      </div>

      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Theme Toggle Example</h3>
        <p className='text-muted-foreground'>
          A polished theme switcher with a classic dark mode moon icon from
          Phosphor.
        </p>
        <div className='flex flex-wrap gap-6'>
          <div className='flex flex-col items-center gap-2'>
            <Toggle
              variant='outline'
              className={cn('group relative', themeSizes.sm.container)}
              pressed={theme === 'dark'}
              onPressedChange={() =>
                setTheme(theme === 'dark' ? 'light' : 'dark')
              }
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <motion.div
                className='absolute inset-0 rounded-md'
                initial={false}
                animate={{
                  boxShadow:
                    theme === 'dark'
                      ? '0 0 8px rgba(var(--primary), 0.3)'
                      : 'none',
                }}
                transition={{ duration: 0.3 }}
              />
              <Moon
                size={themeSizes.sm.icon}
                weight='fill' // Ensures the icon is filled for a solid look
                className='shrink-0 transition-all duration-300 ease-in-out group-data-[state=off]:opacity-0 group-data-[state=on]:opacity-100'
              />
              <Sun
                size={themeSizes.sm.icon}
                strokeWidth={2}
                className='absolute shrink-0 transition-all duration-300 ease-in-out group-data-[state=off]:opacity-100 group-data-[state=on]:opacity-0'
              />
            </Toggle>
            <span className='text-xs text-muted-foreground'>Small</span>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <Toggle
              variant='outline'
              className={cn('group relative', themeSizes.md.container)}
              pressed={theme === 'dark'}
              onPressedChange={() =>
                setTheme(theme === 'dark' ? 'light' : 'dark')
              }
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <motion.div
                className='absolute inset-0 rounded-md'
                initial={false}
                animate={{
                  boxShadow:
                    theme === 'dark'
                      ? '0 0 8px rgba(var(--primary), 0.3)'
                      : 'none',
                }}
                transition={{ duration: 0.3 }}
              />
              <Moon
                size={themeSizes.md.icon}
                weight='fill'
                className='shrink-0 transition-all duration-300 ease-in-out group-data-[state=off]:opacity-0 group-data-[state=on]:opacity-100'
              />
              <Sun
                size={themeSizes.md.icon}
                strokeWidth={2}
                className='absolute shrink-0 transition-all duration-300 ease-in-out group-data-[state=off]:opacity-100 group-data-[state=on]:opacity-0'
              />
            </Toggle>
            <span className='text-xs text-muted-foreground'>
              Medium (Default)
            </span>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <Toggle
              variant='outline'
              className={cn('group relative', themeSizes.lg.container)}
              pressed={theme === 'dark'}
              onPressedChange={() =>
                setTheme(theme === 'dark' ? 'light' : 'dark')
              }
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <motion.div
                className='absolute inset-0 rounded-md'
                initial={false}
                animate={{
                  boxShadow:
                    theme === 'dark'
                      ? '0 0 8px rgba(var(--primary), 0.3)'
                      : 'none',
                }}
                transition={{ duration: 0.3 }}
              />
              <Moon
                size={themeSizes.lg.icon}
                weight='fill'
                className='shrink-0 transition-all duration-300 ease-in-out group-data-[state=off]:opacity-0 group-data-[state=on]:opacity-100'
              />
              <Sun
                size={themeSizes.lg.icon}
                strokeWidth={2}
                className='absolute shrink-0 transition-all duration-300 ease-in-out group-data-[state=off]:opacity-100 group-data-[state=on]:opacity-0'
              />
            </Toggle>
            <span className='text-xs text-muted-foreground'>Large</span>
          </div>
        </div>
        <p className='text-sm text-muted-foreground'>Current Theme: {theme}</p>
      </div>

      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Custom Toggle Example</h3>
        <p className='text-muted-foreground'>
          A custom toggle using the base Toggle component.
        </p>
        <Toggle
          variant='default'
          className='group size-9'
          pressed={isToggled}
          onPressedChange={() => setIsToggled(!isToggled)}
          aria-label={`Custom toggle is ${isToggled ? 'on' : 'off'}`}
        >
          {isToggled ? 'On' : 'Off'}
        </Toggle>
      </div>

      <div className='text-sm text-gray-500'>
        <p>Props:</p>
        <ul className='list-inside list-disc'>
          <li>pressed: boolean</li>
          <li>onPressedChange: (pressed: boolean) =&gt; void</li>
          <li>variant: "default" | "outline"</li>
          <li>size: "sm" | "default" | "lg"</li>
          <li>disabled: boolean</li>
          <li>className: string</li>
        </ul>
      </div>
    </section>
  );
}
