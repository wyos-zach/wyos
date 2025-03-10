'use client';

import { Button } from '@/components/ui/atoms/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MobileAuthButtons } from '../../auth/MobileAuthButtons';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpenAction: (isOpen: boolean) => void;
  isMember: boolean;
}

const memberLinks = [
  { href: '/knowledge', label: 'Knowledge' },
  { href: '/resources', label: 'Resources' },
  { href: '/community', label: 'Community' },
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
  const pathname = usePathname();
  const links = isMember ? memberLinks : publicLinks;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpenAction}>
      <SheetTrigger asChild className='md:hidden'>
        <Button
          variant='outline'
          size='sm'
          className='ml-auto p-2 hover:bg-blue-950/30 hover:text-white'
        >
          <Menu className='h-5 w-5' />
          <span className='sr-only'>Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side='right'
        className='rounded-lg border-zinc-800/50 bg-background/95 backdrop-blur-2xl'
      >
        <motion.div
          className='flex flex-col space-y-6 pt-6'
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ staggerChildren: 0.1 }}
        >
          <nav className='mt-12'>
            <ul className='space-y-4'>
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpenAction(false)}
                    className={cn(
                      'block text-base font-medium tracking-wide text-zinc-400 transition-colors duration-150 hover:text-white',
                      pathname === link.href && 'text-white'
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <MobileAuthButtons
            closeMobileMenuAction={() => setIsOpenAction(false)}
          />
        </motion.div>
      </SheetContent>
    </Sheet>
  );
}
