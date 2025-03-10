'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

type NavLinkProps = {
  href: string;
  label: string;
  className?: string;
  onClick?: () => void;
  children?: ReactNode; // Add optional children prop
};

export const NavLink = ({
  href,
  label,
  className,
  onClick,
  children,
}: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'group relative px-3 py-2 text-base font-medium tracking-wider text-zinc-400 transition-all duration-300',
        'hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-white/20',
        isActive && 'text-white',
        className
      )}
    >
      <span className='relative z-10'>{label}</span>
      {/* Gradient underline on hover */}
      <span
        className={cn(
          'absolute bottom-0 left-1/2 h-[1px] w-0 bg-gradient-to-r from-transparent via-white/60 to-transparent transition-all duration-300',
          'group-hover:left-0 group-hover:w-full',
          isActive && 'left-0 w-full'
        )}
      />
      {/* Subtle glow for active state */}
      {isActive && (
        <span className='absolute inset-0 -z-10 rounded-lg bg-white/5 shadow-[0_0_8px_rgba(255,255,255,0.1)]' />
      )}
      {children && <div className='relative z-10'>{children}</div>}
    </Link>
  );
};
