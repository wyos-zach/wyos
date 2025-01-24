import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/layout/PageHeader';

export const metadata: Metadata = {
  title: 'Knowledge Hub - WYOS',
  description:
    'Discover curated knowledge and insights to help you write your own story',
  keywords: ['knowledge', 'learning', 'personal development'],
  openGraph: {
    title: 'Knowledge Hub - WYOS',
    description:
      'Discover curated knowledge and insights to help you write your own story',
    type: 'website',
    siteName: 'WYOS',
  },
};

export default function KnowledgeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='relative flex min-h-screen flex-col'>
      <PageHeader
        title='Knowledge Hub'
        description='Discover practical insights and wisdom to help you move forward'
        pattern='dots'
        align='center'
      />
      <Container as='main' className='flex-1 py-8 md:py-12 lg:py-16'>
        {children}
      </Container>
    </div>
  );
}
