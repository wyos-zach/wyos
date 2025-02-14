import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { MobileAuthButtons } from '../MobileAuthButtons';

type NavLink = {
  href: string;
  label: string;
};

type MobileMenuProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  links: NavLink[];
};

export function MobileMenu({ isOpen, setIsOpen, links }: MobileMenuProps) {
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
          {links.map((link) => (
            <motion.div
              key={link.href}
              whileHover={{ x: 4 }}
              className='border-b border-zinc-800/20 pb-4'
            >
              <Link
                href={link.href}
                className='text-sm font-medium tracking-wide text-zinc-400 transition-colors hover:text-white'
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
          <MobileAuthButtons closeMobileMenu={() => setIsOpen(false)} />
        </motion.div>
      </SheetContent>
    </Sheet>
  );
}
