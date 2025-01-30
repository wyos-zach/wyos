import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get('tag');

  if (!tag)
    return NextResponse.json(
      { success: false, message: 'Missing tag parameter' },
      { status: 400 }
    );

  try {
    revalidateTag(tag);
    return NextResponse.json({
      success: true,
      revalidated: true,
      now: Date.now(),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Revalidation failed' },
      { status: 500 }
    );
  }
}
