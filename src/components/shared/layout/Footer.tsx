'use client';

import Link from 'next/link';
import Image from 'next/image';
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

const socialLinks = [
  {
    icon: (
      <svg width='24' height='24' viewBox='0 0 24 24' fill='currentColor'>
        <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
      </svg>
    ),
    href: 'https://x.com/wyos',
    label: 'X',
  },
  {
    icon: (
      <svg width='24' height='24' viewBox='0 0 24 24' fill='currentColor'>
        <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
      </svg>
    ),
    href: 'https://facebook.com/wyos',
    label: 'Facebook',
  },
  {
    icon: (
      <svg width='24' height='24' viewBox='0 0 24 24' fill='currentColor'>
        <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266-.058-1.644-.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
      </svg>
    ),
    href: 'https://instagram.com/wyos',
    label: 'Instagram',
  },
];

export function Footer() {
  return (
    <footer className='relative'>
      {/* Premium gradient divider */}
      <div className='absolute inset-x-0 -top-px h-px'>
        <Container className='relative'>
          <div className='h-px w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent' />
          <div className='absolute inset-0 bg-[radial-gradient(closest-side,rgba(30,58,138,0.12),transparent)]' />
        </Container>
      </div>

      <Container className='relative'>
        <div className='grid grid-cols-1 gap-16 py-16 md:grid-cols-5'>
          {/* Logo and Social Section */}
          <div className='flex flex-col justify-between md:col-span-2'>
            <Link href='/' className='block'>
              <Image
                src='/images/logo300.svg'
                alt='WYOS Logo'
                width={300}
                height={160}
                className='h-auto w-[180px] md:w-[220px] lg:w-[260px]'
              />
            </Link>

            <div className='mt-4 flex items-center gap-8'>
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className='group relative'
                  aria-label={social.label}
                >
                  <div className='absolute -inset-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 blur transition-all duration-300 group-hover:opacity-100' />
                  <div className='relative text-zinc-400 transition-colors duration-200 hover:text-white'>
                    {social.icon}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div className='grid grid-cols-3 gap-8 md:col-span-3'>
            {footerLinks.map((section) => (
              <div key={section.title} className='space-y-6'>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className='text-xs font-medium uppercase tracking-widest text-zinc-500'
                >
                  {section.title}
                </motion.p>

                <div className='space-y-4'>
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
                          'text-sm text-zinc-400',
                          'transition-all duration-200',
                          'hover:text-white'
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
        </div>

        {/* Bottom Bar */}
        <div className='relative flex flex-col items-center justify-between space-y-4 py-8 md:flex-row md:space-y-0'>
          <div className='absolute inset-x-0 top-0'>
            <div className='h-px w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent' />
          </div>
          <p className='text-xs text-zinc-500'>
            © {new Date().getFullYear()} WYOS. All rights reserved.
          </p>

          <div className='flex space-x-6'>
            <Link
              href='/privacy'
              className='text-xs text-zinc-500 hover:text-white'
            >
              Privacy Policy
            </Link>
            <Link
              href='/terms'
              className='text-xs text-zinc-500 hover:text-white'
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
