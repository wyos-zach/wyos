'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/design-system/atoms/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/design-system/atoms/tabs';
import { H2, P } from '@/components/ui/typography';
import { cn } from '@/lib/utils';

interface ColorSwatchProps {
  name: string;
  variable: string;
  className?: string;
  textClass?: string;
}

function ColorSwatch({
  name,
  variable,
  className,
  textClass,
}: ColorSwatchProps) {
  return (
    <div className='space-y-1.5'>
      <div className={cn('h-16 w-full rounded-md', className)} />
      <div className='space-y-0.5'>
        <div className={cn('text-sm font-medium', textClass)}>{name}</div>
        <div className='text-xs text-muted-foreground'>{variable}</div>
      </div>
    </div>
  );
}

export function ColorsSection() {
  return (
    <section id='colors' className='space-y-6 border-t py-8'>
      <H2>Colors</H2>
      <P className='text-muted-foreground'>
        The color palette used throughout the application.
      </P>

      <Tabs defaultValue='preview'>
        <TabsList className='mb-4'>
          <TabsTrigger value='preview'>Preview</TabsTrigger>
          <TabsTrigger value='usage'>Usage</TabsTrigger>
        </TabsList>

        <TabsContent value='preview'>
          <div className='grid gap-6'>
            <Card>
              <CardHeader>
                <CardTitle>Primary Colors</CardTitle>
              </CardHeader>
              <CardContent className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                <ColorSwatch
                  name='Background'
                  variable='--background'
                  className='border bg-background'
                />
                <ColorSwatch
                  name='Foreground'
                  variable='--foreground'
                  className='bg-foreground'
                  textClass='text-white'
                />
                <ColorSwatch
                  name='Primary'
                  variable='--primary'
                  className='bg-primary'
                  textClass='text-white'
                />
                <ColorSwatch
                  name='Primary Foreground'
                  variable='--primary-foreground'
                  className='border bg-primary-foreground'
                />
                <ColorSwatch
                  name='Secondary'
                  variable='--secondary'
                  className='bg-secondary'
                />
                <ColorSwatch
                  name='Secondary Foreground'
                  variable='--secondary-foreground'
                  className='bg-secondary-foreground'
                  textClass='text-white'
                />
                <ColorSwatch
                  name='Muted'
                  variable='--muted'
                  className='bg-muted'
                />
                <ColorSwatch
                  name='Muted Foreground'
                  variable='--muted-foreground'
                  className='bg-muted-foreground'
                  textClass='text-white'
                />
                <ColorSwatch
                  name='Accent'
                  variable='--accent'
                  className='bg-accent'
                />
                <ColorSwatch
                  name='Accent Foreground'
                  variable='--accent-foreground'
                  className='bg-accent-foreground'
                  textClass='text-white'
                />
                <ColorSwatch
                  name='Destructive'
                  variable='--destructive'
                  className='bg-destructive'
                  textClass='text-white'
                />
                <ColorSwatch
                  name='Destructive Foreground'
                  variable='--destructive-foreground'
                  className='border bg-destructive-foreground'
                />
                <ColorSwatch
                  name='Border'
                  variable='--border'
                  className='bg-border'
                />
                <ColorSwatch
                  name='Input'
                  variable='--input'
                  className='bg-input'
                />
                <ColorSwatch
                  name='Ring'
                  variable='--ring'
                  className='bg-ring'
                  textClass='text-white'
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sidebar Colors</CardTitle>
              </CardHeader>
              <CardContent className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                <ColorSwatch
                  name='Sidebar Background'
                  variable='--sidebar-background'
                  className='bg-sidebar'
                />
                <ColorSwatch
                  name='Sidebar Foreground'
                  variable='--sidebar-foreground'
                  className='bg-sidebar-foreground'
                  textClass='text-white'
                />
                <ColorSwatch
                  name='Sidebar Primary'
                  variable='--sidebar-primary'
                  className='bg-sidebar-primary'
                  textClass='text-white'
                />
                <ColorSwatch
                  name='Sidebar Primary Foreground'
                  variable='--sidebar-primary-foreground'
                  className='border bg-sidebar-primary-foreground'
                />
                <ColorSwatch
                  name='Sidebar Accent'
                  variable='--sidebar-accent'
                  className='bg-sidebar-accent'
                />
                <ColorSwatch
                  name='Sidebar Accent Foreground'
                  variable='--sidebar-accent-foreground'
                  className='bg-sidebar-accent-foreground'
                  textClass='text-white'
                />
                <ColorSwatch
                  name='Sidebar Border'
                  variable='--sidebar-border'
                  className='bg-sidebar-border'
                />
                <ColorSwatch
                  name='Sidebar Ring'
                  variable='--sidebar-ring'
                  className='bg-sidebar-ring'
                  textClass='text-white'
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Chart Colors</CardTitle>
              </CardHeader>
              <CardContent className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
                <ColorSwatch
                  name='Chart 1'
                  variable='--chart-1'
                  className='bg-chart-1'
                  textClass='text-white'
                />
                <ColorSwatch
                  name='Chart 2'
                  variable='--chart-2'
                  className='bg-chart-2'
                  textClass='text-white'
                />
                <ColorSwatch
                  name='Chart 3'
                  variable='--chart-3'
                  className='bg-chart-3'
                  textClass='text-white'
                />
                <ColorSwatch
                  name='Chart 4'
                  variable='--chart-4'
                  className='bg-chart-4'
                  textClass='text-white'
                />
                <ColorSwatch
                  name='Chart 5'
                  variable='--chart-5'
                  className='bg-chart-5'
                  textClass='text-white'
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Button Colors</CardTitle>
              </CardHeader>
              <CardContent className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
                <ColorSwatch
                  name='Button Background'
                  variable='--button-bg'
                  className='bg-[var(--button-bg)]'
                />
                <ColorSwatch
                  name='Button Hover'
                  variable='--button-hover'
                  className='bg-[var(--button-hover)]'
                />
                <ColorSwatch
                  name='Button Text'
                  variable='--button-text'
                  className='bg-[var(--button-text)]'
                  textClass='text-white'
                />
                <ColorSwatch
                  name='Button Border'
                  variable='--button-border'
                  className='bg-[var(--button-border)]'
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value='usage'>
          <Card>
            <CardHeader>
              <CardTitle>How to Use Colors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div>
                  <h4 className='mb-2 text-lg font-semibold'>
                    Tailwind Classes
                  </h4>
                  <pre className='overflow-x-auto rounded-md bg-muted p-4'>
                    <code>{`<div className="bg-primary text-primary-foreground">
  Primary background with appropriate text color
</div>

<div className="bg-secondary text-secondary-foreground">
  Secondary background with appropriate text color
</div>

<div className="bg-muted text-muted-foreground">
  Muted background with appropriate text color
</div>`}</code>
                  </pre>
                </div>

                <div>
                  <h4 className='mb-2 text-lg font-semibold'>CSS Variables</h4>
                  <pre className='overflow-x-auto rounded-md bg-muted p-4'>
                    <code>{`.custom-element {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  border: 1px solid hsl(var(--border));
}`}</code>
                  </pre>
                </div>

                <div>
                  <h4 className='mb-2 text-lg font-semibold'>
                    Direct Variable Usage
                  </h4>
                  <pre className='overflow-x-auto rounded-md bg-muted p-4'>
                    <code>{`<div className="bg-[var(--button-bg)] text-[var(--button-text)]">
  Using CSS variables directly in Tailwind
</div>`}</code>
                  </pre>
                </div>

                <div className='rounded-md border bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-950'>
                  <h4 className='mb-2 text-lg font-semibold'>Important Note</h4>
                  <p>
                    Always use the semantic color variables (like primary,
                    secondary, etc.) rather than hardcoded color values to
                    ensure consistency and support for both light and dark
                    modes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}
