'use client';

import React from 'react';
import { H2, P } from '@/components/ui/typography';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import FancyClickEffect from '@/components/ui/fancy-click-effect';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';
import { Spotlight } from '@/components/ui/spotlight';
import { TextEffect } from '@/components/ui/text-effect';
import { TextReveal } from '@/components/ui/text-reveal';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { BeamsBackground } from '@/components/ui/beams-background';

export function EffectsSection() {
  return (
    <section id='effects' className='space-y-6 border-t py-8'>
      <H2>Effects & Animations</H2>
      <P className='text-muted-foreground'>
        Visual effects and animations used to enhance the user experience.
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
                <CardTitle>Motion Animations</CardTitle>
              </CardHeader>
              <CardContent className='flex flex-wrap justify-center gap-4'>
                <motion.div
                  className='h-20 w-20 rounded-lg bg-primary'
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                />

                <motion.div
                  className='h-20 w-20 rounded-lg bg-secondary'
                  animate={{
                    rotate: [0, 0, 10, -10, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                  }}
                />

                <motion.div
                  className='h-20 w-20 rounded-lg bg-accent'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </CardContent>
            </Card>

            <div className='grid gap-6 md:grid-cols-2'>
              <Card>
                <CardHeader>
                  <CardTitle>Glowing Effect</CardTitle>
                </CardHeader>
                <CardContent className='flex justify-center'>
                  <GlowingEffect className='h-40 w-40'>
                    <div className='flex h-40 w-40 items-center justify-center rounded-lg bg-gradient-to-tr from-primary to-accent font-bold text-white'>
                      Hover Me
                    </div>
                  </GlowingEffect>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Fancy Click Effect</CardTitle>
                </CardHeader>
                <CardContent className='flex justify-center'>
                  <FancyClickEffect>
                    <Button variant='outline' className='w-40'>
                      Click Me
                    </Button>
                  </FancyClickEffect>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Hover Border Gradient</CardTitle>
                </CardHeader>
                <CardContent className='flex justify-center'>
                  <HoverBorderGradient
                    containerClassName='p-1'
                    className='flex h-40 w-40 items-center justify-center rounded-lg from-primary to-accent p-4'
                  >
                    <span className='font-bold'>Hover Me</span>
                  </HoverBorderGradient>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Spotlight Effect</CardTitle>
                </CardHeader>
                <CardContent className='flex justify-center'>
                  <div className='relative h-40 w-full rounded-lg'>
                    <Spotlight
                      fill='white'
                      style={{
                        top: '-160px',
                        left: 0,
                        width: '400px',
                        height: '400px',
                      }}
                    />
                    <div className='absolute inset-0 flex items-center justify-center font-bold'>
                      Move cursor here
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Text Effects</CardTitle>
              </CardHeader>
              <CardContent className='grid gap-8'>
                <div className='space-y-2'>
                  <p className='text-sm text-muted-foreground'>Text Effect:</p>
                  <TextEffect className='text-2xl font-bold'>
                    Animated Text Effect
                  </TextEffect>
                </div>

                <div className='space-y-2'>
                  <p className='text-sm text-muted-foreground'>Text Reveal:</p>
                  <TextReveal
                    text='This text reveals on scroll'
                    className='text-2xl font-bold'
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Background Effects</CardTitle>
              </CardHeader>
              <CardContent className='grid gap-6'>
                <div className='relative h-40 overflow-hidden rounded-lg'>
                  <AuroraBackground className='absolute inset-0'>
                    <div className='absolute inset-0 flex items-center justify-center text-2xl font-bold text-white'>
                      Aurora Background
                    </div>
                  </AuroraBackground>
                </div>

                <div className='relative h-40 overflow-hidden rounded-lg'>
                  <BeamsBackground className='absolute inset-0' />
                  <div className='absolute inset-0 flex items-center justify-center text-2xl font-bold text-white'>
                    Beams Background
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value='usage'>
          <Card>
            <CardHeader>
              <CardTitle>How to Use Effects & Animations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div>
                  <h4 className='mb-2 text-lg font-semibold'>Motion Import</h4>
                  <pre className='overflow-x-auto rounded-md bg-muted p-4'>
                    <code>{`import { motion } from 'motion/react';`}</code>
                  </pre>
                </div>

                <div>
                  <h4 className='mb-2 text-lg font-semibold'>
                    Basic Motion Usage
                  </h4>
                  <pre className='overflow-x-auto rounded-md bg-muted p-4'>
                    <code>{`// Hover and tap animations
<motion.div
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  className="your-class"
/>

// Continuous animation
<motion.div
  animate={{
    rotate: [0, 0, 10, -10, 0],
  }}
  transition={{
    repeat: Infinity,
    duration: 2,
  }}
  className="your-class"
/>

// Entrance animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="your-class"
/>`}</code>
                  </pre>
                </div>

                <div>
                  <h4 className='mb-2 text-lg font-semibold'>
                    Effect Components
                  </h4>
                  <pre className='overflow-x-auto rounded-md bg-muted p-4'>
                    <code>{`// Glowing Effect
import { GlowingEffect } from '@/components/ui/glowing-effect';

<GlowingEffect>
  <div className="your-content">Content</div>
</GlowingEffect>

// Fancy Click Effect
import { FancyClickEffect } from '@/components/ui/fancy-click-effect';

<FancyClickEffect>
  <Button>Click Me</Button>
</FancyClickEffect>

// Hover Border Gradient
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';

<HoverBorderGradient
  containerClassName="p-1"
<HoverBorderGradient
  containerClassName="p-1"
  className="p-4 from-primary to-accent"
>
  <span>Content</span>
</HoverBorderGradient>
import { Spotlight } from '@/components/ui/spotlight';

<div className="relative">
  <Spotlight className="-top-40 left-0" fill="white" />
  <div className="content">Content</div>
</div>`}</code>
                  </pre>
                </div>

                <div>
                  <h4 className='mb-2 text-lg font-semibold'>Text Effects</h4>
                  <pre className='overflow-x-auto rounded-md bg-muted p-4'>
                    <code>{`// Text Effect
import { TextEffect } from '@/components/ui/text-effect';

<TextEffect className="text-2xl font-bold">
  Your text here
</TextEffect>

// Text Reveal

<TextReveal
  text="This text reveals on scroll"
  className="text-2xl font-bold"
/>`}</code>
                  </pre>
                </div>

                <div>
                  <h4 className='mb-2 text-lg font-semibold'>
                    Background Effects
                  </h4>
                  <pre className='overflow-x-auto rounded-md bg-muted p-4'>
                    <code>{`// Aurora Background
import { AuroraBackground } from '@/components/ui/aurora-background';

<div className="relative">
  <AuroraBackground className="absolute inset-0" />
  <div className="content">Your content</div>
</div>

// Beams Background
import { BeamsBackground } from '@/components/ui/beams-background';

<div className="relative">
  <BeamsBackground className="absolute inset-0" />
  <div className="content">Your content</div>
</div>`}</code>
                  </pre>
                </div>

                <div className='rounded-md border bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-950'>
                  <h4 className='mb-2 text-lg font-semibold'>Important Note</h4>
                  <p>
                    Always use <code>motion/react</code> for animations, not{' '}
                    <code>framer-motion</code>. The project is configured to use{' '}
                    <code>motion/react</code> specifically.
                  </p>
                  <p className='mt-2'>
                    Use animations thoughtfully and sparingly to enhance the
                    user experience without causing distractions or performance
                    issues.
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
