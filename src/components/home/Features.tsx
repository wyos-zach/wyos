import { Container } from '@/components/ui/container';
import { type Feature } from '@/types/home';

interface FeaturesProps {
  features: Feature[];
  className?: string;
}

export function Features({ features }: FeaturesProps) {
  return (
    <Container as='section' className='py-12 md:py-16 lg:py-20'>
      <div className='mx-auto max-w-[58rem] text-center'>
        <h2 className='text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl'>
          Everything you need to write your story
        </h2>
        <p className='mt-4 text-muted-foreground sm:text-lg'>
          Powerful tools and features to help you craft, organize, and share
          your narrative.
        </p>
      </div>
      <div className='mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3'>
        {features.map((feature, index) => (
          <div key={index} className='flex flex-col items-center text-center'>
            <div className='mb-4 rounded-lg bg-secondary p-3'>
              {feature.icon}
            </div>
            <h3 className='mb-2 font-semibold'>{feature.title}</h3>
            <p className='text-sm text-muted-foreground'>
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
}
