import { Footer } from '@/components/z/shared/Footer';
import { Navbar } from '@/components/z/shared/navigation/Navbar';
import { QueryProvider } from '@/lib/providers/query-provider';
import { SmoothScroll } from '@/lib/providers/smooth-scroll';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Cinzel, Open_Sans } from 'next/font/google';
import './globals.css';

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'WYOS - Writing Your Own Story',
  description:
    'A platform that empowers individuals with practical tools and knowledge to take control of their lives',
  keywords: [
    'personal development',
    'self-improvement',
    'productivity',
    'learning platform',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className='dark'>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          cinzel.variable,
          openSans.variable
        )}
      >
        <QueryProvider>
          <SmoothScroll />
          <Navbar />
          <main className='relative flex min-h-screen flex-col'>
            {children}
          </main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
