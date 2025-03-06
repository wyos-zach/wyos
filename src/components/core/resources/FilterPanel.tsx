'use client';

import { Button } from '@/components/ui/atoms/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/ui/molecules/dropdown';
import { SlidersHorizontal } from 'lucide-react';

interface FilterPanelProps {
  _onFilterChange?: (filters: string[]) => void;
}

export function FilterPanel({ _onFilterChange }: FilterPanelProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='sm' className='gap-2'>
          <SlidersHorizontal className='h-4 w-4' />
          Filters
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-48'>
        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked>
          Featured Resources
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>Recently Added</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>Most Popular</DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
