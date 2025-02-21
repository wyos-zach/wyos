import { Hero } from '@/components/marketing/home/Hero';
import { CTA } from '@/components/marketing/home/CTA';
import { CorePillars } from '@/components/marketing/home/CorePillars';
import { NoBs } from '@/components/marketing/home/NoBs';
import { NotForEveryone } from '@/components/marketing/home/NotForEveryone';
import { FoundingMember } from '@/components/marketing/home/FoundingMember';
import { FounderNote } from '@/components/marketing/home/FounderNote';
import { InternetsAMess } from '@/components/marketing/home/InternetsAMess';

export default function HomePage() {
  return (
    <>
      <Hero />
      <InternetsAMess />
      <CorePillars />
      <NoBs />
      <NotForEveryone />
      <FoundingMember />
      <FounderNote />

      <CTA
        headline='Ready to start your journey?'
        buttonText='Get Started Free'
        subtext='Join thousands of others who are taking control of their story.'
      />
    </>
  );
}
