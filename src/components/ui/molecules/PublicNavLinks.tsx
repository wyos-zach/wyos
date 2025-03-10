'use client';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { NavLink } from './Navlink';

const features = [
  {
    title: 'Knowledge Base',
    description:
      'Access our curated collection of articles, guides, and tutorials.',
    href: '/knowledge',
  },
  {
    title: 'Resource Library',
    description: 'Download templates, worksheets, and practical tools.',
    href: '/resources',
  },
  {
    title: 'Community',
    description: 'Connect with like-minded individuals and share experiences.',
    href: '/community',
  },
];

export function PublicNavLinks() {
  return (
    <nav className='flex items-center space-x-12'>
      <NavLink href='/about' label='About' />

      <NavigationMenu>
        <NavigationMenuList className='gap-0'>
          <NavigationMenuItem>
            <NavigationMenuTrigger className='group border-none bg-transparent px-0 py-0 text-base font-medium tracking-wider text-zinc-400 shadow-none transition-colors duration-200 hover:bg-transparent hover:text-white focus:outline-none focus:ring-2 focus:ring-white/20 data-[state=open]:bg-transparent data-[state=open]:text-white'>
              Features
            </NavigationMenuTrigger>
            <NavigationMenuContent className='fade-in-up'>
              <div className='grid w-[400px] gap-3 rounded-xl bg-zinc-900/90 p-4 backdrop-blur-sm md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
                {features.map((feature) => (
                  <NavLink
                    key={feature.href}
                    href={feature.href}
                    label={feature.title}
                    className='block space-y-1 rounded-lg p-3 text-sm'
                  >
                    <p className='line-clamp-2 text-sm leading-snug opacity-70'>
                      {feature.description}
                    </p>
                  </NavLink>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <NavLink href='/membership' label='Membership' />
    </nav>
  );
}
