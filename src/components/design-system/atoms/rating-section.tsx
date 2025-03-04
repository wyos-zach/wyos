'use client';

import React, { useState } from 'react';
import { StarRating } from '@/components/ui/star-rating';

export function RatingSection() {
  const [rating, setRating] = useState(0);

  return (
    <section className='space-y-6 px-6'>
      <h2 className='font-heading text-3xl font-bold'>Rating</h2>
      <p className='text-muted-foreground'>
        The Rating component allows users to provide feedback or rate items
        using an interactive star system.
      </p>

      {/* Interactive Demo */}
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Interactive Demo</h3>
        <div className='flex flex-col items-start space-y-4'>
          <StarRating
            value={rating}
            setValue={setRating}
            numStars={5}
            iconProps={{ className: 'text-yellow-500' }}
          />
          <p>Current Rating: {rating}</p>
        </div>
      </div>

      {/* Showcase (Disabled State) */}
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Disabled State</h3>
        <StarRating
          value={3}
          numStars={5}
          disabled
          iconProps={{ className: 'text-gray-400' }}
        />
        <p className='text-sm text-gray-500'>This is a read-only rating.</p>
      </div>

      {/* Documentation */}
      <div className='text-sm text-gray-500'>
        <p>Props:</p>
        <ul className='list-inside list-disc'>
          <li>
            **value**: number (current rating, controlled by parent component)
          </li>
          <li>
            **setValue**: Dispatch&lt;SetStateAction&lt;number&gt;&gt; (function
            to update the rating)
          </li>
          <li>**numStars**: number (total number of stars)</li>
          <li>**iconProps**: LucideProps (customize star icon appearance)</li>
          <li>**disabled**: boolean (disable interactivity)</li>
        </ul>
      </div>
    </section>
  );
}
