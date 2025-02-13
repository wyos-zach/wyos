import { Suspense } from 'react';
import { PageHeader } from '@/components/shared/layout/PageHeader';
import { CommunityIntro } from '@/components/core/community/CommunityIntro';
import { CommunityCTA } from '@/components/core/community/CommunityCTA';
import CommunityLoading from './loading';

export default function CommunityPage() {
  return (
    <>
      <PageHeader
        title='WYOS Community'
        description='Real conversations with people committed to growth'
        pattern='dots'
        size='large'
        align='center'
      />
      <Suspense fallback={<CommunityLoading />}>
        <div className='space-y-12'>
          <CommunityIntro />
          <CommunityCTA />
        </div>
      </Suspense>
    </>
  );
}
