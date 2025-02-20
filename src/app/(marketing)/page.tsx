import { Hero } from '@/components/marketing/home/Hero';
import { CTA } from '@/components/marketing/home/CTA';
import { InternetVsWyos } from '@/components/marketing/home/InternetVsWyos';
import { CorePillars } from '@/components/marketing/home/CorePillars';
import { BridgeSection } from '@/components/marketing/home/Bridge';
import { HelpBuild } from '@/components/marketing/home/HelpBuild';
import { Note } from '@/components/marketing/home/Note';

export default function HomePage() {
  return (
    <>
      <Hero />
      <InternetVsWyos />
      <CorePillars />
      <BridgeSection />
      <HelpBuild />
      <Note />

      <CTA
        headline='Ready to start your journey?'
        buttonText='Get Started Free'
        subtext='Join thousands of others who are taking control of their story.'
      />
    </>
  );
}
