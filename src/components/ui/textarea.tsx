import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
  animatedLabel?: boolean;
  autoGrow?: boolean;
  label?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, hasError, animatedLabel, autoGrow, label, ...props }, ref) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const [isFocused, setIsFocused] = React.useState(false);

    React.useEffect(() => {
      if (autoGrow && textareaRef.current) {
        const adjustHeight = () => {
          const textarea = textareaRef.current;
          if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
          }
        };
        textareaRef.current.addEventListener('input', adjustHeight);
        return () =>
          textareaRef.current?.removeEventListener('input', adjustHeight);
      }
    }, [autoGrow]);

    const textareaClassName = cn(
      'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      hasError && 'border-destructive focus-visible:ring-destructive',
      autoGrow && 'resize-none',
      animatedLabel && 'pt-6',
      className
    );

    return (
      <div className={cn('relative', animatedLabel && 'group')}>
        {animatedLabel && label && (
          <label
            className={cn(
              'absolute left-3 top-2 text-sm transition-all duration-200',
              isFocused || (textareaRef.current && textareaRef.current.value)
                ? 'top-1 text-xs text-primary'
                : 'text-muted-foreground'
            )}
          >
            {label}
          </label>
        )}
        <textarea
          className={textareaClassName}
          ref={(node) => {
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
            textareaRef.current = node;
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
