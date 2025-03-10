// src/app/(marketing)/membership/page.tsx
import { AffiliateNote } from '@/components/marketing/membership/AffiliateNote';
import { FoundingMemberOffer } from '@/components/marketing/membership/FoundingMemberOffer';
import { IdealMember } from '@/components/marketing/membership/IdealMember';
import { MemberBenefits } from '@/components/marketing/membership/MemberBenefits';
import { MembershipHero } from '@/components/marketing/membership/MembershipHero';
import { MembershipIntro } from '@/components/marketing/membership/MembershipIntro';
import { WhyNotFree } from '@/components/marketing/membership/WhyNotFree';
import { CTA } from '@/components/z/shared/CTA';

export default function MembershipPage() {
  return (
    <main className='flex flex-col'>
      <MembershipHero />
      <MembershipIntro />
      <WhyNotFree />
      <MemberBenefits />
      <FoundingMemberOffer />
      <AffiliateNote />
      <IdealMember />
      <CTA
        headline='Ready to Build Something Real?'
        buttonText='Become a Founding Member'
        subtext="If you've read this far and you're still interested, you might be exactly who we're looking for. Join us and let's create something that actually helps people cut through the noise and move forward."
      />
    </main>
  );
}
