import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

type NavLink = {
  href: string;
  label: string;
};

type DesktopNavLinksProps = {
  links: NavLink[];
};

export function DesktopNavLinks({ links }: DesktopNavLinksProps) {
  const [activeLink, setActiveLink] = useState('');

  return (
    <AnimatePresence>
      {links.map((link) => (
        <motion.div
          key={link.href}
          onHoverStart={() => setActiveLink(link.href)}
          onHoverEnd={() => setActiveLink('')}
          className='relative'
        >
          <Link href={link.href} className='group relative px-4 py-2'>
            <span className='relative z-10 text-sm font-medium tracking-wide text-zinc-400 transition-colors duration-200 group-hover:text-white'>
              {link.label}
            </span>
            {activeLink === link.href && (
              <motion.span
                layoutId='navHighlight'
                className='absolute inset-0 -z-10 rounded-md bg-blue-950/30'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
          </Link>
        </motion.div>
      ))}
    </AnimatePresence>
  );
}
