'use client';

import React from 'react';
import { H2, P } from '@/components/ui/typography';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { FancyClickEffect } from '@/components/ui/fancy-click-effect';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';
import { Spotlight } from '@/components/ui/spotlight';
import { TextEffect } from '@/components/ui/text-effect';
import { TextReveal } from '@/components/ui/text-reveal';
import { TracingBeam } from '@/components/ui/tracing-beam';
import { ContainerScrollAnimation } from '@/components/ui/container-scroll-animation';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { BeamsBackground } from '@/components/ui/beams-background';

export function EffectsSection() {
  return (
    <section id="effects" className="space-y-6 py-8 border-t">
      <H2>Effects & Animations</H2>
      <P className="text-muted-foreground">
        Visual effects and animations used to enhance the user experience.
      </P>

      <Tabs defaultValue="preview">
        <TabsList className="mb-4">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
        </TabsList>
        
        <TabsContent value="preview">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Motion Animations</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4 justify-center">
                <motion.div
                  className="w-20 h-20 bg-primary rounded-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                />
                
                <motion.div
                  className="w-20 h-20 bg-secondary rounded-lg"
                  animate={{
                    rotate: [0, 0, 10, -10, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                  }}
                />
                
                <motion.div
                  className="w-20 h-20 bg-accent rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </CardContent>
            </Card>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Glowing Effect</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <GlowingEffect>
                    <div className="w-40 h-40 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-bold">
                      Hover Me
                    </div>
                  </GlowingEffect>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Fancy Click Effect</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <FancyClickEffect>
                    <Button variant="outline" className="w-40">Click Me</Button>
                  </FancyClickEffect>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Hover Border Gradient</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <HoverBorderGradient
                    containerClassName="p-1"
                    className="p-4 w-40 h-40 rounded-lg flex items-center justify-center"
                    from="from-primary"
                    to="to-accent"
                  >
                    <span className="font-bold">Hover Me</span>
                  </HoverBorderGradient>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Spotlight Effect</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <div className="relative h-40 w-full rounded-lg">
                    <Spotlight
                      className="-top-40 left-0"
                      fill="white"
                    />
                    <div className="absolute inset-0 flex items-center justify-center font-bold">
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
              <CardContent className="grid gap-8">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Text Effect:</p>
                  <TextEffect
                    text="Animated Text Effect"
                    className="text-2xl font-bold"
                  />
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Text Reveal:</p>
                  <TextReveal
                    text="This text reveals on scroll"
                    className="text-2xl font-bold"
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Background Effects</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="relative h-40 rounded-lg overflow-hidden">
                  <AuroraBackground className="absolute inset-0" />
                  <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-2xl">
                    Aurora Background
                  </div>
                </div>
                
                <div className="relative h-40 rounded-lg overflow-hidden">
                  <BeamsBackground className="absolute inset-0" />
                  <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-2xl">
                    Beams Background
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="usage">
          <Card>
            <CardHeader>
              <CardTitle>How to Use Effects & Animations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold mb-2">Motion Import</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code>{`import { motion } from 'motion/react';`}</code>
                  </pre>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-2">Basic Motion Usage</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
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
                  <h4 className="text-lg font-semibold mb-2">Effect Components</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
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
  className="p-4"
  from="from-primary"
  to="to-accent"
>
  <span>Content</span>
</HoverBorderGradient>

// Spotlight Effect
import { Spotlight } from '@/components/ui/spotlight';

<div className="relative">
  <Spotlight className="-top-40 left-0" fill="white" />
  <div className="content">Content</div>
</div>`}</code>
                  </pre>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-2">Text Effects</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code>{`// Text Effect
import { TextEffect } from '@/components/ui/text-effect';

<TextEffect
  text="Your text here"
  className="text-2xl font-bold"
/>

// Text Reveal
import { TextReveal } from '@/components/ui/text-reveal';

<TextReveal
  text="This text reveals on scroll"
  className="text-2xl font-bold"
/>`}</code>
                  </pre>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-2">Background Effects</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
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
                
                <div className="p-4 border rounded-md bg-yellow-50 dark:bg-yellow-950 dark:border-yellow-800">
                  <h4 className="text-lg font-semibold mb-2">Important Note</h4>
                  <p>Always use <code>motion/react</code> for animations, not <code>framer-motion</code>. The project is configured to use <code>motion/react</code> specifically.</p>
                  <p className="mt-2">Use animations thoughtfully and sparingly to enhance the user experience without causing distractions or performance issues.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}
