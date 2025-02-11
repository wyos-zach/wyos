import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

const DISCOURSE_SSO_SECRET = process.env.DISCOURSE_SSO_SECRET;

export function GET(req: NextRequest) {
  if (!DISCOURSE_SSO_SECRET) {
    return NextResponse.json(
      { error: 'SSO secret not configured' },
      { status: 500 }
    );
  }
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
  const computedSig = hmac.digest('hex');

  if (computedSig !== sig) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Decode the payload
  const decodedPayload = Buffer.from(sso, 'base64').toString();
  const params = new URLSearchParams(decodedPayload);
  const nonce = params.get('nonce');
  const returnUrl = params.get('return_sso_url');

  if (!nonce || !returnUrl) {
    return NextResponse.json(
      { error: 'Missing required SSO parameters in payload' },
      { status: 400 }
    );
  }

  // Example user data (replace with real user data from Appwrite)
  const user = {
    id: '123', // Replace with user's unique ID
    email: 'user@example.com', // Replace with user's email
    username: 'exampleuser', // Replace with user's username
  };

  // Build the return payload
  const returnPayload = new URLSearchParams({
    nonce,
    external_id: user.id,
    email: user.email,
    username: user.username,
  });

  // Sign the return payload
  const returnPayloadString = returnPayload.toString();
  const returnSSOPayload = Buffer.from(returnPayloadString).toString('base64');
  const returnHmac = crypto.createHmac('sha256', DISCOURSE_SSO_SECRET);
  returnHmac.update(returnPayloadString);
  const returnSig = returnHmac.digest('hex');

  return NextResponse.redirect(
    `${returnUrl}?sso=${returnSSOPayload}&sig=${returnSig}`
  );
}
