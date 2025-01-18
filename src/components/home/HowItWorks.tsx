import { Container } from '@/components/ui/container';

interface Step {
  number: number;
  title: string;
  description: string;
}

interface HowItWorksProps {
  steps: Step[];
  className?: string;
}

export function HowItWorks({ steps, className }: HowItWorksProps) {
  return (
    <Container
      as='section'
      className={`py-12 md:py-16 lg:py-20 ${className ?? ''}`}
    >
      <div className='mx-auto max-w-[58rem] text-center'>
        <h2 className='text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl'>
          How WYOS Works
        </h2>
        <p className='mt-4 text-muted-foreground sm:text-lg'>
          Start your journey in three simple steps
        </p>
      </div>
      <div className='mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3'>
        {steps.map((step) => (
          <div
            key={step.number}
            className='relative flex flex-col items-center text-center'
          >
            <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-xl font-bold'>
              {step.number}
            </div>
            <h3 className='mb-2 font-semibold'>{step.title}</h3>
            <p className='text-sm text-muted-foreground'>{step.description}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}
