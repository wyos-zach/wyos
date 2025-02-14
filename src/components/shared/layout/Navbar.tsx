'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Icon } from '../Icon';
import { DesktopNavLinks } from './DesktopNavLinks';
import { AuthButtons } from '../AuthButtons';
import { MobileMenu } from './MobileMenu';
import { useScroll } from '@/lib/hooks/shared/useScroll';

export function Navbar() {
  const isScrolled = useScroll(20);
  const [isOpen, setIsOpen] = useState(false);

  const navigationLinks = [
    { href: '/about', label: 'About' },
    { href: '/knowledge', label: 'Knowledge' },
    { href: '/resources', label: 'Resources' },
    { href: '/community', label: 'Community' },
    { href: '/pricing', label: 'Benefits' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed top-0 z-50 w-full transition-colors duration-200',
        isScrolled
          ? 'bg-background/90 shadow-md backdrop-blur-lg'
          : 'bg-transparent'
      )}
    >
      <div className='container mx-auto flex h-16 items-center justify-between px-6 md:px-8'>
        {/* Logo */}
        <div className='flex items-center space-x-4'>
          <Icon />
        </div>

        {/* Navigation Links */}
        <nav className='hidden md:flex md:items-center md:gap-6'>
          <DesktopNavLinks links={navigationLinks} />
        </nav>

        {/* Auth Buttons */}
        <div className='hidden md:flex md:items-center md:gap-4'>
          <AuthButtons />
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          links={navigationLinks}
        />
      </div>
    </motion.header>
  );
}
