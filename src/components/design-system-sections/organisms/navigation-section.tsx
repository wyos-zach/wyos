'use client';

import { Button } from '@/components/design-system/atoms/button';
import { MemberNavLinks } from '@/components/design-system/molecules/MemberNavLinks';
import { NavLink } from '@/components/design-system/molecules/Navlink';
import { PublicNavLinks } from '@/components/design-system/molecules/PublicNavLinks';
import { MobileMenu } from '@/components/design-system/organisms/MobileMenu';
import { Navbar } from '@/components/design-system/organisms/Navbar';
import { useState } from 'react';

export function NavigationSection() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <section className='space-y-6 bg-background px-6 py-12'>
      <h2 className='font-heading text-3xl font-bold'>Navigation</h2>
      <p className='text-muted-foreground'>
        A premium, modern navigation system with glassmorphism, skeuomorphic
        effects, and subtle animations, tailored for members and non-members.
      </p>

      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Full Navigation Component</h3>
        <div className='w-full'>
          <Navbar />
        </div>
      </div>

      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Member Navigation Links</h3>
        <div className='flex flex-wrap gap-4'>
          <MemberNavLinks />
        </div>
      </div>

      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Public Navigation Links</h3>
        <div className='flex flex-wrap gap-4'>
          <PublicNavLinks />
        </div>
      </div>

      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Individual NavLink Examples</h3>
        <div className='flex flex-wrap gap-4'>
          <NavLink href='/knowledge' label='Knowledge' />
          <NavLink href='/resources' label='Resources' className='text-white' />
          <NavLink href='/community' label='Community' />
          <NavLink href='/about' label='About' />
          <NavLink href='/membership' label='Membership' />
        </div>
      </div>

      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Mobile Menu</h3>
        <div className='w-full md:hidden'>
          <MobileMenu
            isOpen={isMobileMenuOpen}
            setIsOpenAction={setIsMobileMenuOpen}
            isMember={false}
          />
          <Button
            variant='outline'
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className='mt-4'
          >
            Toggle Mobile Menu
          </Button>
        </div>
        <p className='text-sm text-gray-500'>
          Note: Mobile menu is visible only on small screens (below md
          breakpoint).
        </p>
      </div>

      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Hover and Active States</h3>
        <p className='text-muted-foreground'>
          Subtle gradient underlines and glows enhance interactivity.
        </p>
        <div className='flex flex-wrap gap-4'>
          <NavLink href='/hover1' label='Hover Me' />
          <NavLink href='/active' label='Active' className='text-white' />
        </div>
      </div>

      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Accessibility and Focus</h3>
        <p className='text-muted-foreground'>
          Focus rings ensure keyboard navigation works seamlessly.
        </p>
        <div className='flex flex-wrap gap-4'>
          <NavLink href='/focus1' label='Focus Test' />
        </div>
      </div>

      <div className='text-sm text-gray-500'>
        <p>Props/Features:</p>
        <ul className='list-inside list-disc'>
          <li>
            Navbar: Main navigation component with responsive design and scroll
            effects.
          </li>
          <li>
            NavLink: Reusable link with hover (gradient underline), active
            (white text with glow), and focus (ring) states.
          </li>
          <li>
            MemberNavLinks: Links for authenticated users (e.g., Knowledge,
            Resources, Community, Account dropdown).
          </li>
          <li>
            PublicNavLinks: Links for guests (e.g., About, Features dropdown,
            Membership).
          </li>
          <li>
            MobileMenu: Sheet-based menu for small screens with toggle button.
          </li>
          <li>
            Styling: Glassmorphism (backdrop blur), skeuomorphism (subtle
            shadows), and animations (fade-in-up).
          </li>
          <li>
            Props: href (string), label (string), className (optional string),
            onClick (optional function).
          </li>
        </ul>
      </div>
    </section>
  );
}
