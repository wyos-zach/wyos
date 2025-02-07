import { NextResponse } from 'next/server';
import { Storage } from 'appwrite';
import { client } from '@/models/client/config';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const bucketId = searchParams.get('bucketId');
    const fileId = searchParams.get('fileId');

    if (!bucketId || !fileId) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const storage = new Storage(client);
    const file = await storage.getFileView(bucketId, fileId);

    return new Response(file, {
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (err) {
    console.error('Failed to fetch image:', err);
    return NextResponse.json({ error: 'Image not found' }, { status: 404 });
  }
}
