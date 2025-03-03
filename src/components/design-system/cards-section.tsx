'use client';

import React from 'react';
import { H2, P } from '@/components/ui/typography';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function CardsSection() {
  return (
    <section id="cards" className="space-y-6 py-8 border-t">
      <H2>Cards</H2>
      <P className="text-muted-foreground">
        Card components and variations used throughout the application.
      </P>

      <Tabs defaultValue="preview">
        <TabsList className="mb-4">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
        </TabsList>
        
        <TabsContent value="preview">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Card</CardTitle>
                  <CardDescription>A simple card with header, content, and footer.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This is the main content area of the card. It can contain text, images, or any other content.</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="ghost">Cancel</Button>
                  <Button>Submit</Button>
                </CardFooter>
              </Card>
              
              <Card className="overflow-hidden">
                <div className="h-40 bg-muted flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-muted-foreground"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg>
                </div>
                <CardHeader>
                  <CardTitle>Card with Image</CardTitle>
                  <CardDescription>A card with an image at the top.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Cards with images are commonly used for blog posts, products, or any content that benefits from visual representation.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Details</Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card className="border-primary">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>Featured Card</CardTitle>
                    <Badge>Featured</Badge>
                  </div>
                  <CardDescription>A card with a featured badge and border.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Featured cards can be used to highlight important content or premium features.</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Get Started</Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-muted">
                <CardHeader>
                  <CardTitle>Muted Card</CardTitle>
                  <CardDescription>A card with a muted background.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Muted cards can be used for secondary content or to create visual hierarchy.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Learn More</Button>
                </CardFooter>
              </Card>
              
              <Card className="feature-card p-6">
                <div className="mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10"><path d="M12 2v8"></path><path d="m4.93 10.93 1.41 1.41"></path><path d="M2 18h2"></path><path d="M20 18h2"></path><path d="m19.07 10.93-1.41 1.41"></path><path d="M22 22H2"></path><path d="m8 22 4-10 4 10"></path></svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Feature Card</h3>
                <p className="text-muted-foreground mb-4">This is a feature card with a custom background and icon.</p>
                <Button variant="outline" className="w-full">Explore</Button>
              </Card>
            </div>
            
            <Card className="card-3d md:col-span-2">
              <CardHeader>
                <CardTitle>3D Hover Effect Card</CardTitle>
                <CardDescription>A card with a 3D hover effect.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This card has a subtle 3D effect when hovered. It's great for interactive elements that you want to stand out.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Hover Me</Button>
              </CardFooter>
            </Card>
            
            <div className="md:col-span-2">
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle>Glass Effect Card</CardTitle>
                  <CardDescription>A card with a glass-like effect.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>The glass effect creates a modern, translucent look that works well on gradient or image backgrounds.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Explore</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="usage">
          <Card>
            <CardHeader>
              <CardTitle>How to Use Cards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold mb-2">Basic Import</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code>{`import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';`}</code>
                  </pre>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-2">Basic Card Structure</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code>{`<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Main content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>`}</code>
                  </pre>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-2">Card Variations</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code>{`// Featured Card
<Card className="border-primary">
  <CardHeader>
    <div className="flex items-center justify-between">
      <CardTitle>Featured Card</CardTitle>
      <Badge>Featured</Badge>
    </div>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>...</CardContent>
</Card>

// Muted Card
<Card className="bg-muted">
  <CardHeader>...</CardHeader>
  <CardContent>...</CardContent>
</Card>

// Feature Card with Custom Style
<Card className="feature-card p-6">
  <div className="mb-4">
    <IconComponent />
  </div>
  <h3 className="text-xl font-semibold mb-2">Feature Title</h3>
  <p className="text-muted-foreground mb-4">Description</p>
  <Button>Action</Button>
</Card>

// 3D Effect Card
<Card className="card-3d">
  <CardHeader>...</CardHeader>
  <CardContent>...</CardContent>
</Card>

// Glass Effect Card
<Card className="glass-effect">
  <CardHeader>...</CardHeader>
  <CardContent>...</CardContent>
</Card>`}</code>
                  </pre>
                </div>
                
                <div className="p-4 border rounded-md bg-yellow-50 dark:bg-yellow-950 dark:border-yellow-800">
                  <h4 className="text-lg font-semibold mb-2">Important Note</h4>
                  <p>Cards are one of the most versatile components in the design system. They can be customized with different backgrounds, borders, and effects to create visual hierarchy and draw attention to important content. Always use the appropriate card variation based on the content's importance and the desired user interaction.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}
