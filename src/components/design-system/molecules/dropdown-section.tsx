'use client';

import React from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
} from '@/components/ui/molecules/dropdown';

export function DropdownMenuSection() {
  const [checked, setChecked] = React.useState(false);
  const [radioValue, setRadioValue] = React.useState('default');

  return (
    <section className='space-y-6 px-6 py-12'>
      <h2 className='font-heading text-3xl font-bold text-foreground'>
        Dropdown Menu
      </h2>
      <p className='text-muted-foreground'>
        A sharp, elegant dropdown menu with subtle premium styling.
      </p>

      <div className='relative'>
        <DropdownMenu>
          <DropdownMenuTrigger className='inline-flex items-center justify-center rounded-md border border-[rgba(255,255,255,0.05)] bg-[rgba(24,24,27,0.95)] px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-[rgba(59,130,246,0.05)]'>
            Open Menu
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={checked}
              onCheckedChange={setChecked}
            >
              Notifications
            </DropdownMenuCheckboxItem>
            <DropdownMenuRadioGroup
              value={radioValue}
              onValueChange={setRadioValue}
            >
              <DropdownMenuLabel>Theme</DropdownMenuLabel>
              <DropdownMenuRadioItem value='light'>Light</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='dark'>Dark</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className='text-sm text-muted-foreground'>
        <p>Props:</p>
        <ul className='list-inside list-disc'>
          <li>sideOffset: number (Content)</li>
          <li>className: string (all components)</li>
          <li>children: ReactNode (Trigger & Content)</li>
          <li>checked: boolean (CheckboxItem)</li>
          <li>value: string (RadioItem)</li>
        </ul>
      </div>
    </section>
  );
}
