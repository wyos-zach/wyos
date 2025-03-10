'use client';

import { Button } from '@/components/design-system/atoms/button';
import { NavLink } from '@/components/design-system/molecules/Navlink';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { MobileAuthButtons } from '../../z/auth/MobileAuthButtons';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpenAction: (isOpen: boolean) => void;
  isMember: boolean;
}

const memberLinks = [
  { href: '/knowledge', label: 'Knowledge' },
  { href: '/resources', label: 'Resources' },
  { href: '/community', label: 'Community' },
  { href: '/profile', label: 'Profile' },
  { href: '/settings', label: 'Settings' },
  { href: '/billing', label: 'Billing' },
] as const;

const publicLinks = [
  { href: '/about', label: 'About' },
  { href: '/knowledge', label: 'Knowledge' },
  { href: '/resources', label: 'Resources' },
  { href: '/community', label: 'Community' },
  { href: '/membership', label: 'Membership' },
] as const;

export function MobileMenu({
  isOpen,
  setIsOpenAction,
  isMember,
}: MobileMenuProps) {
  const links = isMember ? memberLinks : publicLinks;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpenAction}>
      <SheetTrigger asChild className='md:hidden'>
        <Button
          variant='outline'
          size='sm'
          className='ml-auto p-2 hover:bg-zinc-800/30 hover:text-white'
        >
          <Menu className='h-5 w-5' />
          <span className='sr-only'>Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side='right'
        className='glass-effect rounded-lg border-zinc-800/50 bg-background/95'
      >
        <div className='flex flex-col space-y-6 pt-6'>
          <nav className='mt-12'>
            <ul className='space-y-4'>
              {links.map((link) => (
                <li key={link.href}>
                  <NavLink
                    href={link.href}
                    label={link.label}
                    onClick={() => setIsOpenAction(false)} // Now valid with updated NavLink
                    className='block text-base font-medium tracking-wider'
                  />
                </li>
              ))}
            </ul>
          </nav>
          <MobileAuthButtons
            closeMobileMenuAction={() => setIsOpenAction(false)}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
