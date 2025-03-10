'use client';

import { Button } from '@/components/ui/atoms/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { KnowledgeService } from '@/models/server/knowledge';
import { ResourceService } from '@/models/server/resources';
import { useContentStore } from '@/store/useContentStore';
import type { KnowledgeCategory } from '@/types/core/knowledge/category';
import type { ResourceCategory } from '@/types/core/resources/category';
import { motion } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

type ContentType = 'knowledge' | 'resources';

interface FilterSortPanelProps {
  section: ContentType;
}

export function FilterSortPanel({ section }: FilterSortPanelProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const { selectedCategory, setCategory, setSortBy } = useContentStore(
    (state) => ({
      selectedCategory: state[section].selectedCategory,
      setCategory: (categoryId: string | null) =>
        state.setCategory(section, categoryId),
      setSortBy: (sort: string) => state.setSortBy(section, sort),
    })
  );

  const fetchCategories = useCallback(async () => {
    const _service =
      section === 'knowledge' ? KnowledgeService : ResourceService;
    let cats: (KnowledgeCategory | ResourceCategory)[];
    if (section === 'knowledge') {
      cats = await KnowledgeService.getKnowledgeCategories();
    } else {
      cats = await ResourceService.getResourceCategories();
    }
    setCategories(cats.map((cat) => cat.$id));
  }, [section]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleCategoryChange = (categoryId: string) => {
    setCategory(categoryId === 'all' ? null : categoryId);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className='gap-2 border border-border/50 bg-card/50 backdrop-blur-md transition-colors duration-200 hover:bg-card/70'
        >
          <SlidersHorizontal className='h-4 w-4' />
          <span>Filter & Sort</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='w-56 rounded-lg border border-border/50 bg-card/70 shadow-lg backdrop-blur-md'
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <DropdownMenuLabel className='font-medium text-foreground'>
            Filter by
          </DropdownMenuLabel>
          <DropdownMenuSeparator className='bg-border/30' />
          <DropdownMenuCheckboxItem
            checked={!selectedCategory}
            onCheckedChange={() => handleCategoryChange('all')}
            className='text-foreground hover:bg-accent/20'
          >
            All Categories
          </DropdownMenuCheckboxItem>
          {categories.map((categoryId) => (
            <DropdownMenuCheckboxItem
              key={categoryId}
              checked={selectedCategory === categoryId}
              onCheckedChange={() => handleCategoryChange(categoryId)}
              className='text-foreground hover:bg-accent/20'
            >
              {categoryId} {/* Replace with cat.name if available */}
            </DropdownMenuCheckboxItem>
          ))}
          <DropdownMenuCheckboxItem
            checked={false} // Placeholder for featured filter
            onCheckedChange={(checked) => console.warn('Featured:', checked)} // Changed to console.warn
            className='text-foreground hover:bg-accent/20'
          >
            Featured Only
          </DropdownMenuCheckboxItem>

          <DropdownMenuLabel className='mt-2 font-medium text-foreground'>
            Sort by
          </DropdownMenuLabel>
          <DropdownMenuSeparator className='bg-border/30' />
          <DropdownMenuRadioItem
            value='latest'
            onSelect={() => handleSortChange('latest')}
            className='text-foreground hover:bg-accent/20'
          >
            Latest
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value='popular'
            onSelect={() => handleSortChange('popular')}
            className='text-foreground hover:bg-accent/20'
          >
            Most Popular
          </DropdownMenuRadioItem>
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
