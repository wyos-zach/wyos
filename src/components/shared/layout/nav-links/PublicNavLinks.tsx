'use client';

import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const featuresDropdown = [
  { href: '/knowledge', label: 'Knowledge' },
  { href: '/resources', label: 'Resources' },
  { href: '/community', label: 'Community' },
] as const;

export function PublicNavLinks() {
  const pathname = usePathname();

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex items-center gap-8">
        <NavigationMenuItem>
          <Link
            href="/about"
            className={cn(
              'text-sm font-medium tracking-wide text-zinc-400 transition-colors duration-150 hover:text-white',
              pathname === '/about' && 'text-white'
            )}
          >
            About
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={cn(
              'text-sm font-medium tracking-wide text-zinc-400 transition-colors duration-150 hover:text-white',
              featuresDropdown.some(link => pathname === link.href) && 'text-white'
            )}
          >
            Features
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-48 gap-2 p-4">
              {featuresDropdown.map((item) => (
                <li key={item.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        'block select-none rounded-md p-2 text-sm font-medium leading-none text-zinc-400 no-underline outline-none transition-colors hover:bg-blue-950/30 hover:text-white',
                        pathname === item.href && 'text-white'
                      )}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link
            href="/pricing"
            className={cn(
              'text-sm font-medium tracking-wide text-zinc-400 transition-colors duration-150 hover:text-white',
              pathname === '/pricing' && 'text-white'
            )}
          >
            Benefits
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
