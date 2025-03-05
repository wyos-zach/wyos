import * as React from 'react';
import type { LucideProps } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IconProps {
  name: React.ComponentType<LucideProps>;
  size?: 'sm' | 'md' | 'lg' | number;
  color?: string;
  className?: string;
  strokeWidth?: LucideProps['strokeWidth'];
  absoluteStrokeWidth?: LucideProps['absoluteStrokeWidth'];
  stroke?: LucideProps['stroke'];
  fill?: LucideProps['fill'];
}

const sizeMap = {
  sm: 16,
  md: 24,
  lg: 32,
};

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  (
    {
      name: IconComponent,
      size = 'md',
      color = 'currentColor',
      className,
      ...props
    },
    ref
  ) => {
    const iconSize = typeof size === 'number' ? size : sizeMap[size];

    return (
      <IconComponent
        ref={ref}
        className={cn('inline-block', className)}
        width={iconSize}
        height={iconSize}
        color={color}
        {...props}
      />
    );
  }
);

Icon.displayName = 'Icon';
