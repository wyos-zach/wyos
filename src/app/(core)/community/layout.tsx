import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';

export const metadata: Metadata = {
  title: 'Community - WYOS',
  description: 'Connect with authentic individuals committed to real growth',
};

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='relative flex min-h-[calc(100%-100px)] flex-col'>
      <Container as='main' className='flex-1 py-8 md:py-12 lg:py-16'>
        {children}
      </Container>
    </div>
  );
}
