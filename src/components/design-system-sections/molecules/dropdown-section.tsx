'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/design-system/atoms/dropdown';
import React from 'react';

export function DropdownMenuSection() {
  const [selected, setSelected] = React.useState('Profile');

  return (
    <section className='space-y-6 px-6 py-12'>
      <h2 className='font-heading text-3xl font-bold text-foreground'>
        Dropdown Menu
      </h2>
      <p className='text-muted-foreground'>
        A sleek, premium dropdown menu with sharp design and subtle gradients.
      </p>

      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>{selected}</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => setSelected('Profile')}>
              Profile
              <span className='mt-1 text-xs text-muted-foreground'>
                View your profile details.
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setSelected('Billing')}>
              Billing
              <span className='mt-1 text-xs text-muted-foreground'>
                Manage your payment methods.
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setSelected('Settings')}>
              Settings
              <span className='mt-1 text-xs text-muted-foreground'>
                Customize your preferences.
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className='text-sm text-muted-foreground'>
        <p>Props:</p>
        <ul className='list-inside list-disc'>
          <li>className: string (all components)</li>
          <li>sideOffset: number (Content)</li>
          <li>align: "start" | "end" | "center" (Content)</li>
          <li>description: string (Item, optional)</li>
          <li>children: ReactNode (Trigger & Content)</li>
        </ul>
      </div>
    </section>
  );
}
