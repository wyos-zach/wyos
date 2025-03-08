'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { useState } from 'react';

interface KnowledgeCardProps {
  title: string;
  description: string;
  imageUrl: string;
  category?: string;
}

export function KnowledgeCard({
  title,
  description,
  imageUrl,
  category,
}: KnowledgeCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
  };

  return (
    <motion.div
      className='group relative overflow-hidden rounded-xl border border-gray-700 transition-all duration-300 ease-in-out'
      style={{ height: '320px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      animate={{
        scale: isClicked ? [1, 0.97, 1] : isHovered ? [1, 1.05, 1] : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
        scale: { duration: 0.3 },
      }}
    >
      <div className='absolute inset-0 h-full w-full'>
        <Image
          src={imageUrl || '/images/placeholder.png'}
          alt={title}
          fill
          className='object-cover transition-transform duration-700 ease-in-out group-hover:scale-110'
          priority
        />
        <div
          className='absolute inset-0 z-10'
          style={{
            background:
              'linear-gradient(to bottom, rgba(0, 0, 0, 0) 35%, rgba(0, 0, 0, 0.7) 80%, rgba(0, 0, 0, 1) 100%)',
          }}
        />
      </div>

      <div className='relative z-20 flex h-full w-full flex-col p-6'>
        {category && (
          <div className='mb-4 text-xs font-semibold uppercase tracking-wider text-blue-900/60'>
            {category}
          </div>
        )}

        <div className='mt-auto'>
          <div className='space-y-2'>
            <motion.h3
              className='mb-2 font-heading text-2xl font-semibold tracking-tight text-white'
              initial={{ y: 20 }}
              animate={{ y: isHovered ? 10 : 20 }}
              transition={{
                duration: 0.3,
              }}
            >
              {title}
            </motion.h3>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              transition={{
                duration: 0.3,
              }}
            >
              <p className='text-sm leading-relaxed text-gray-300'>
                {description}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        className='absolute inset-0 bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-transparent opacity-0'
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{
          duration: 0.3,
        }}
      />
    </motion.div>
  );
}
