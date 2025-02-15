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
import { motion } from 'framer-motion';

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
          <NavigationMenuItem>
            <NavigationMenuTrigger 
              className={cn(
                'group border-none bg-transparent px-0 py-0 text-base font-medium tracking-wide text-zinc-400 shadow-none transition-colors duration-200 hover:bg-transparent hover:text-white data-[state=open]:bg-transparent data-[state=open]:text-white',
                features.some(feature => pathname === feature.href) && 'text-white'
              )}
            >
              Features
            </NavigationMenuTrigger>
            <NavigationMenuContent className="animate-in fade-in slide-in-from-top-5 duration-200">
              <motion.div 
                className="grid w-[400px] gap-3 rounded-xl bg-zinc-900/90 p-4 backdrop-blur-sm md:w-[500px] md:grid-cols-2 lg:w-[600px]"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
              >
                {features.map((feature) => (
                  <Link
                    key={feature.href}
                    href={feature.href}
                    className={cn(
                      'group block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-all duration-200',
                      pathname === feature.href 
                        ? 'bg-zinc-800/50 text-white' 
                        : 'text-zinc-400 hover:bg-zinc-800/30 hover:text-white'
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
              </motion.div>
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
