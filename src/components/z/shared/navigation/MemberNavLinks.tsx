'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const memberLinks = [
  { href: '/knowledge', label: 'Knowledge' },
  { href: '/resources', label: 'Resources' },
  { href: '/community', label: 'Community' },
] as const;

export function MemberNavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-12">
      {memberLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            'group relative text-base font-medium tracking-wide text-zinc-400 transition-colors hover:text-white',
            pathname === link.href && 'text-white'
          )}
        >
          <span>{link.label}</span>
          <span className="absolute bottom-0 left-1/2 h-[1px] w-0 bg-gradient-to-r from-transparent via-white to-transparent transition-all duration-300 group-hover:left-0 group-hover:w-full" />
        </Link>
      ))}
    </nav>
  );
}
