'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className='flex flex-col'>
      <section className='flex min-h-[80vh] flex-col items-center justify-center space-y-8 px-4 py-24 text-center'>
        <h1 className='text-4xl font-bold sm:text-5xl md:text-6xl'>
          Write Your Own Story
        </h1>
        <p className='max-w-[42rem] text-lg text-muted-foreground sm:text-xl'>
          Take control of your narrative and share your unique perspective with
          the world
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
      </section>
    </div>
  );
}
