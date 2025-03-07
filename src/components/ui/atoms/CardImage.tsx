'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';

interface CardImageProps {
  imageUrl?: string;
  alt: string;
  className?: string;
}

export const CardImage = ({ imageUrl, alt, className }: CardImageProps) => {
  if (!imageUrl) return null;
  return (
    <div className={cn('relative aspect-[16/9] w-full p-2', className)}>
      <div className='relative h-full w-full overflow-hidden rounded-lg'>
        <Image
          src={imageUrl}
          alt={alt}
          fill
          className='object-cover transition-transform duration-300 group-hover:scale-105'
          sizes='(max-width: 768px) 100vw, 33vw'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-[#131316]/70 via-[rgba(19,19,22,0.5)] to-transparent' />
      </div>
    </div>
  );
};
