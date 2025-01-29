'use client';

import { useRouter } from 'next/router';

export default function KnowledgeDetailPage() {
  const router = useRouter();
  const { slug } = router.query;

  // Placeholder content until API integration
  return (
    <article className='prose mx-auto'>
      <h1>{slug}</h1>
      <p>This is where the detailed content for the knowledge entry will go.</p>
    </article>
  );
}
