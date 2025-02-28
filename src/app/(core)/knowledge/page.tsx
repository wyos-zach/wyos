'use client';

import { Suspense } from 'react';
import { EnhancedKnowledgeCategoryGrid } from '@/components/core/knowledge/EnhancedKnowledgeCategoryGrid';
import { CategoryNav } from '@/components/core/knowledge/CategoryNav';
import { KnowledgeHero } from '@/components/core/knowledge/hero/KnowledgeHero';
import { EnhancedIntroduction } from '@/components/core/knowledge/hero/EnhancedIntroduction';
import KnowledgeLoading from './loading';
import { motion } from 'motion/react';

export default function KnowledgePage() {
  return (
    <div className='flex min-h-screen flex-col bg-[#0c0c10]'>
      {/* Hero Section */}
      <KnowledgeHero
        title='Knowledge Hub'
        description='Curated wisdom for intentional living'
      />

      {/* Main Content */}
      <div className='relative'>
        {/* Gradient connector between hero and content */}
        <div className='absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0c0c10] to-[#0c0c10]/0'></div>

        {/* Introduction Section - Properly positioned */}
        <div className='relative z-10 mx-auto max-w-7xl px-4 pt-24'>
          <EnhancedIntroduction />
        </div>

        {/* Category Grid Section with Seamless Background */}
        <div className='relative mt-20 pb-32'>
          {/* Subtle background for depth - Full width, no limitations */}
          <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.1),transparent_70%)] opacity-30' />
          <div className='absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:80px_80px] opacity-30' />

          {/* Content */}
          <div className='relative z-10'>
            {/* Section Heading */}
            <div className='mx-auto mb-12 max-w-7xl px-4 text-center'>
              <h2 className='text-3xl font-bold tracking-tight text-white md:text-4xl'>
                Explore Categories
              </h2>
            </div>

            {/* Category Navigation */}
            <CategoryNav />

            {/* Category Grid and Community Section */}
            <Suspense fallback={<KnowledgeLoading />}>
              <div className='mx-auto max-w-7xl px-4'>
                {/* Category Grid */}
                <EnhancedKnowledgeCategoryGrid />

                {/* Community Suggestions Section */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className='mx-auto mt-40 max-w-4xl rounded-xl border border-zinc-800/50 bg-zinc-900/30 p-10 text-center backdrop-blur-sm'
                >
                  <h3 className='mb-4 text-2xl font-medium'>
                    Help Us Grow This Collection
                  </h3>
                  <p className='mx-auto max-w-2xl text-zinc-400'>
                    Found something that's genuinely helped you and should be
                    included here? We're building this knowledge base together.
                    Share your suggestions with us to help others discover
                    valuable insights.
                  </p>
                </motion.div>
              </div>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
