import { CorePillars } from '@/components/marketing/home/CorePillars';
import { FounderNote } from '@/components/marketing/home/FounderNote';
import { FoundingMember } from '@/components/marketing/home/FoundingMember';
import { Hero } from '@/components/marketing/home/Hero';
import { InternetsAMess } from '@/components/marketing/home/InternetsAMess';
import { NoBs } from '@/components/marketing/home/NoBs';
import { NotForEveryone } from '@/components/marketing/home/NotForEveryone';
import { CTA } from '@/components/z/shared/CTA';

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
