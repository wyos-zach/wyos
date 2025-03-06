'use client';

import React from 'react';
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
} from '@/components/ui/atoms/toast';

export function ToastSection() {
  const [defaultOpen, setDefaultOpen] = React.useState(false);
  const [destructiveOpen, setDestructiveOpen] = React.useState(false);
  const [successOpen, setSuccessOpen] = React.useState(false);
  const duration = 5000;

  const getProgress = (openTime: number) =>
    Math.max(0, 1 - (Date.now() - openTime) / duration);

  const [defaultTime, setDefaultTime] = React.useState(0);
  const [destructiveTime, setDestructiveTime] = React.useState(0);
  const [successTime, setSuccessTime] = React.useState(0);

  React.useEffect(() => {
    let interval: number;
    if (defaultOpen || destructiveOpen || successOpen) {
      interval = window.setInterval(() => {
        if (defaultOpen) setDefaultTime(Date.now());
        if (destructiveOpen) setDestructiveTime(Date.now());
        if (successOpen) setSuccessTime(Date.now());
      }, 100);
    }
    return () => clearInterval(interval);
  }, [defaultOpen, destructiveOpen, successOpen]);

  return (
    <section className='space-y-6 border-t border-zinc-700/30 px-6 py-8'>
      <h2 className='font-heading text-3xl font-bold text-zinc-100'>Toast</h2>
      <p className='text-zinc-400'>
        Premium notifications with progress indicators.
      </p>

      <ToastProvider swipeDirection='left'>
        {/* Demo 1: Default */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold text-zinc-200'>Default</h3>
          <button
            className='rounded-md bg-zinc-800 px-4 py-2 text-zinc-100 hover:bg-zinc-700/80'
            onClick={() => {
              setDefaultOpen(true);
              setDefaultTime(Date.now());
              setTimeout(() => setDefaultOpen(false), duration);
            }}
          >
            Show Default
          </button>
          <Toast
            open={defaultOpen}
            onOpenChange={setDefaultOpen}
            progress={defaultOpen ? getProgress(defaultTime) : 1}
          >
            <div className='flex items-start gap-3'>
              <ToastTitle>Notification</ToastTitle>
              <ToastDescription>Event has been scheduled.</ToastDescription>
            </div>
            <ToastClose />
          </Toast>
        </div>

        {/* Demo 2: Destructive */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold text-zinc-200'>Destructive</h3>
          <button
            className='rounded-md bg-zinc-800 px-4 py-2 text-zinc-100 hover:bg-zinc-700/80'
            onClick={() => {
              setDestructiveOpen(true);
              setDestructiveTime(Date.now());
              setTimeout(() => setDestructiveOpen(false), duration);
            }}
          >
            Show Destructive
          </button>
          <Toast
            variant='destructive'
            open={destructiveOpen}
            onOpenChange={setDestructiveOpen}
            progress={destructiveOpen ? getProgress(destructiveTime) : 1}
          >
            <div className='flex items-start gap-3'>
              <ToastTitle>Error</ToastTitle>
              <ToastDescription>Something went wrong.</ToastDescription>
            </div>
            <ToastClose />
          </Toast>
        </div>

        {/* Demo 3: Success */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold text-zinc-200'>Success</h3>
          <button
            className='rounded-md bg-zinc-800 px-4 py-2 text-zinc-100 hover:bg-zinc-700/80'
            onClick={() => {
              setSuccessOpen(true);
              setSuccessTime(Date.now());
              setTimeout(() => setSuccessOpen(false), duration);
            }}
          >
            Show Success
          </button>
          <Toast
            variant='success'
            open={successOpen}
            onOpenChange={setSuccessOpen}
            progress={successOpen ? getProgress(successTime) : 1}
          >
            <div className='flex items-start gap-3'>
              <ToastTitle>Success</ToastTitle>
              <ToastDescription>Your request was completed!</ToastDescription>
              <ToastAction altText='Undo'>Undo</ToastAction>
            </div>
            <ToastClose />
          </Toast>
        </div>

        <ToastViewport />
      </ToastProvider>

      <div className='text-sm text-zinc-500'>
        <p>Props:</p>
        <ul className='list-inside list-disc'>
          <li>variant: 'default' | 'destructive' | 'success'</li>
          <li>open: boolean</li>
          <li>progress: number (0-1)</li>
        </ul>
      </div>
    </section>
  );
}
