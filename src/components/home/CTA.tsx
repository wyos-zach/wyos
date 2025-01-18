import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

interface CTAProps {
  headline: string;
  buttonText: string;
  subtext?: string;
}

export function CTA({ headline, buttonText, subtext }: CTAProps) {
  return (
    <Container as='section' className='py-12 md:py-16 lg:py-20'>
      <div className='mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center'>
        <h2 className='text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl'>
          {headline}
        </h2>
        {subtext && (
          <p className='max-w-[42rem] leading-normal text-muted-foreground sm:text-lg'>
            {subtext}
          </p>
        )}
        <Link href='/register'>
          <Button size='lg'>{buttonText}</Button>
        </Link>
      </div>
    </Container>
  );
}
