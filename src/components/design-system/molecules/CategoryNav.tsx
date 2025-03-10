'use client';
import { Button } from '@/components/design-system/atoms/button'; // Assuming this is your ShadcN Button
import { cn } from '@/lib/utils';
import { motion } from 'motion/react'; // Using motion/react as specified

export interface CategoryNavProps {
  categories: { id: string; name: string; slug: string }[];
  selectedCategory: string | null;
  onSelectAction: (slug: string | null) => void;
  className?: string;
}

export const CategoryNav = ({
  categories,
  selectedCategory,
  onSelectAction,
  className,
}: CategoryNavProps) => {
  return (
    <nav
      className={cn(
        'mx-auto flex max-w-5xl justify-center gap-3 overflow-x-auto px-4 py-4',
        className
      )}
    >
      {/* "All" Button */}
      <div className='relative'>
        <Button
          variant='outline'
          onClick={() => onSelectAction(null)}
          className={cn(
            'min-w-[80px] rounded-lg border border-zinc-700/30 bg-zinc-900/40 px-6 py-2 text-sm font-medium text-zinc-100 shadow-sm backdrop-blur-md transition-all duration-200',
            !selectedCategory &&
              'border-primary/40 bg-gradient-to-b from-primary/20 to-primary/10 text-primary shadow-[0_0_8px_rgba(59,130,246,0.2)]',
            selectedCategory && 'hover:bg-zinc-800/60 hover:text-white'
          )}
        >
          All
        </Button>
        {!selectedCategory && (
          <motion.div
            layoutId='category-highlight'
            className='absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-primary/30 to-transparent blur-md'
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </div>

      {/* Category Buttons */}
      {categories.map((category) => (
        <div key={category.id} className='relative'>
          <Button
            variant='outline'
            onClick={() => onSelectAction(category.slug)}
            className={cn(
              'min-w-[80px] rounded-lg border border-zinc-700/30 bg-zinc-900/40 px-6 py-2 text-sm font-medium text-zinc-100 shadow-sm backdrop-blur-md transition-all duration-200',
              selectedCategory === category.slug &&
                'border-primary/40 bg-gradient-to-b from-primary/20 to-primary/10 text-primary shadow-[0_0_8px_rgba(59,130,246,0.2)]',
              selectedCategory !== category.slug &&
                'hover:bg-zinc-800/60 hover:text-white'
            )}
          >
            {category.name}
          </Button>
          {selectedCategory === category.slug && (
            <motion.div
              layoutId='category-highlight'
              className='absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-primary/30 to-transparent blur-md'
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </div>
      ))}
    </nav>
  );
};

CategoryNav.displayName = 'CategoryNav';
