import { NextResponse } from 'next/server';
import { validateRequest } from '@/lib/webhooks';

export async function POST(request: Request) {
  const isValid = await validateRequest(request);
  if (!isValid)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });

  const event = await request.json();

  if (event.type === 'database.documents.create') {
    await fetch(`${process.env.NEXTAUTH_URL}/api/revalidate?tag=knowledge`);
  }

  return NextResponse.json({ received: true });
}
