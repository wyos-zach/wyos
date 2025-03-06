'use client';

import React from 'react';
import {
  H1,
  H2,
  H3,
  H4,
  P,
  Lead,
  Large,
  Small,
  Subtle,
  Overline,
  GradientText,
} from '@/components/ui/typography';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/atoms/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/atoms/tabs';

export function TypographySection() {
  return (
    <section id='typography' className='space-y-6 border-t py-8'>
      <H2>Typography</H2>
      <P className='text-muted-foreground'>
        Typography components and styles used throughout the application.
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
                <CardTitle>Headings</CardTitle>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='space-y-2'>
                  <H1>Heading 1 (font-heading)</H1>
                  <code className='text-sm text-muted-foreground'>
                    font-heading text-4xl font-bold tracking-tight
                  </code>
                </div>

                <div className='space-y-2'>
                  <H2>Heading 2 (font-heading)</H2>
                  <code className='text-sm text-muted-foreground'>
                    font-heading text-3xl font-semibold tracking-tight
                  </code>
                </div>

                <div className='space-y-2'>
                  <H3>Heading 3 (font-heading)</H3>
                  <code className='text-sm text-muted-foreground'>
                    font-heading text-2xl font-semibold tracking-tight
                  </code>
                </div>

                <div className='space-y-2'>
                  <H4>Heading 4 (font-heading)</H4>
                  <code className='text-sm text-muted-foreground'>
                    font-heading text-xl font-semibold tracking-tight
                  </code>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Paragraphs</CardTitle>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='space-y-2'>
                  <Lead>Lead Paragraph</Lead>
                  <code className='text-sm text-muted-foreground'>
                    text-xl text-muted-foreground
                  </code>
                </div>

                <div className='space-y-2'>
                  <P>Default Paragraph</P>
                  <code className='text-sm text-muted-foreground'>
                    text-base leading-7
                  </code>
                </div>

                <div className='space-y-2'>
                  <Large>Large Text</Large>
                  <code className='text-sm text-muted-foreground'>
                    text-lg font-semibold
                  </code>
                </div>

                <div className='space-y-2'>
                  <Small>Small Text</Small>
                  <code className='text-sm text-muted-foreground'>
                    text-sm font-medium leading-none
                  </code>
                </div>

                <div className='space-y-2'>
                  <Subtle>Subtle Text</Subtle>
                  <code className='text-sm text-muted-foreground'>
                    text-sm text-muted-foreground
                  </code>
                </div>

                <div className='space-y-2'>
                  <Overline>Overline Text</Overline>
                  <code className='text-sm text-muted-foreground'>
                    text-sm uppercase tracking-widest font-medium
                  </code>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Special Text</CardTitle>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='space-y-2'>
                  <GradientText className='text-2xl'>
                    Gradient Text
                  </GradientText>
                  <code className='text-sm text-muted-foreground'>
                    gradient-text
                  </code>
                </div>

                <div className='space-y-2'>
                  <p className='p-regular'>P Regular</p>
                  <code className='text-sm text-muted-foreground'>
                    p-regular
                  </code>
                </div>

                <div className='space-y-2'>
                  <p className='p-small'>P Small</p>
                  <code className='text-sm text-muted-foreground'>p-small</code>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value='usage'>
          <Card>
            <CardHeader>
              <CardTitle>How to Use Typography Components</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div>
                  <h4 className='mb-2 text-lg font-semibold'>Import</h4>
                  <pre className='overflow-x-auto rounded-md bg-muted p-4'>
                    <code>{`import { H1, H2, H3, H4, P, Lead, Large, Small, Subtle, Overline, GradientText } from '@/components/ui/typography';`}</code>
                  </pre>
                </div>

                <div>
                  <h4 className='mb-2 text-lg font-semibold'>Basic Usage</h4>
                  <pre className='overflow-x-auto rounded-md bg-muted p-4'>
                    <code>{`<H1>Main Heading</H1>
<H2>Section Heading</H2>
<P>Regular paragraph text</P>
<Lead>Lead paragraph that introduces a section</Lead>
<GradientText>Special gradient text effect</GradientText>`}</code>
                  </pre>
                </div>

                <div>
                  <h4 className='mb-2 text-lg font-semibold'>
                    With Custom Classes
                  </h4>
                  <pre className='overflow-x-auto rounded-md bg-muted p-4'>
                    <code>{`<H1 className="text-primary mb-8">Custom Heading</H1>
<P className="text-muted-foreground">Custom paragraph</P>`}</code>
                  </pre>
                </div>

                <div className='rounded-md border bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-950'>
                  <h4 className='mb-2 text-lg font-semibold'>Important Note</h4>
                  <p>
                    Always use the typography components for consistent styling
                    across the application. For headings, ensure you're using
                    the <code>font-heading</code> class as it applies the Cinzel
                    font.
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
