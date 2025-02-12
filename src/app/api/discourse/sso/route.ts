import { Client, Account } from 'appwrite';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

const DISCOURSE_SSO_SECRET = process.env.DISCOURSE_SSO_SECRET;

export async function GET(req: NextRequest) {
  // Check if the SSO secret is configured
  if (!DISCOURSE_SSO_SECRET) {
    return NextResponse.json(
      { error: 'SSO secret not configured' },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(req.url);
  const sso = searchParams.get('sso');
  const sig = searchParams.get('sig');
  const jwt = searchParams.get('jwt'); // Get JWT from query parameter

  if (!sso || !sig || !jwt) {
    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 }
    );
  }

  // Verify SSO signature
  const hmac = crypto.createHmac('sha256', DISCOURSE_SSO_SECRET);
  hmac.update(sso);
  const computedSig = hmac.digest('hex');
  if (computedSig !== sig) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Decode SSO payload
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

  try {
    // Set JWT token and fetch user data from Appwrite
    const client = new Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT || '')
      .setProject(process.env.APPWRITE_PROJECT_ID || '');
    client.setJWT(jwt);
    const account = new Account(client);
    const user = await account.get();

    // Build return payload using real user data
    const returnPayload = new URLSearchParams({
      nonce,
      external_id: user.$id,
      email: user.email,
      username: user.name || user.email.split('@')[0],
    });

    const returnPayloadString = returnPayload.toString();
    const returnSSOPayload =
      Buffer.from(returnPayloadString).toString('base64');
    const returnHmac = crypto.createHmac('sha256', DISCOURSE_SSO_SECRET);
    returnHmac.update(returnPayloadString);
    const returnSig = returnHmac.digest('hex');

    // Redirect back to Discourse with the signed payload
    return NextResponse.redirect(
      `${returnUrl}?sso=${returnSSOPayload}&sig=${returnSig}`
    );
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 }
    );
  }
}
