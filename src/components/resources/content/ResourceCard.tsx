'use client';

import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { FileIcon } from 'lucide-react';

interface ResourceCardProps {
  title: string;
  summary: string;
  categoryId: string;
  metadata: {
    featured: boolean;
    publishedAt: Date;
    imageUrl?: string;
    downloadUrl?: string;
    fileType?: string;
  };
  onClick?: () => void;
}

export function ResourceCard({
  title,
  summary,
  metadata,
  onClick,
}: ResourceCardProps) {
  return (
    <Card
      onClick={onClick}
      className='group relative flex h-full cursor-pointer flex-col transition-shadow hover:shadow-lg'
      role='article'
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
    >
      {metadata.imageUrl ? (
        <div className='relative aspect-video overflow-hidden'>
          <Image
            src={metadata.imageUrl}
            alt=''
            fill
            className='object-cover transition-transform group-hover:scale-105'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </div>
      ) : (
        <div className='flex aspect-video items-center justify-center bg-muted'>
          <FileIcon className='h-12 w-12 text-muted-foreground' />
        </div>
      )}
      <CardHeader className='space-y-2'>
        {metadata.featured && (
          <Badge variant='secondary' className='w-fit'>
            Featured
          </Badge>
        )}
        <h3 className='line-clamp-2 text-xl font-semibold'>{title}</h3>
      </CardHeader>
      <CardContent className='flex-1 space-y-2'>
        <p className='line-clamp-3 text-sm text-muted-foreground'>{summary}</p>
        <time
          dateTime={metadata.publishedAt.toISOString()}
          className='text-xs text-muted-foreground'
        >
          {formatDate(metadata.publishedAt)}
        </time>
      </CardContent>
    </Card>
  );
}
