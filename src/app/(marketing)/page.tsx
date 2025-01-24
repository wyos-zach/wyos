import { Hero } from '@/components/home/Hero';
import { Features } from '@/components/home/Features';
import { HowItWorks } from '@/components/home/HowItWorks';
import { FoundersNote } from '@/components/home/FoundersNote';
import { Benefits } from '@/components/home/Benefits';
import { GettingStarted } from '@/components/home/GettingStarted';
import { CTA } from '@/components/home/CTA';
import {
  features,
  steps,
  foundersNote,
  benefits,
  startingSteps,
} from '@/lib/config/home';

export default function HomePage() {
  return (
    <>
      <Hero
        headline='Writing Your Own Story'
        subheadline='Take control of your narrative and share your unique perspective with the world'
      />
      <Features features={features} />
      <Benefits benefits={benefits} />
      <HowItWorks steps={steps} />
      <GettingStarted steps={startingSteps} />
      <FoundersNote {...foundersNote} />
      <CTA
        headline='Ready to start your journey?'
        buttonText='Get Started Free'
        subtext='Join thousands of others who are taking control of their story.'
      />
    </>
  );
}
