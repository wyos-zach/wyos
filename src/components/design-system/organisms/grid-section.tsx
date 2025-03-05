'use client';

import { useState } from 'react';
import { H2, P } from '@/components/ui/typography';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/atoms/card';
import { motion } from 'motion/react';
import Image from 'next/image';

// Sample data for the grid display
const categories = [
  {
    title: 'React',
    description:
      'Modern JavaScript library for building user interfaces. Master component-based architecture and efficient state management.',
    imageUrl: '/images/placeholder.png',
    category: 'Frontend',
  },
  {
    title: 'Next.js',
    description:
      'The React framework for production. Create high-performance server-side rendered and statically generated applications.',
    imageUrl: '/images/placeholder.png',
    category: 'Framework',
  },
  {
    title: 'TypeScript',
    description:
      'Strongly typed superset of JavaScript. Enhance your development workflow with powerful static type checking and tooling.',
    imageUrl: '/images/placeholder.png',
    category: 'Language',
  },
  {
    title: 'Tailwind CSS',
    description:
      'Utility-first CSS framework for rapid UI development. Build modern, responsive layouts without leaving your HTML.',
    imageUrl: '/images/placeholder.png',
    category: 'Styling',
  },
  {
    title: 'GraphQL',
    description:
      'Query language for your API. Optimize data fetching with precise queries and unlock new levels of flexibility in your applications.',
    imageUrl: '/images/placeholder.png',
    category: 'API',
  },
  {
    title: 'Docker',
    description:
      'Platform for containerized applications. Streamline development, deployment, and scaling with consistent environments across your stack.',
    imageUrl: '/images/placeholder.png',
    category: 'DevOps',
  },
];

// Modern Knowledge Card Component
function ModernKnowledgeCard({
  title,
  description,
  imageUrl,
  category,
}: {
  title: string;
  description: string;
  imageUrl: string;
  category?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    // Reset the clicked state after the animation completes
    setTimeout(() => setIsClicked(false), 300);
  };

  return (
    <motion.div
      className='group relative overflow-hidden rounded-xl border border-gray-700 transition-all duration-300 ease-in-out'
      style={{
        height: '320px',
      }}
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
        scale: {
          duration: 0.3,
        },
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
        {/* Gradient overlay on the image */}
        <div className='absolute inset-0 z-10 bg-gradient-to-b from-transparent via-black/50 to-black/90' />
      </div>

      <div className='relative z-20 flex h-full w-full flex-col p-6'>
        {category && (
          <div className='mb-2 text-xs font-semibold uppercase tracking-wider text-blue-800'>
            {category}
          </div>
        )}

        <div className='mt-auto'>
          <motion.h3
            className='mb-2 font-heading text-2xl font-semibold tracking-tight text-white'
            initial={{ y: 0 }}
            animate={{ y: isHovered ? -10 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h3>
          <motion.p
            className='text-sm leading-relaxed text-gray-300'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
          >
            {description}
          </motion.p>
        </div>
      </div>

      <motion.div
        className='absolute inset-0 bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-transparent opacity-0'
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

export function KnowledgeGridSection() {
  return (
    <section id='grid' className='space-y-6 border-t py-8'>
      <H2>Grid Layout</H2>
      <P className='text-muted-foreground'>
        Modern grid layouts for displaying collections of content with
        consistent spacing and responsive behavior.
      </P>

      <Tabs defaultValue='preview'>
        <TabsList className='mb-4'>
          <TabsTrigger value='preview'>Preview</TabsTrigger>
          <TabsTrigger value='usage'>Usage</TabsTrigger>
        </TabsList>

        <TabsContent value='preview'>
          <div className='mb-6'>
            <h3 className='mb-4 text-xl font-semibold'>Knowledge Hub Grid</h3>
            <p className='mb-6 text-muted-foreground'>
              A responsive grid layout with modern, sleek, and premium card
              designs featuring hover effects and animations.
            </p>

            <div>
              <div className='mx-auto'>
                <h1 className='mb-4 font-heading text-3xl font-bold tracking-tight'>
                  Knowledge Hub
                </h1>
                <p className='mb-8 max-w-3xl text-lg text-muted-foreground'>
                  Explore cutting-edge technologies and elevate your development
                  skills with our curated resources.
                </p>
                <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
                  {categories.map((category, index) => (
                    <ModernKnowledgeCard
                      key={index}
                      title={category.title}
                      description={category.description}
                      imageUrl={category.imageUrl}
                      category={category.category}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value='usage'>
          <Card>
            <div className='space-y-4 p-6'>
              <h3 className='text-xl font-semibold'>Grid Implementation</h3>
              <p className='text-muted-foreground'>
                Use Tailwind CSS grid classes to create responsive grid layouts
                with modern card components.
              </p>

              <div>
                <h4 className='mb-2 text-lg font-semibold'>
                  Basic Grid Structure
                </h4>
                <pre className='overflow-x-auto rounded-md bg-muted p-4'>
                  <code>{`<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {items.map((item, index) => (
    <ModernKnowledgeCard
      key={index}
      title={item.title}
      description={item.description}
      imageUrl={item.imageUrl}
      category={item.category}
    />
  ))}
</div>`}</code>
                </pre>
              </div>

              <div>
                <h4 className='mb-2 text-lg font-semibold'>
                  Modern Knowledge Card Component
                </h4>
                <pre className='overflow-x-auto rounded-md bg-muted p-4'>
                  <code>{`
// Import the motion library from motion/react (NOT framer-motion)
import { motion } from 'motion/react';
import Image from 'next/image';
import { useState } from 'react';

function ModernKnowledgeCard({ title, description, imageUrl, category }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative overflow-hidden rounded-xl border border-gray-700 group"
      style={{ height: "320px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="absolute inset-0 h-full w-full">
        <Image
          src={imageUrl || "/images/placeholder.png"}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
          priority
        />
        {/* Gradient overlay on the image */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-black/50 to-black/90" />
      </div>

      <div className="relative z-20 flex h-full w-full flex-col p-6">
        {category && (
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
            {category}
          </div>
        )}

        <div className="mt-auto">
          <motion.h3 
            className="gradient-text mb-2 font-heading text-2xl font-semibold tracking-tight text-white"
            initial={{ y: 0 }}
            animate={{ y: isHovered ? -10 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h3>
          <motion.p
            className="text-sm leading-relaxed text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
          >
            {description}
          </motion.p>
        </div>
      </div>

      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-blue-500/10 to-transparent opacity-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}`}</code>
                </pre>
              </div>

              <div>
                <h4 className='mb-2 text-lg font-semibold'>
                  Responsive Behavior
                </h4>
                <ul className='list-disc space-y-2 pl-6'>
                  <li>
                    <code className='rounded bg-muted px-1 py-0.5'>
                      grid-cols-1
                    </code>
                    : Single column on mobile
                  </li>
                  <li>
                    <code className='rounded bg-muted px-1 py-0.5'>
                      md:grid-cols-2
                    </code>
                    : Two columns on medium screens
                  </li>
                  <li>
                    <code className='rounded bg-muted px-1 py-0.5'>
                      lg:grid-cols-3
                    </code>
                    : Three columns on large screens
                  </li>
                  <li>
                    <code className='rounded bg-muted px-1 py-0.5'>gap-8</code>:
                    Consistent spacing between grid items
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}
