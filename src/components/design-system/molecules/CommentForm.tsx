'use client';
import { Button } from '@/components/design-system/atoms/button'; // Your Button component
import { Textarea } from '@/components/design-system/atoms/textarea';
import { cn } from '@/lib/utils';
import * as React from 'react';

export interface CommentFormProps {
  onSubmitAction: (text: string) => void | Promise<void>;
  className?: string;
}

export const CommentForm = ({
  onSubmitAction,
  className,
}: CommentFormProps) => {
  const [text, setText] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onSubmitAction(text);
      setText(''); // Clear on success
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'rounded-lg border border-zinc-700/30 bg-zinc-900/40 p-4 shadow-sm backdrop-blur-md',
        className
      )}
    >
      <Textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='Write your comment...'
        className='min-h-[80px] w-full border-none bg-transparent text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-0'
        disabled={isSubmitting}
      />
      <div className='mt-2 flex justify-end'>
        <Button
          type='submit'
          variant='hoverGlow'
          size='default'
          loading={isSubmitting}
          disabled={!text.trim() || isSubmitting}
          className={cn(
            'bg-gradient-to-b from-primary/70 to-primary/20 text-white',
            'border border-primary/50 backdrop-blur-sm' // Enhance with glassmorphism
          )}
        >
          Post
        </Button>
      </div>
    </form>
  );
};

CommentForm.displayName = 'CommentForm';
