import { Hero } from '@/components/marketing/home/Hero';
import { HowItWorks } from '@/components/marketing/home/HowItWorks';
import { FoundersNote } from '@/components/marketing/home/FoundersNote';
import { Benefits } from '@/components/marketing/home/Benefits';
import { GettingStarted } from '@/components/marketing/home/GettingStarted';
import { CTA } from '@/components/marketing/home/CTA';
import {
  steps,
  foundersNote,
  benefits,
  startingSteps,
} from '@/lib/config/site/home';
import { InternetVsWyos } from '@/components/marketing/home/InternetVsWyos';
import { CorePillars } from '@/components/marketing/home/CorePillars';
import { BridgeSection } from '@/components/marketing/home/Bridge';
import { HelpBuild } from '@/components/marketing/home/HelpBuild';

export default function HomePage() {
  return (
    <>
      <Hero />
      <InternetVsWyos />
      <CorePillars />
      <BridgeSection />
      <HelpBuild />
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
