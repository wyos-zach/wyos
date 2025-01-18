import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <Container
        as='section'
        className='space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32'
      >
        <div className='flex max-w-[64rem] flex-col items-center gap-4 text-center'>
          <h1 className='text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl'>
            Write Your Own Story
          </h1>
          <p className='max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8'>
            Take control of your narrative and share your unique perspective
            with the world
          </p>
          <div className='flex gap-4'>
            <Link href='/register'>
              <Button size='lg'>Get Started</Button>
            </Link>
            <Link href='/login'>
              <Button variant='outline' size='lg'>
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
