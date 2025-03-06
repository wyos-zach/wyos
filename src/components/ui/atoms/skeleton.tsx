import { cn } from '@/lib/utils';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-md bg-zinc-800/40',
        'before:absolute before:inset-0 before:bg-gradient-to-r before:from-zinc-800/40 before:via-zinc-700/50 before:to-zinc-800/40',
        'before:animate-shimmer before:bg-[length:200%_100%]',
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
