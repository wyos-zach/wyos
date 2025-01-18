import { Hero } from '@/components/home/Hero';
import { Features } from '@/components/home/Features';
import { HowItWorks } from '@/components/home/HowItWorks';
import { FoundersNote } from '@/components/home/FoundersNote';
import { CTA } from '@/components/home/CTA';
import { features, steps, foundersNote } from '@/lib/config/home';

export default function HomePage() {
  return (
    <>
      <Hero
        headline='Write Your Own Story'
        subheadline='Take control of your narrative and share your unique perspective with the world'
      />
      <Features features={features} />
      <HowItWorks steps={steps} />
      <FoundersNote {...foundersNote} />
      <CTA
        headline='Ready to start your journey?'
        buttonText='Get Started Free'
        subtext='Join thousands of others who are taking control of their story.'
      />
    </>
  );
}
