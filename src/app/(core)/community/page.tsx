import React from 'react';

export default function CommunityPage() {
  return (
    <main className='flex h-full w-full flex-col items-center justify-center'>
      <iframe
        src='https://community.writingyourownstory.com'
        title='WYOS Community'
        className='h-[calc(100vh-64px)] w-full border-none'
        sandbox='allow-same-origin allow-scripts allow-forms allow-popups allow-downloads'
      />
    </main>
  );
}
