'use client';

import React from 'react';
import { H2, P } from '@/components/ui/typography';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function DialogsSection() {
  return (
    <section id='dialogs' className='space-y-6 py-8 border-t'>
      <H2>Dialogs & Modals</H2>
      <P className='text-muted-foreground'>
        Dialog, modal, and overlay components used throughout the application.
      </P>

      <Tabs defaultValue='preview'>
        <TabsList className='mb-4'>
          <TabsTrigger value='preview'>Preview</TabsTrigger>
          <TabsTrigger value='usage'>Usage</TabsTrigger>
        </TabsList>

        <TabsContent value='preview'>
          <div className='grid gap-6 md:grid-cols-2'>
            <Card>
              <CardHeader>
                <CardTitle>Dialog</CardTitle>
              </CardHeader>
              <CardContent className='flex justify-center'>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant='outline'>Open Dialog</Button>
                  </DialogTrigger>
                  <DialogContent className='sm:max-w-[425px]'>
                    <DialogHeader>
                      <DialogTitle>Edit Profile</DialogTitle>
                      <DialogDescription>
                        Make changes to your profile here. Click save when
                        you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className='grid gap-4 py-4'>
                      <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='name' className='text-right'>
                          Name
                        </Label>
                        <Input
                          id='name'
                          value='John Doe'
                          className='col-span-3'
                        />
                      </div>
                      <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='username' className='text-right'>
                          Username
                        </Label>
                        <Input
                          id='username'
                          value='@johndoe'
                          className='col-span-3'
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type='submit'>Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alert Dialog</CardTitle>
              </CardHeader>
              <CardContent className='flex justify-center'>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant='outline'>Delete Account</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sheet (Slide-in Panel)</CardTitle>
              </CardHeader>
              <CardContent className='flex justify-center'>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant='outline'>Open Sheet</Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Edit Profile</SheetTitle>
                      <SheetDescription>
                        Make changes to your profile here. Click save when
                        you're done.
                      </SheetDescription>
                    </SheetHeader>
                    <div className='grid gap-4 py-4'>
                      <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='sheet-name' className='text-right'>
                          Name
                        </Label>
                        <Input
                          id='sheet-name'
                          value='John Doe'
                          className='col-span-3'
                        />
                      </div>
                      <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='sheet-username' className='text-right'>
                          Username
                        </Label>
                        <Input
                          id='sheet-username'
                          value='@johndoe'
                          className='col-span-3'
                        />
                      </div>
                    </div>
                    <SheetFooter>
                      <Button type='submit'>Save changes</Button>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Drawer (Bottom Sheet)</CardTitle>
              </CardHeader>
              <CardContent className='flex justify-center'>
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant='outline'>Open Drawer</Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <div className='mx-auto w-full max-w-sm'>
                      <DrawerHeader>
                        <DrawerTitle>Edit Profile</DrawerTitle>
                        <DrawerDescription>
                          Make changes to your profile here. Click save when
                          you're done.
                        </DrawerDescription>
                      </DrawerHeader>
                      <div className='p-4 pb-0'>
                        <div className='grid gap-4'>
                          <div className='grid gap-2'>
                            <Label htmlFor='drawer-name'>Name</Label>
                            <Input id='drawer-name' value='John Doe' />
                          </div>
                          <div className='grid gap-2'>
                            <Label htmlFor='drawer-username'>Username</Label>
                            <Input id='drawer-username' value='@johndoe' />
                          </div>
                        </div>
                      </div>
                      <DrawerFooter>
                        <Button>Save changes</Button>
                        <DrawerTrigger asChild>
                          <Button variant='outline'>Cancel</Button>
                        </DrawerTrigger>
                      </DrawerFooter>
                    </div>
                  </DrawerContent>
                </Drawer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value='usage'>
          <Card>
            <CardHeader>
              <CardTitle>How to Use Dialogs & Modals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div>
                  <h4 className='text-lg font-semibold mb-2'>Dialog Import</h4>
                  <pre className='bg-muted p-4 rounded-md overflow-x-auto'>
                    <code>{`import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';`}</code>
                  </pre>
                </div>

                <div>
                  <h4 className='text-lg font-semibold mb-2'>
                    Basic Dialog Usage
                  </h4>
                  <pre className='bg-muted p-4 rounded-md overflow-x-auto'>
                    <code>{`<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Open Dialog</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>
        Dialog description goes here.
      </DialogDescription>
    </DialogHeader>
    <div className="py-4">
      {/* Dialog content */}
    </div>
    <DialogFooter>
      <Button type="submit">Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}</code>
                  </pre>
                </div>

                <div>
                  <h4 className='text-lg font-semibold mb-2'>
                    Alert Dialog Import
                  </h4>
                  <pre className='bg-muted p-4 rounded-md overflow-x-auto'>
                    <code>{`import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';`}</code>
                  </pre>
                </div>

                <div>
                  <h4 className='text-lg font-semibold mb-2'>
                    Alert Dialog Usage
                  </h4>
                  <pre className='bg-muted p-4 rounded-md overflow-x-auto'>
                    <code>{`<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline">Delete Item</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`}</code>
                  </pre>
                </div>

                <div>
                  <h4 className='text-lg font-semibold mb-2'>
                    Sheet Import (Side Panel)
                  </h4>
                  <pre className='bg-muted p-4 rounded-md overflow-x-auto'>
                    <code>{`import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';`}</code>
                  </pre>
                </div>

                <div>
                  <h4 className='text-lg font-semibold mb-2'>
                    Drawer Import (Bottom Panel)
                  </h4>
                  <pre className='bg-muted p-4 rounded-md overflow-x-auto'>
                    <code>{`import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';`}</code>
                  </pre>
                </div>

                <div className='p-4 border rounded-md bg-yellow-50 dark:bg-yellow-950 dark:border-yellow-800'>
                  <h4 className='text-lg font-semibold mb-2'>Important Note</h4>
                  <p>
                    Choose the appropriate dialog type based on the context:
                  </p>
                  <ul className='list-disc list-inside mt-2 space-y-1'>
                    <li>
                      <strong>Dialog:</strong> For general modal interactions
                    </li>
                    <li>
                      <strong>AlertDialog:</strong> For confirmations and
                      destructive actions
                    </li>
                    <li>
                      <strong>Sheet:</strong> For side panels with more complex
                      forms or content
                    </li>
                    <li>
                      <strong>Drawer:</strong> For mobile-friendly bottom sheets
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}
