import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';

export const metadata: Metadata = {
  title: 'Knowledge Hub - WYOS',
  description: 'Curated practical knowledge for personal growth',
};

export default function KnowledgeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='relative flex min-h-screen flex-col'>
      <Container as='main' className='flex-1 space-y-16 py-8 md:py-12 lg:py-16'>
        {children}
      </Container>
    </div>
  );
}
