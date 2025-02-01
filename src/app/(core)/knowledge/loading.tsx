import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/shared/layout/PageHeader';
import { Skeleton } from '@/components/ui/skeleton';

export default function KnowledgeLoading() {
  return (
    <div className='relative flex min-h-screen flex-col'>
      <PageHeader
        title='Knowledge Hub'
        description='Discover practical insights and wisdom to help you move forward'
        pattern='dots'
        align='center'
      />
      <Container as='main' className='flex-1 py-8 md:py-12 lg:py-16'>
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className='space-y-4'>
              <Skeleton className='h-40 w-full' />
              <Skeleton className='h-4 w-3/4' />
              <Skeleton className='h-3 w-1/2' />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
