import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { cn } from '@/lib/utils';
import './globals.css';
import { Navbar } from '@/components/shared/layout/Navbar';
import { Footer } from '@/components/shared/layout/Footer';
import { QueryProvider } from '@/lib/providers/query-provider';
import Maintenance from '@/components/shared/Maintenance';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';

  if (isMaintenanceMode) {
    return (
      <html lang='en' className='dark'>
        <body
          className={cn(
            'min-h-screen bg-background font-sans antialiased',
            geistSans.variable,
            geistMono.variable
          )}
        >
          <Maintenance />
        </body>
      </html>
    );
  }
  return (
    <html lang='en' className='dark'>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          geistSans.variable,
          geistMono.variable
        )}
      >
        <QueryProvider>
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
