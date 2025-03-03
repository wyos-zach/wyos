'use client';

import React from 'react';
import { H2, P } from '@/components/ui/typography';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { HoverButton } from '@/components/ui/hover-button';
import { ShinyButton } from '@/components/ui/shiny-button';

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
                <CardTitle>Button States</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <div className="space-y-2 w-full md:w-auto">
                    <Button>Normal</Button>
                    <div className="text-xs text-muted-foreground">Normal state</div>
                  </div>
                  
                  <div className="space-y-2 w-full md:w-auto">
                    <Button disabled>Disabled</Button>
                    <div className="text-xs text-muted-foreground">disabled</div>
                  </div>
                  
                  <div className="space-y-2 w-full md:w-auto">
                    <Button className="cursor-not-allowed opacity-50">Disabled (visual)</Button>
                    <div className="text-xs text-muted-foreground">className="cursor-not-allowed opacity-50"</div>
                  </div>
                  
                  <div className="space-y-2 w-full md:w-auto">
                    <Button>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
                      Loading
                    </Button>
                    <div className="text-xs text-muted-foreground">With loading spinner</div>
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
                  
                  <div className="space-y-2 w-full md:w-auto">
                    <button className="button-base button-outline">Outline Base</button>
                    <div className="text-xs text-muted-foreground">button-base button-outline</div>
                  </div>
                  
                  <div className="space-y-2 w-full md:w-auto">
                    <button className="button-base button-ghost">Ghost Base</button>
                    <div className="text-xs text-muted-foreground">button-base button-ghost</div>
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
                  <h4 className="text-lg font-semibold mb-2">Standard Button Import</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code>{`import { Button } from '@/components/ui/button';`}</code>
                  </pre>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-2">Basic Usage</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code>{`<Button>Default Button</Button>
<Button variant="destructive">Destructive Button</Button>
<Button variant="outline">Outline Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="link">Link Button</Button>`}</code>
                  </pre>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-2">Button Sizes</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code>{`<Button size="default">Default Size</Button>
<Button size="sm">Small Button</Button>
<Button size="lg">Large Button</Button>
<Button size="icon"><IconComponent /></Button>`}</code>
                  </pre>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-2">Special Buttons</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code>{`import { HoverButton } from '@/components/ui/hover-button';
import { ShinyButton } from '@/components/ui/shiny-button';

// In your component:
<HoverButton>Hover Button</HoverButton>
<ShinyButton>Shiny Button</ShinyButton>`}</code>
                  </pre>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-2">CSS Class Buttons</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code>{`<button className="button-base button-default">Base Button</button>
<button className="button-base button-secondary">Secondary Base</button>
<button className="button-base button-outline">Outline Base</button>
<button className="button-base button-ghost">Ghost Base</button>`}</code>
                  </pre>
                </div>
                
                <div className="p-4 border rounded-md bg-yellow-50 dark:bg-yellow-950 dark:border-yellow-800">
                  <h4 className="text-lg font-semibold mb-2">Important Note</h4>
                  <p>For consistency, prefer using the Button component from '@/components/ui/button' when possible. The CSS class buttons are available for specific use cases where the component approach might not be suitable.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}
