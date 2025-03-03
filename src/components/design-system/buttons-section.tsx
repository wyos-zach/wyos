'use client';

import React from 'react';
import { H2, P } from '@/components/ui/typography';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { HoverButton } from '@/components/ui/hover-button';
import { ShinyButton } from '@/components/ui/shiny-button';
import { PrimaryButton } from '@/components/shared/primary-button';
import { Mail, ArrowRight, Check } from 'lucide-react';

export function ButtonsSection() {
  return (
    <section id="buttons" className="space-y-6 py-8 border-t">
      <H2>Buttons</H2>
      <P className="text-muted-foreground">
        Various button components and styles used throughout the application.
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
                <CardTitle>Primary Buttons (Shared Component)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <div className="space-y-2 w-full md:w-auto">
                    <PrimaryButton variant="default">Default</PrimaryButton>
                    <div className="text-xs text-muted-foreground">variant="default"</div>
                  </div>
                  
                  <div className="space-y-2 w-full md:w-auto">
                    <PrimaryButton variant="destructive">Destructive</PrimaryButton>
                    <div className="text-xs text-muted-foreground">variant="destructive"</div>
                  </div>
                  
                  <div className="space-y-2 w-full md:w-auto">
                    <PrimaryButton variant="outline">Outline</PrimaryButton>
                    <div className="text-xs text-muted-foreground">variant="outline"</div>
                  </div>
                  
                  <div className="space-y-2 w-full md:w-auto">
                    <PrimaryButton variant="secondary">Secondary</PrimaryButton>
                    <div className="text-xs text-muted-foreground">variant="secondary"</div>
                  </div>
                  
                  <div className="space-y-2 w-full md:w-auto">
                    <PrimaryButton variant="ghost">Ghost</PrimaryButton>
                    <div className="text-xs text-muted-foreground">variant="ghost"</div>
                  </div>
                  
                  <div className="space-y-2 w-full md:w-auto">
                    <PrimaryButton variant="link">Link</PrimaryButton>
                    <div className="text-xs text-muted-foreground">variant="link"</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Primary Button States & Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <div className="space-y-2 w-full md:w-auto">
                    <PrimaryButton loading>Loading</PrimaryButton>
                    <div className="text-xs text-muted-foreground">loading</div>
                  </div>
                  
                  <div className="space-y-2 w-full md:w-auto">
                    <PrimaryButton loading loadingText="Processing...">Loading with Text</PrimaryButton>
                    <div className="text-xs text-muted-foreground">loading loadingText="Processing..."</div>
                  </div>
                  
                  <div className="space-y-2 w-full md:w-auto">
                    <PrimaryButton disabled>Disabled</PrimaryButton>
                    <div className="text-xs text-muted-foreground">disabled</div>
                  </div>
                  
                  <div className="space-y-2 w-full md:w-auto">
                    <PrimaryButton leftIcon={<Mail className="h-4 w-4" />}>With Left Icon</PrimaryButton>
                    <div className="text-xs text-muted-foreground">leftIcon</div>
                  </div>
                  
                  <div className="space-y-2 w-full md:w-auto">
                    <PrimaryButton rightIcon={<ArrowRight className="h-4 w-4" />}>With Right Icon</PrimaryButton>
                    <div className="text-xs text-muted-foreground">rightIcon</div>
                  </div>
                  
                  <div className="space-y-2 w-full md:w-auto">
                    <PrimaryButton tooltipText="This is a tooltip">With Tooltip</PrimaryButton>
                    <div className="text-xs text-muted-foreground">tooltipText</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Primary Button Sizes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="space-y-2 w-full md:w-auto">
                    <PrimaryButton size="default">Default</PrimaryButton>
                    <div className="text-xs text-muted-foreground">size="default"</div>
                  </div>
                  
                  <div className="space-y-2 w-full md:w-auto">
                    <PrimaryButton size="sm">Small</PrimaryButton>
                    <div className="text-xs text-muted-foreground">size="sm"</div>
                  </div>
                  
                  <div className="space-y-2 w-full md:w-auto">
                    <PrimaryButton size="lg">Large</PrimaryButton>
                    <div className="text-xs text-muted-foreground">size="lg"</div>
                  </div>
                  
                  <div className="space-y-2 w-full md:w-auto">
                    <PrimaryButton size="icon">
                      <Check className="h-4 w-4" />
                    </PrimaryButton>
                    <div className="text-xs text-muted-foreground">size="icon"</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Standard Buttons</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <div className="space-y-2 w-full md:w-auto">
                    <Button variant="default">Default</Button>
                    <div className="text-xs text-muted-foreground">variant="default"</div>
                  </div>
                  
                  <div className="space-y-2 w-full md:w-auto">
                    <Button variant="destructive">Destructive</Button>
                    <div className="text-xs text-muted-foreground">variant="destructive"</div>
                  </div>
                  
                  <div className="space-y-2 w-full md:w-auto">
                    <Button variant="outline">Outline</Button>
                    <div className="text-xs text-muted-foreground">variant="outline"</div>
                  </div>
                  
                  <div className="space-y-2 w-full md:w-auto">
                    <Button variant="secondary">Secondary</Button>
                    <div className="text-xs text-muted-foreground">variant="secondary"</div>
                  </div>
                  
                  <div className="space-y-2 w-full md:w-auto">
                    <Button variant="ghost">Ghost</Button>
                    <div className="text-xs text-muted-foreground">variant="ghost"</div>
                  </div>
                  
                  <div className="space-y-2 w-full md:w-auto">
                    <Button variant="link">Link</Button>
                    <div className="text-xs text-muted-foreground">variant="link"</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Button Sizes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="space-y-2 w-full md:w-auto">
                    <Button size="default">Default</Button>
                    <div className="text-xs text-muted-foreground">size="default"</div>
                  </div>
                  
                  <div className="space-y-2 w-full md:w-auto">
                    <Button size="sm">Small</Button>
                    <div className="text-xs text-muted-foreground">size="sm"</div>
                  </div>
                  
                  <div className="space-y-2 w-full md:w-auto">
                    <Button size="lg">Large</Button>
                    <div className="text-xs text-muted-foreground">size="lg"</div>
                  </div>
                  
                  <div className="space-y-2 w-full md:w-auto">
                    <Button size="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
                    </Button>
                    <div className="text-xs text-muted-foreground">size="icon"</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Special Buttons</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-6">
                  <div className="space-y-2 w-full md:w-auto">
                    <HoverButton>Hover Button</HoverButton>
                    <div className="text-xs text-muted-foreground">HoverButton component</div>
                  </div>
                  
                  <div className="space-y-2 w-full md:w-auto">
                    <ShinyButton>Shiny Button</ShinyButton>
                    <div className="text-xs text-muted-foreground">ShinyButton component</div>
                  </div>
                  
                  <div className="space-y-2 w-full md:w-auto">
                    <button className="button-base button-default">Base Button</button>
                    <div className="text-xs text-muted-foreground">button-base button-default</div>
                  </div>
                  
                  <div className="space-y-2 w-full md:w-auto">
                    <button className="button-base button-secondary">Secondary Base</button>
                    <div className="text-xs text-muted-foreground">button-base button-secondary</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="usage">
          <Card>
            <CardHeader>
              <CardTitle>How to Use Buttons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold mb-2">Primary Button Import</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code>{`import { PrimaryButton } from '@/components/shared/primary-button';`}</code>
                  </pre>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-2">Primary Button Usage</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code>{`// Basic usage
<PrimaryButton>Click me</PrimaryButton>

// With loading state
<PrimaryButton loading>Loading</PrimaryButton>
<PrimaryButton loading loadingText="Processing...">Loading with Text</PrimaryButton>

// With icons
<PrimaryButton leftIcon={<Mail className="h-4 w-4" />}>With Left Icon</PrimaryButton>
<PrimaryButton rightIcon={<ArrowRight className="h-4 w-4" />}>With Right Icon</PrimaryButton>

// With tooltip
<PrimaryButton tooltipText="This is a tooltip">With Tooltip</PrimaryButton>

// Different variants
<PrimaryButton variant="default">Default</PrimaryButton>
<PrimaryButton variant="destructive">Destructive</PrimaryButton>
<PrimaryButton variant="outline">Outline</PrimaryButton>
<PrimaryButton variant="secondary">Secondary</PrimaryButton>
<PrimaryButton variant="ghost">Ghost</PrimaryButton>
<PrimaryButton variant="link">Link</PrimaryButton>

// Different sizes
<PrimaryButton size="default">Default</PrimaryButton>
<PrimaryButton size="sm">Small</PrimaryButton>
<PrimaryButton size="lg">Large</PrimaryButton>
<PrimaryButton size="icon"><Check className="h-4 w-4" /></PrimaryButton>`}</code>
                  </pre>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-2">Standard Button Import</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code>{`import { Button } from '@/components/ui/button';`}</code>
                  </pre>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-2">Standard Button Usage</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code>{`<Button>Default Button</Button>
<Button variant="destructive">Destructive Button</Button>
<Button variant="outline">Outline Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="link">Link Button</Button>`}</code>
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}
