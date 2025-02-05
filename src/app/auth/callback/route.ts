import { NextResponse } from 'next/server';
import { account } from '@/models/client/config';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);

    // Get the userId and secret from the query parameters
    const userId = url.searchParams.get('userId');
    const secret = url.searchParams.get('secret');

    if (!userId || !secret) {
      console.error('Missing userId or secret in OAuth callback');
      return NextResponse.redirect(
        new URL('/login?error=oauth_failed', request.url)
      );
    }

    try {
      // Create OAuth2 session with Appwrite
      await account.createSession(userId, secret);

      // Add a small delay to ensure session is established
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to dashboard after successful OAuth
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } catch (error) {
      console.error('Failed to create session:', error);
      return NextResponse.redirect(
        new URL('/login?error=session_failed', request.url)
      );
    }
  } catch (error) {
    console.error('OAuth callback error:', error);
    return NextResponse.redirect(
      new URL('/login?error=oauth_failed', request.url)
    );
  }
}
