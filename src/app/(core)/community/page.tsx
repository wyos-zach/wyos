import { CommunityCTA } from '@/components/z/community/CommunityCTA';
import { CommunityIntro } from '@/components/z/community/CommunityIntro';
import { Suspense } from 'react';
import CommunityLoading from './loading';

export default function CommunityPage() {
  return (
    <>
      <Suspense fallback={<CommunityLoading />}>
        <div className='space-y-12'>
          <CommunityIntro />
          <CommunityCTA />
        </div>
      </Suspense>
    </>
  );
}
