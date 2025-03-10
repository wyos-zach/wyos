'use client';

import { FadingDivider } from '@/components/ui/fading-divider';
import { MemberNavLinks } from '@/components/ui/molecules/MemberNavLinks';
import { PublicNavLinks } from '@/components/ui/molecules/PublicNavLinks';
import { MobileMenu } from '@/components/ui/organisms/MobileMenu';
import { Icon } from '@/components/z/shared/wyosIcon';
import { useDebounce } from '@/lib/hooks/shared/useDebounce';
import { useScroll } from '@/lib/hooks/shared/useScroll';
import { useScrollDirection } from '@/lib/hooks/shared/useScrollDirection';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/AuthStore';
import { useState } from 'react';
import { AuthButtons } from '../../z/auth/AuthButtons';

export function Navbar() {
  const isScrolled = useDebounce(useScroll(20), 100);
  const { isVisible } = useScrollDirection();
  const [isOpen, setIsOpen] = useState(false);
  const { session } = useAuthStore();

  const isMember = !!session;

  return (
    <header
      className={cn(
        'glass-effect fixed top-0 z-50 w-full pt-1.5 transition-all duration-300',
        isVisible ? 'translate-y-0' : '-translate-y-full',
        isScrolled
          ? 'before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-b before:from-black/10 before:to-transparent before:backdrop-blur-md after:pointer-events-none after:absolute after:inset-0 after:-z-20 after:bg-white/5 after:backdrop-blur-md after:backdrop-saturate-150'
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

      {/* Fading divider */}
      {isScrolled && (
        <div className='fade-in-up'>
          <FadingDivider opacity={0.04} />
        </div>
      )}
    </header>
  );
}
