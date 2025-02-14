'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { usePathname } from 'next/navigation';

const features = [
  {
    title: 'Knowledge Base',
    description: 'Access our curated collection of articles, guides, and tutorials.',
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
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-12">
      <Link 
        href="/about"
        className={cn(
          'group relative text-base font-medium tracking-wide text-zinc-400 transition-colors hover:text-white',
          pathname === '/about' && 'text-white'
        )}
      >
        <span>About</span>
        <span className="absolute bottom-0 left-1/2 h-[1px] w-0 bg-gradient-to-r from-transparent via-white to-transparent transition-all duration-300 group-hover:left-0 group-hover:w-full" />
      </Link>

      <NavigationMenu>
        <NavigationMenuList className="gap-0">
          <NavigationMenuItem className="relative">
            <NavigationMenuTrigger 
              className={cn(
                'group border-none bg-transparent px-0 py-0 text-base font-medium tracking-wide text-zinc-400 shadow-none hover:bg-transparent hover:text-white data-[state=open]:bg-transparent',
                features.some(feature => pathname === feature.href) && 'text-white'
              )}
            >
              Features
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {features.map((feature) => (
                  <Link
                    key={feature.href}
                    href={feature.href}
                    className={cn(
                      'group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors',
                      pathname === feature.href ? 'text-white' : 'text-zinc-400 hover:text-white'
                    )}
                  >
                    <div className="text-sm font-medium leading-none">
                      {feature.title}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug opacity-70">
                      {feature.description}
                    </p>
                  </Link>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <Link 
        href="/pricing"
        className={cn(
          'group relative text-base font-medium tracking-wide text-zinc-400 transition-colors hover:text-white',
          pathname === '/pricing' && 'text-white'
        )}
      >
        <span>Benefits</span>
        <span className="absolute bottom-0 left-1/2 h-[1px] w-0 bg-gradient-to-r from-transparent via-white to-transparent transition-all duration-300 group-hover:left-0 group-hover:w-full" />
      </Link>
    </nav>
  );
}
