import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

const DISCOURSE_SSO_SECRET =
  process.env.DISCOURSE_SSO_SECRET || 'your-secret-key';

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sso = searchParams.get('sso');
  const sig = searchParams.get('sig');

  if (!sso || !sig) {
    return NextResponse.json(
      { error: 'Missing SSO parameters' },
      { status: 400 }
    );
  }

  // Verify the signature
  const hmac = crypto.createHmac('sha256', DISCOURSE_SSO_SECRET);
  hmac.update(sso);
  if (hmac.digest('hex') !== sig) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Decode the payload
  const decodedPayload = Buffer.from(sso, 'base64').toString();
  const params = new URLSearchParams(decodedPayload);

  // Example user data (replace with real user data from Appwrite)
  const user = {
    id: '123', // Replace with user's unique ID
    email: 'user@example.com', // Replace with user's email
    username: 'exampleuser', // Replace with user's username
  };

  // Build the return payload
  const returnPayload = new URLSearchParams({
    nonce: params.get('nonce') || '',
    external_id: user.id,
    email: user.email,
    username: user.username,
  });

  // Sign the return payload
  const returnSig = crypto
    .createHmac('sha256', DISCOURSE_SSO_SECRET)
    .update(returnPayload.toString())
    .digest('hex');

  return NextResponse.redirect(
    `${params.get('return_sso_url')}?sso=${Buffer.from(
      returnPayload.toString()
    ).toString('base64')}&sig=${returnSig}`
  );
}
