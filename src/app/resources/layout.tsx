import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/layout/PageHeader';

export const metadata: Metadata = {
  title: 'Resources - WYOS',
  description:
    'Discover curated tools and resources to help you write your own story',
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='relative flex min-h-screen flex-col'>
      <PageHeader
        title='Resources'
        description='Discover practical tools and resources to help you move forward'
        pattern='dots'
        align='center'
      />
      <Container as='main' className='flex-1 py-8 md:py-12 lg:py-16'>
        {children}
      </Container>
    </div>
  );
}
