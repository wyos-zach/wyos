'use client';

import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center justify-between rounded-md border border-[rgba(255,255,255,0.05)] bg-[rgba(24,24,27,0.95)] px-3 py-2 text-sm font-medium text-foreground shadow-sm shadow-black/5 transition-colors hover:bg-[rgba(59,130,246,0.05)]',
      'focus:outline-none focus:ring-2 focus:ring-primary/50',
      className
    )}
    {...props}
  >
    {children}
    <ChevronDown className='ml-2 h-4 w-4 text-muted-foreground transition-transform duration-200' />
  </DropdownMenuPrimitive.Trigger>
));
DropdownMenuTrigger.displayName = DropdownMenuPrimitive.Trigger.displayName;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, align = 'end', ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      align={align}
      className={cn(
        'z-50 min-w-[12rem] overflow-hidden rounded-md border border-[rgba(255,255,255,0.05)] bg-[rgba(24,24,27,0.95)] shadow-lg',
        'animate-fadelnUp gradient-border relative',
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    description?: string;
  }
>(({ className, children, description, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-pointer select-none flex-col px-3 py-2 text-sm font-medium text-foreground transition-colors',
      'from-[rgba(59,130,246,0.1)] to-transparent hover:bg-gradient-to-r',
      'from-[rgba(59,130,246,0.15)] to-transparent focus:bg-gradient-to-r',
      'outline-none',
      className
    )}
    {...props}
  >
    <span>{children}</span>
    {description && (
      <span className='mt-1 text-xs text-muted-foreground'>{description}</span>
    )}
  </DropdownMenuPrimitive.Item>
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
};
