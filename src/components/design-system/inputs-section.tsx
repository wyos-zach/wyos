'use client';

import React from 'react';
import { H2, P } from '@/components/ui/typography';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/atoms/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/atoms/input';
import { Label } from '@/components/ui/atoms/label';
import { Textarea } from '@/components/ui/atoms/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/atoms/select';
import { Switch } from '@/components/ui/switch';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  bio: z.string().max(160).optional(),
  notifications: z.boolean().default(false),
  theme: z.enum(['light', 'dark', 'system'], {
    required_error: 'Please select a theme.',
  }),
});

export function InputsSection() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      bio: '',
      notifications: false,
      theme: 'system',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // This is just for demonstration
    console.log(values);
  }

  return (
    <section id='inputs' className='space-y-6 border-t py-8'>
      <H2>Inputs & Forms</H2>
      <P className='text-muted-foreground'>
        Form controls and input components used throughout the application.
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
                <CardTitle>Basic Inputs</CardTitle>
              </CardHeader>
              <CardContent className='grid gap-6'>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                  <Label htmlFor='email'>Email</Label>
                  <Input type='email' id='email' placeholder='Email' />
                </div>

                <div className='grid w-full max-w-sm items-center gap-1.5'>
                  <Label htmlFor='password'>Password</Label>
                  <Input type='password' id='password' placeholder='Password' />
                </div>

                <div className='grid w-full max-w-sm items-center gap-1.5'>
                  <Label htmlFor='disabled'>Disabled Input</Label>
                  <Input disabled id='disabled' placeholder='Disabled' />
                </div>

                <div className='grid w-full max-w-sm items-center gap-1.5'>
                  <Label htmlFor='with-icon'>With Icon</Label>
                  <div className='relative'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground'
                    >
                      <circle cx='11' cy='11' r='8' />
                      <path d='m21 21-4.3-4.3' />
                    </svg>
                    <Input
                      id='with-icon'
                      className='pl-8'
                      placeholder='Search...'
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Textarea</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid w-full gap-1.5'>
                  <Label htmlFor='message'>Message</Label>
                  <Textarea
                    id='message'
                    placeholder='Type your message here.'
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Select</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                  <Label htmlFor='theme'>Theme</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a theme' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='light'>Light</SelectItem>
                      <SelectItem value='dark'>Dark</SelectItem>
                      <SelectItem value='system'>System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Checkbox & Radio</CardTitle>
              </CardHeader>
              <CardContent className='grid gap-6'>
                <div className='flex items-center space-x-2'>
                  <Checkbox id='terms' />
                  <Label htmlFor='terms'>Accept terms and conditions</Label>
                </div>

                <div className='space-y-3'>
                  <Label>Notification preferences</Label>
                  <RadioGroup defaultValue='all'>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='all' id='all' />
                      <Label htmlFor='all'>All notifications</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='important' id='important' />
                      <Label htmlFor='important'>Important only</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='none' id='none' />
                      <Label htmlFor='none'>No notifications</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Switch</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='flex items-center space-x-2'>
                  <Switch id='airplane-mode' />
                  <Label htmlFor='airplane-mode'>Airplane Mode</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Complete Form Example</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-6'
                  >
                    <FormField
                      control={form.control}
                      name='username'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder='johndoe' {...field} />
                          </FormControl>
                          <FormDescription>
                            This is your public display name.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='email'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='john.doe@example.com'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='bio'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder='Tell us about yourself'
                              className='resize-none'
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            You can{' '}
                            <span className='font-medium'>@mention</span> other
                            users and organizations.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='notifications'
                      render={({ field }) => (
                        <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                          <div className='space-y-0.5'>
                            <FormLabel className='text-base'>
                              Notifications
                            </FormLabel>
                            <FormDescription>
                              Receive notifications about account activity.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='theme'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Theme</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Select a theme' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value='light'>Light</SelectItem>
                              <SelectItem value='dark'>Dark</SelectItem>
                              <SelectItem value='system'>System</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Select your preferred theme.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <button
                      type='submit'
                      className='button-base button-default'
                    >
                      Submit
                    </button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value='usage'>
          <Card>
            <CardHeader>
              <CardTitle>How to Use Form Components</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div>
                  <h4 className='mb-2 text-lg font-semibold'>Basic Imports</h4>
                  <pre className='overflow-x-auto rounded-md bg-muted p-4'>
                    <code>{`import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';`}</code>
                  </pre>
                </div>

                <div>
                  <h4 className='mb-2 text-lg font-semibold'>
                    Basic Input with Label
                  </h4>
                  <pre className='overflow-x-auto rounded-md bg-muted p-4'>
                    <code>{`<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input type="email" id="email" placeholder="Email" />
</div>`}</code>
                  </pre>
                </div>

                <div>
                  <h4 className='mb-2 text-lg font-semibold'>
                    React Hook Form Integration
                  </h4>
                  <pre className='overflow-x-auto rounded-md bg-muted p-4'>
                    <code>{`import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

// Define your schema
const formSchema = z.object({
  username: z.string().min(2),
  email: z.string().email(),
});

// In your component:
const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    username: "",
    email: "",
  },
});

function onSubmit(values: z.infer<typeof formSchema>) {
  console.log(values);
}

// In your JSX:
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
    <FormField
      control={form.control}
      name="username"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormDescription>Your display name</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
    
    {/* More fields... */}
    
    <button type="submit">Submit</button>
  </form>
</Form>`}</code>
                  </pre>
                </div>

                <div className='rounded-md border bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-950'>
                  <h4 className='mb-2 text-lg font-semibold'>Important Note</h4>
                  <p>
                    Always use the Form components with React Hook Form and Zod
                    for validation to ensure consistent form handling throughout
                    the application. This provides type safety, validation, and
                    a consistent user experience.
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
