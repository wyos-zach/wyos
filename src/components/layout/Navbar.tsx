'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigationLinks = [
  { href: '/about', label: 'About' },
  { href: '/knowledge', label: 'Knowledge' },
  { href: '/resources', label: 'Resources' },
  { href: '/community', label: 'Community' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container mx-auto'>
        <nav className='flex h-16 items-center justify-between'>
          {/* Logo */}
          <Link href='/' className='flex items-center space-x-2'>
            <span className='text-xl font-bold'>WYOS</span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className='hidden md:flex md:items-center md:justify-center md:gap-8'>
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className='hidden md:flex md:items-center md:gap-4'>
            <Link href='/login'>
              <Button variant='ghost'>Login</Button>
            </Link>
            <Link href='/register'>
              <Button>Sign up</Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className='md:hidden'>
              <Button variant='ghost' size='icon' className='ml-auto'>
                <Menu className='h-6 w-6' />
                <span className='sr-only'>Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side='right'>
              <div className='flex flex-col space-y-4'>
                {navigationLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link href='/login' onClick={() => setIsOpen(false)}>
                  <Button variant='ghost' className='w-full'>
                    Login
                  </Button>
                </Link>
                <Link href='/register' onClick={() => setIsOpen(false)}>
                  <Button className='w-full'>Sign up</Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
}
