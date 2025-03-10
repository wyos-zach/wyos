'use client';
import { Input } from '@/components/design-system/atoms/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/design-system/atoms/select';
import { motion } from 'motion/react';

export function EnhancedIntroduction() {
  return (
    <div className='space-y-16'>
      {/* Introduction Text */}
      <div className='space-y-6'>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className='text-lg leading-relaxed text-zinc-300'
        >
          The internet's become a place full of generic, regurgitated advice
          that's posted because it sounds good or ranks on Google. And now with
          AI generated content everywhere finding valuable insights is becoming
          harder than ever. So, we wanted to create a space to make that easier
          for you.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className='text-lg leading-relaxed text-zinc-300'
        >
          The Knowledge Hub is where we've gathered insights that actually help
          people improve their lives and level up. It contains everything from
          frameworks to articles to useful summaries across dozens of topics.
          You'll find content on building habits, developing a growth mindset,
          improving productivity, growing businesses, and much more.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className='text-lg leading-relaxed text-zinc-300'
        >
          Everything here was chosen because it offers something valuable - not
          because it just gets attention.
        </motion.p>
      </div>

      {/* Search and Filter Section - Positioned at the bottom of the intro */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className='mx-auto max-w-3xl'
      >
        <div className='rounded-xl border border-zinc-800/50 bg-[#131316]/80 p-6 backdrop-blur-md'>
          <div className='mb-4 text-center'>
            <h3 className='text-xl font-medium text-white'>Find Knowledge</h3>
            <p className='mt-1 text-sm text-zinc-400'>
              Search our curated collection or browse by category
            </p>
          </div>

          <div className='flex flex-col gap-4 sm:flex-row'>
            <div className='relative flex-1'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
              <Input
                placeholder='Search knowledge...'
                className='border-zinc-800 bg-zinc-900/80 pl-10 text-base focus:border-primary/50 focus:ring-primary/20'
              />
            </div>
            <Select>
              <SelectTrigger className='w-full border-zinc-800 bg-zinc-900/80 text-base focus:border-primary/50 focus:ring-primary/20 sm:w-[180px]'>
                <SelectValue placeholder='Sort by' />
              </SelectTrigger>
              <SelectContent className='border-zinc-800 bg-zinc-900'>
                <SelectItem value='alphabetical'>Alphabetical</SelectItem>
                <SelectItem value='popular'>Most Popular</SelectItem>
                <SelectItem value='recent'>Recently Updated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
