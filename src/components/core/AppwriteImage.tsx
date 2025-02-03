'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Storage } from 'appwrite';
import { client, storage } from '@/models/client/config';

interface AppwriteImageProps {
  bucketId: string;
  fileId: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export const AppwriteImage = ({
  bucketId,
  fileId,
  alt,
  width,
  height,
  className,
}: AppwriteImageProps) => {
  const [src, setSrc] = useState<string>('');

  useEffect(() => {
    const loadImage = async () => {
      try {
        const url = storage.getFileView(bucketId, fileId);
        // Convert URL object to string
        setSrc(url.toString());
      } catch (error) {
        console.error('Error loading image:', error);
        setSrc('/fallback-image.jpg');
      }
    };

    loadImage();
  }, [bucketId, fileId]);

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      quality={80}
      placeholder='blur'
      blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII='
      onError={() => setSrc('/fallback-image.jpg')}
    />
  );
};

export default AppwriteImage;
