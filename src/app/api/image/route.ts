import { NextResponse } from 'next/server';
import { Storage } from 'appwrite';
import { client } from '@/models/client/config';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const bucketId = searchParams.get('bucketId');
  const fileId = searchParams.get('fileId');

  if (!bucketId || !fileId) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  try {
    const storage = new Storage(client);
    const file = await storage.getFileView(bucketId, fileId);

    return new NextResponse(file, {
      headers: {
        'Content-Type': 'image/webp',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Image not found' }, { status: 404 });
  }
}
