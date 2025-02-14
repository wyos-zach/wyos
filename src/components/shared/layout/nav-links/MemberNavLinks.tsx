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
    <nav className="flex items-center gap-8">
      {memberLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            'text-sm font-medium tracking-wide text-zinc-400 transition-colors duration-150 hover:text-white',
            pathname === link.href && 'text-white'
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
