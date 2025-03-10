'use client';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/design-system/atoms/avatar';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns'; // For readable timestamps
import * as React from 'react';

export interface CommentItemProps {
  username: string;
  text: string;
  timestamp: Date | string; // Accept Date or ISO string
  avatar?: string; // URL for avatar image
  className?: string;
}

export const CommentItem = ({
  username,
  text,
  timestamp,
  avatar,
  className,
}: CommentItemProps) => {
  const formattedTimestamp = React.useMemo(
    () => formatDistanceToNow(new Date(timestamp), { addSuffix: true }), // e.g., "2 hours ago"
    [timestamp]
  );

  return (
    <div
      className={cn(
        'flex gap-4 rounded-lg border border-zinc-700/30 bg-zinc-900/40 p-4 shadow-sm backdrop-blur-md',
        'transition-all duration-200 hover:bg-zinc-800/50',
        className
      )}
    >
      {/* Avatar */}
      <Avatar className='h-8 w-8 flex-shrink-0'>
        {avatar && <AvatarImage src={avatar} alt={`${username}'s avatar`} />}
        <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>

      {/* Content */}
      <div className='flex-1 space-y-1'>
        <div className='flex items-center gap-2'>
          <span className='text-sm font-medium text-zinc-100'>{username}</span>
          <span className='text-xs text-muted-foreground'>
            {formattedTimestamp}
          </span>
        </div>
        <p className='text-sm leading-relaxed text-zinc-200'>{text}</p>
      </div>
    </div>
  );
};

CommentItem.displayName = 'CommentItem';
