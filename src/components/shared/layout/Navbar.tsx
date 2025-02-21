'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Icon } from '../Icon';
import { AuthButtons } from '../AuthButtons';
import { MobileMenu } from './MobileMenu';
import { useScroll } from '@/lib/hooks/shared/useScroll';
import { useScrollDirection } from '@/lib/hooks/shared/useScrollDirection';
import { FadingDivider } from '@/components/ui/fading-divider';
import { useAuthStore } from '@/store/Auth';
import { MemberNavLinks } from './nav-links/MemberNavLinks';
import { PublicNavLinks } from './nav-links/PublicNavLinks';
import { motion } from 'motion/react';

export function Navbar() {
  const isScrolled = useScroll(20);
  const { isVisible } = useScrollDirection();
  const [isOpen, setIsOpen] = useState(false);
  const { session } = useAuthStore();

  // Show member links if user is logged in
  const isMember = !!session;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'fixed top-0 z-50 w-full pt-1.5 transition-all duration-500',
        isScrolled
          ? 'before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-b before:from-black/[0.07] before:to-transparent before:backdrop-blur-md after:pointer-events-none after:absolute after:inset-0 after:-z-20 after:bg-white/[0.01] after:backdrop-blur-md after:backdrop-saturate-150'
          : 'bg-transparent'
      )}
    >
      <div className='relative mx-auto flex h-16 max-w-7xl items-center px-6 md:px-8'>
        {/* Left section with logo */}
        <div className='w-40 shrink-0'>
          <Icon />
        </div>

        {/* Center section with nav links */}
        <div className='hidden flex-1 justify-center md:flex'>
          {isMember ? <MemberNavLinks /> : <PublicNavLinks />}
        </div>

        {/* Right section with auth buttons */}
        <div className='w-40 shrink-0 text-right'>
          <AuthButtons />
        </div>

        {/* Mobile Menu */}
        <div className='md:hidden'>
          <MobileMenu
            isOpen={isOpen}
            setIsOpenAction={setIsOpen}
            isMember={isMember}
          />
        </div>
      </div>

      {/* Fading divider that only shows when scrolled */}
      {isScrolled && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <FadingDivider opacity={0.04} />
        </motion.div>
      )}
    </motion.header>
  );
}
