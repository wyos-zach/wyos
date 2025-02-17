'use client';

import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

const footerLinks = [
  {
    title: 'Start Here',
    links: [
      { href: '/about', label: 'About' },
      { href: '/knowledge', label: 'Knowledge Base' },
      { href: '/resources', label: 'Tools & Resources' },
    ],
  },
  {
    title: 'Join Us',
    links: [
      { href: '/community', label: 'Community' },
      { href: '/register', label: 'Write Your Story' },
      { href: '/login', label: 'Sign In' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/privacy', label: 'Privacy' },
      { href: '/terms', label: 'Terms' },
    ],
  },
];

export function Footer() {
  return (
    <footer className='relative mt-20'>
      {/* Raw, industrial-style top border */}
      <div className='absolute inset-x-0 -top-12 h-12'>
        <div className='h-px w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent' />
        <div className='absolute inset-0 bg-[radial-gradient(closest-side,rgba(30,58,138,0.12),transparent)]' />
      </div>

      <Container className='relative'>
        <div className='grid grid-cols-1 gap-12 py-16 md:grid-cols-3'>
          {footerLinks.map((section, _idx) => (
            <div key={section.title} className='space-y-6'>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className='text-xs font-medium uppercase tracking-widest text-zinc-500'
              >
                {section.title}
              </motion.p>

              <div className='space-y-3'>
                {section.links.map((link) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className='group'
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        'inline-block text-sm text-zinc-400',
                        'transition-all duration-200',
                        'group-hover:tracking-wide group-hover:text-white'
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className='flex flex-col items-start justify-between space-y-4 border-t border-zinc-800 py-8 md:flex-row md:items-center md:space-y-0'>
          <div className='flex flex-col space-y-2'>
            <Link
              href='/'
              className='text-sm font-semibold tracking-tight text-zinc-300'
            >
              WYOS
            </Link>
            <p className='text-xs text-zinc-500'>
              Write Your Own Story. No fluff. No BS.
            </p>
          </div>

          <p className='text-xs text-zinc-600'>
            © {new Date().getFullYear()} WYOS. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
