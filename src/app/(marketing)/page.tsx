import { Hero } from '@/components/marketing/home/Hero';
import { Features } from '@/components/marketing/home/Features';
import { HowItWorks } from '@/components/marketing/home/HowItWorks';
import { FoundersNote } from '@/components/marketing/home/FoundersNote';
import { Benefits } from '@/components/marketing/home/Benefits';
import { GettingStarted } from '@/components/marketing/home/GettingStarted';
import { CTA } from '@/components/marketing/home/CTA';
import { HeroScrollAnimation } from '@/components/marketing/home/HeroScrollAnimation';
import {
  features,
  steps,
  foundersNote,
  benefits,
  startingSteps,
} from '@/lib/config/site/home';

export default function HomePage() {
  return (
    <>
      <Hero />
      <HeroScrollAnimation />
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
