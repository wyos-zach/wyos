import { Client, Account } from 'appwrite';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

const DISCOURSE_SSO_SECRET = process.env.DISCOURSE_SSO_SECRET;

// Initialize Appwrite client
const client = new Client();
client
  .setEndpoint(process.env.APPWRITE_ENDPOINT || '') // Your Appwrite endpoint
  .setProject(process.env.APPWRITE_PROJECT_ID || ''); // Your project ID

export async function GET(req: NextRequest) {
  const headers = new Headers({
    'Access-Control-Allow-Origin': 'https://community.writingyourownstory.com',
    'Access-Control-Allow-Methods': 'GET, POST',
    'Access-Control-Allow-Headers': 'Content-Type, x-appwrite-user-jwt',
  });

  if (!DISCOURSE_SSO_SECRET) {
    return NextResponse.json(
      { error: 'SSO secret not configured' },
      { status: 500, headers }
    );
  }

  const { searchParams } = new URL(req.url);
  const sso = searchParams.get('sso');
  const sig = searchParams.get('sig');

  if (!sso || !sig) {
    return NextResponse.json(
      { error: 'Missing SSO parameters' },
      { status: 400, headers }
    );
  }

  // Verify the signature
  const hmac = crypto.createHmac('sha256', DISCOURSE_SSO_SECRET);
  hmac.update(sso);
  const computedSig = hmac.digest('hex');

  if (computedSig !== sig) {
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400, headers }
    );
  }

  // Decode the payload
  const decodedPayload = Buffer.from(sso, 'base64').toString();
  const params = new URLSearchParams(decodedPayload);
  const nonce = params.get('nonce');
  const returnUrl = params.get('return_sso_url');

  if (!nonce || !returnUrl) {
    return NextResponse.json(
      { error: 'Missing required SSO parameters in payload' },
      { status: 400, headers }
    );
  }

  // Fetch authenticated user data from Appwrite
  const jwt = req.headers.get('x-appwrite-user-jwt');
  if (!jwt) {
    return NextResponse.json(
      { error: 'Missing Appwrite JWT token' },
      { status: 401, headers }
    );
  }

  try {
    const account = new Account(client);
    client.setJWT(jwt);

    // Get the authenticated user's data
    const user = await account.get();

    // Build the return payload using real user data
    const returnPayload = new URLSearchParams({
      nonce,
      external_id: user.$id,
      email: user.email,
      username: user.name || user.email.split('@')[0], // Use name or fallback to email prefix
    });

    // Sign the return payload
    const returnPayloadString = returnPayload.toString();
    const returnSSOPayload =
      Buffer.from(returnPayloadString).toString('base64');

    const returnHmac = crypto.createHmac('sha256', DISCOURSE_SSO_SECRET);
    returnHmac.update(returnPayloadString);
    const returnSig = returnHmac.digest('hex');

    // Redirect back to Discourse with signed payload
    return NextResponse.redirect(
      `${returnUrl}?sso=${returnSSOPayload}&sig=${returnSig}`,
      { headers }
    );
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500, headers }
    );
  }
}
