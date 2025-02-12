import { Client, Account } from 'appwrite';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

// Make sure the SSO secret is set
const DISCOURSE_SSO_SECRET = process.env.DISCOURSE_SSO_SECRET;
if (!DISCOURSE_SSO_SECRET) {
  throw new Error('DISCOURSE_SSO_SECRET is not configured.');
}

// Helper for URL-safe Base64 encoding
function base64URLEncode(str: string): string {
  return Buffer.from(str)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export async function GET(req: NextRequest) {
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

  // Verify the SSO request from Discourse
  const hmac = crypto.createHmac('sha256', DISCOURSE_SSO_SECRET);
  hmac.update(sso);
  const computedSig = hmac.digest('hex');

  // Use timingSafeEqual to prevent timing attacks.
  if (!crypto.timingSafeEqual(Buffer.from(computedSig), Buffer.from(sig))) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    // Look for the Appwrite session cookie (named "a_session_")
    const sessionCookie = req.cookies.get('a_session_');
    if (!sessionCookie?.value) {
      // No session present: redirect to your main login page with a redirect back.
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('redirect', '/community');
      return NextResponse.redirect(loginUrl.toString());
    }

    // Initialize Appwrite client using your environment variables.
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || '')
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');
    // Use the session cookie value for authentication.
    client.setSession(sessionCookie.value);

    const account = new Account(client);
    const user = await account.get();

    // Decode the SSO payload sent by Discourse
    const decodedPayload = Buffer.from(sso, 'base64').toString();
    const params = new URLSearchParams(decodedPayload);
    const nonce = params.get('nonce');
    const returnUrl = params.get('return_sso_url');

    if (!nonce || !returnUrl) {
      return NextResponse.json(
        { error: 'Invalid SSO payload' },
        { status: 400 }
      );
    }

    // Build the payload for Discourse with user data.
    const payload = new URLSearchParams({
      nonce,
      external_id: user.$id,
      email: user.email,
      username: user.name || user.email.split('@')[0],
      name: user.name || '',
      avatar_url: user.prefs?.avatarUrl || '', // adjust based on your Appwrite user model
      admin: user.prefs?.isAdmin === true ? 'true' : 'false',
    }).toString();

    // Base64 encode the payload (URL-safe)
    const base64Payload = base64URLEncode(payload);

    // Sign the payload using HMAC-SHA256
    const returnHmac = crypto.createHmac('sha256', DISCOURSE_SSO_SECRET);
    returnHmac.update(base64Payload);
    const returnSig = returnHmac.digest('hex');

    // Build the final URL to redirect back to Discourse.
    const finalUrl = new URL(returnUrl);
    finalUrl.searchParams.set('sso', base64Payload);
    finalUrl.searchParams.set('sig', returnSig);

    return NextResponse.redirect(finalUrl.toString());
  } catch (error) {
    console.error('Error in Discourse SSO:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 401 }
    );
  }
}
