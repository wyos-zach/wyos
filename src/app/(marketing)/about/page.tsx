'use client';

import { AboutHero } from '@/components/marketing/about/AboutHero';
import { OurStory } from '@/components/marketing/about/OurStory';
import { WhatWeBelieve } from '@/components/marketing/about/WhatWeBelieve';
import { WhoWeAre } from '@/components/marketing/about/WhoWeAre';
import { CTA } from '@/components/z/shared/CTA';

export default function AboutPage() {
  return (
    <main className='flex flex-col'>
      <AboutHero />
      <OurStory />
      <WhoWeAre />
      <WhatWeBelieve />
      <CTA
        headline='Become A Founding Member'
        buttonText='Get Started'
        subtext="We're not trying to attract everyone - we're looking for the right people. If you're tired of the bullshit and ready to help build something real, join us."
      />
    </main>
  );
}
