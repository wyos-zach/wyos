'use client';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { NavLink } from './Navlink';

const memberLinks = [
  { href: '/knowledge', label: 'Knowledge' },
  { href: '/resources', label: 'Resources' },
  { href: '/community', label: 'Community' },
] as const;

const accountLinks = [
  { href: '/profile', label: 'Profile' },
  { href: '/settings', label: 'Settings' },
  { href: '/billing', label: 'Billing' },
];

export function MemberNavLinks() {
  return (
    <nav className='flex items-center space-x-12'>
      {memberLinks.map((link) => (
        <NavLink key={link.href} href={link.href} label={link.label} />
      ))}

      {/* Account Dropdown */}
      <NavigationMenu>
        <NavigationMenuList className='gap-0'>
          <NavigationMenuItem>
            <NavigationMenuTrigger className='group border-none bg-transparent px-0 py-0 text-base font-medium tracking-wider text-zinc-400 shadow-none transition-colors duration-200 hover:bg-transparent hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 data-[state=open]:bg-transparent data-[state=open]:text-white'>
              Account
            </NavigationMenuTrigger>
            <NavigationMenuContent className='fade-in-up'>
              <div className='grid w-[400px] gap-3 rounded-xl bg-zinc-900/90 p-4 backdrop-blur-sm md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
                {accountLinks.map((link) => (
                  <NavLink
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    className='block rounded-lg p-3 text-sm hover:bg-zinc-800/30 hover:text-white'
                  />
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
