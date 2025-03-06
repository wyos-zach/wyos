// components/design-system/atoms/tabs-section.tsx
import React from 'react';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/atoms/tabs';

export function TabsSection() {
  return (
    <section className='space-y-6 border-t border-zinc-700/30 px-6 py-8'>
      <h2 className='font-heading text-3xl font-bold text-zinc-100'>Tabs</h2>
      <p className='text-zinc-400'>
        Tabs switch between content with a premium, modern design. Used for
        navigation or grouping.
      </p>

      <Tabs defaultValue='tab1' className='w-[400px]'>
        <TabsList aria-label='Content Tabs'>
          <TabsTrigger value='tab1'>Tab 1</TabsTrigger>
          <TabsTrigger value='tab2'>Tab 2</TabsTrigger>
          <TabsTrigger value='tab3' disabled>
            Tab 3 (Disabled)
          </TabsTrigger>
        </TabsList>
        <TabsContent value='tab1'>
          Tab 1: Sleek and premium content area.
        </TabsContent>
        <TabsContent value='tab2'>
          Tab 2: Smooth, tactile switching.
        </TabsContent>
        <TabsContent value='tab3'>Tab 3: Disabled but consistent.</TabsContent>
      </Tabs>

      <div className='text-sm text-zinc-500'>
        <p>Props:</p>
        <ul className='list-inside list-disc'>
          <li>defaultValue: string (initial tab)</li>
          <li>value: string (controlled tab)</li>
          <li>disabled: boolean (disables trigger)</li>
        </ul>
      </div>
    </section>
  );
}
