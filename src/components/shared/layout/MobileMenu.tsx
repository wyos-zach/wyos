import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { MobileAuthButtons } from '../MobileAuthButtons';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
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
  { href: '/pricing', label: 'Benefits' },
] as const;

export function MobileMenu({ isOpen, setIsOpen, isMember }: MobileMenuProps) {
  const pathname = usePathname();
  const links = isMember ? memberLinks : publicLinks;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className='md:hidden'>
        <Button
          variant='ghost'
          size='icon'
          className='ml-auto hover:bg-blue-950/30'
        >
          <Menu className='h-5 w-5' />
          <span className='sr-only'>Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side='right'
        className='border-zinc-800/50 bg-background/95 backdrop-blur-2xl'
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
                    onClick={() => setIsOpen(false)}
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
          <MobileAuthButtons closeMobileMenu={() => setIsOpen(false)} />
        </motion.div>
      </SheetContent>
    </Sheet>
  );
}
