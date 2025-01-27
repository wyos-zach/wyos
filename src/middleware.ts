import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import getOrCreateDB from './models/server/dbSetup';
import getOrCreateStorage from './models/server/storageSetup';
import { Account, Client } from 'node-appwrite';
import { AppwriteException } from 'node-appwrite';

// Define protected paths that require authentication
const protectedPaths = [
  '/subscription',
  '/account',
  '/knowledge',
  '/resources',
];

// Public paths that should never redirect to sign-in
const publicPaths = [
  '/sign-in',
  '/sign-up',
  '/reset-password',
  '/verify-email',
];

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_API_KEY!);

const account = new Account(client);

export async function middleware(request: NextRequest) {
  await Promise.all([getOrCreateDB(), getOrCreateStorage()]);

  const { pathname, search } = request.nextUrl;

  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );
  if (!isProtectedPath) {
    return NextResponse.next();
  }

  // Get the session cookie
  const sessionName = `a_session_${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
  const sessionId = request.cookies.get(sessionName)?.value;

  try {
    if (sessionId) {
      // Use account service to get session
      await account.getSession('current');
      return NextResponse.next();
    }
  } catch (error) {
    if (error instanceof AppwriteException) {
      console.error('Auth error code:', error.code);
    }
  }

  const signInUrl = new URL('/sign-in', request.url);
  signInUrl.searchParams.set('redirect', pathname + search);
  return NextResponse.redirect(signInUrl);
}

export const config = {
  matcher: [
    // Match all paths except static files and API routes
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
    // Include all paths under protected routes
    '/subscription/:path*',
    '/account/:path*',
    '/knowledge/:path*',
    '/resources/:path*',
  ],
};
