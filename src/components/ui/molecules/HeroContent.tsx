import { GradientDivider } from '@/components/ui/atoms/GradientDivider';
import { HeroText } from '@/components/ui/atoms/HeroText';

export const HeroContent = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className='relative z-10 mx-auto w-full max-w-4xl px-4 text-center'>
    <div className='mb-6 flex justify-center'>
      <GradientDivider />
    </div>

    <HeroText className='gradient-text text-4xl font-bold md:text-6xl lg:text-7xl'>
      {title}
    </HeroText>

    <HeroText className='mt-6 text-lg text-muted-foreground md:text-xl lg:text-2xl'>
      {description}
    </HeroText>

    <div className='mt-10 flex justify-center'>
      <GradientDivider className='w-14 from-transparent via-zinc-500 to-transparent' />
    </div>
  </div>
);
