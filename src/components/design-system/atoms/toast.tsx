// src/components/ui/atoms/toast.tsx
'use client';

import * as React from 'react';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { cva, type VariantProps } from 'class-variance-authority';
import { CheckCircle, AlertTriangle, Info, X } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      'fixed bottom-8 left-8 z-[100] flex max-h-screen w-full flex-col gap-6 md:max-w-[450px]',
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
  'group relative flex w-full flex-col gap-4 overflow-hidden rounded-2xl border border-l-4 p-6 shadow-[0_12px_48px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-400 ease-out data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none',
  {
    variants: {
      variant: {
        default:
          'text-zinc-100 border-l-primary/50 bg-gradient-to-br from-zinc-900/80 to-blue-900/40 [--progress-color-from:hsl(var(--primary))] [--progress-color-to:hsl(var(--primary))/0.3]',
        destructive:
          'text-zinc-100 border-l-destructive/50 bg-gradient-to-br from-zinc-900/80 to-red-900/40 [--progress-color-from:hsl(var(--destructive))] [--progress-color-to:hsl(var(--destructive))/0.3]',
        success:
          'text-zinc-100 border-l-[hsl(var(--chart-1))/0.5] bg-gradient-to-br from-zinc-900/80 to-emerald-900/40 [--progress-color-from:hsl(var(--chart-1))] [--progress-color-to:hsl(var(--chart-1))/0.3]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants> & { progress?: number }
>(({ className, variant, progress = 1, ...props }, ref) => {
  const Icon =
    variant === 'success'
      ? CheckCircle
      : variant === 'destructive'
        ? AlertTriangle
        : Info;

  return (
    <ToastPrimitives.Root
      ref={ref}
      asChild
      className={cn(toastVariants({ variant }), className)}
      {...props}
    >
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: 150 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className='flex flex-col gap-3'>
          <div className='flex items-start gap-3'>
            <Icon className='mt-0.5 h-5 w-5 flex-shrink-0' />
            <div className='flex-1'>{props.children}</div>
          </div>
        </div>
        <motion.div
          className='absolute bottom-0 left-0 h-1.5 rounded-b-2xl bg-gradient-to-r from-[var(--progress-color-from)] to-[var(--progress-color-to)]'
          initial={{ width: '100%' }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.1, ease: 'linear' }}
        />
      </motion.div>
    </ToastPrimitives.Root>
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    asChild
    className={cn(
      'mt-3 inline-flex h-10 w-full items-center justify-center rounded-lg bg-gradient-to-b from-zinc-800/80 to-zinc-700/60 px-5 py-2.5 text-sm font-medium text-zinc-100 shadow-inset-custom transition-all duration-200 hover:bg-zinc-700/80 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-transparent',
      className
    )}
    {...props}
  >
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
    >
      {props.children}
    </motion.button>
  </ToastPrimitives.Action>
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    asChild
    className={cn(
      'absolute right-4 top-4 rounded-full p-2 text-zinc-400 transition-all duration-200 hover:bg-zinc-800/80 hover:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary/50',
      className
    )}
    toast-close=''
    {...props}
  >
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <X className='h-4 w-4' />
    </motion.button>
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn('text-base font-medium text-zinc-100', className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn('text-sm leading-relaxed text-zinc-300', className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;
type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
