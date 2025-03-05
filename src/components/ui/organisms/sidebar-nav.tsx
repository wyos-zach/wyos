'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Introduction', href: '/design-system' },
  { name: 'Styles', href: '/design-system/styles' },
  { name: 'Atoms', href: '/design-system/atoms' },
  { name: 'Molecules', href: '/design-system/molecules' },
  { name: 'Organisms', href: '/design-system/organisms' },
  { name: 'Sections', href: '/design-system/sections' },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className='mt-8 space-y-1 px-3'>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`block rounded-md px-3 py-2 ${
            pathname === item.href
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-muted'
          }`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
