import { Container } from '@/components/ui/container';
import { type Benefit } from '@/types/home';

interface BenefitsProps {
  benefits: Benefit[];
}

export function Benefits({ benefits }: BenefitsProps) {
  return (
    <Container as='section' className='py-12 md:py-16 lg:py-20'>
      <div className='mx-auto max-w-[58rem] text-center'>
        <h2 className='text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl'>
          Why Choose WYOS?
        </h2>
        <p className='mt-4 text-muted-foreground sm:text-lg'>
          Discover the advantages that set WYOS apart
        </p>
      </div>
      <div className='mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3'>
        {benefits.map((benefit, index) => (
          <div key={index} className='flex flex-col items-center text-center'>
            <div className='mb-4 rounded-lg bg-secondary p-3'>
              {benefit.icon}
            </div>
            <h3 className='mb-2 font-semibold'>{benefit.title}</h3>
            <p className='text-sm text-muted-foreground'>
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
}
