import Link from 'next/link';
import { Container } from '@/components/ui/container';

const footerLinks = {
  product: [
    { href: '/about', label: 'About' },
    { href: '/knowledge', label: 'Knowledge' },
    { href: '/resources', label: 'Resources' },
    { href: '/community', label: 'Community' },
  ],
  legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ],
};

export function Footer() {
  return (
    <footer className='border-t bg-background'>
      <Container className='py-8 md:py-12'>
        <div className='grid grid-cols-2 gap-8 md:grid-cols-4'>
          <div className='col-span-2 md:col-span-1'>
            <Link href='/' className='text-xl font-bold'>
              WYOS
            </Link>
            <p className='mt-2 text-sm text-muted-foreground'>
              Write Your Own Story
            </p>
          </div>

          <div>
            <h3 className='text-sm font-medium'>Product</h3>
            <ul className='mt-4 space-y-3'>
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className='text-sm text-muted-foreground transition-colors hover:text-primary'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className='text-sm font-medium'>Legal</h3>
            <ul className='mt-4 space-y-3'>
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className='text-sm text-muted-foreground transition-colors hover:text-primary'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='mt-8 border-t pt-8'>
          <p className='text-center text-sm text-muted-foreground'>
            © {new Date().getFullYear()} WYOS. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
