'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShinyButton } from '@/components/ui/shiny-button';
import { cn } from '@/lib/utils';

const navigationLinks = [
  { href: '/about', label: 'About' },
  { href: '/knowledge', label: 'Knowledge' },
  { href: '/resources', label: 'Resources' },
  { href: '/community', label: 'Community' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed top-0 z-50 w-full',
        'border-b border-zinc-800/20',
        'bg-gradient-to-b from-background/95 to-background/90',
        'backdrop-blur-xl',
        isScrolled && 'shadow-[0_0_15px_rgba(30,58,138,0.1)]'
      )}
    >
      <div className='container mx-auto px-4'>
        <nav className='flex h-20 items-center justify-between'>
          {/* Logo with glitch effect */}
          <Link href='/' className='group relative'>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className='relative z-10 text-2xl font-bold tracking-tighter'
            >
              <span className='bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent'>
                WYOS
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex md:items-center md:gap-10'>
            <AnimatePresence>
              {navigationLinks.map((link) => (
                <motion.div
                  key={link.href}
                  onHoverStart={() => setActiveLink(link.href)}
                  onHoverEnd={() => setActiveLink('')}
                  className='relative'
                >
                  <Link href={link.href} className='group relative px-4 py-2'>
                    <span className='relative z-10 text-sm font-medium tracking-wide text-zinc-400 transition-colors duration-200 group-hover:text-white'>
                      {link.label}
                    </span>
                    {activeLink === link.href && (
                      <motion.span
                        layoutId='navHighlight'
                        className='absolute inset-0 -z-10 rounded-md bg-blue-950/30'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Auth Buttons */}
          <div className='hidden md:flex md:items-center md:gap-4'>
            <Link href='/login'>
              <Button
                variant='ghost'
                className='font-medium tracking-wide text-zinc-400 hover:bg-blue-950/30 hover:text-white'
              >
                Login
              </Button>
            </Link>
            <Link href='/register'>
              <ShinyButton className='font-medium tracking-wide'>
                Get Started
              </ShinyButton>
            </Link>
          </div>

          {/* Mobile Menu */}
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
                {navigationLinks.map((link) => (
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
                <div className='pt-4'>
                  <Link href='/login' onClick={() => setIsOpen(false)}>
                    <Button variant='ghost' className='w-full'>
                      Login
                    </Button>
                  </Link>
                  <Link href='/register' onClick={() => setIsOpen(false)}>
                    <ShinyButton className='mt-4 w-full'>
                      Write Your Story
                    </ShinyButton>
                  </Link>
                </div>
              </motion.div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </motion.header>
  );
}
