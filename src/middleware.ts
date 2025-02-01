import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import getOrCreateDB from './models/server/dbSetup';
import getOrCreateStorage from './models/server/storageSetup'; // Minimal storage check
import { Account, Client } from 'node-appwrite';
import { AppwriteException } from 'node-appwrite';

// Define protected paths that require the user to be logged in.
const protectedPaths = ['/(subscription)', '/(core)'];
// Public paths that never require login.
const publicPaths = ['/login', '/register', '/reset-password', '/verify-email'];

// Create a new Appwrite client and account instance.
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_API_KEY!);

const account = new Account(client);

export async function middleware(request: NextRequest) {
  // STEP 2: Run checks to verify DB and Storage exist.
  await Promise.all([getOrCreateDB(), getOrCreateStorage()]);

  // STEP 3: Get the current pathname and search parameters from the URL.
  const { pathname, search } = request.nextUrl;

  // STEP 4: If the pathname starts with one of the public paths, continue without checking login.
  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // STEP 5: Check if the path is protected.
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );
  if (!isProtectedPath) {
    return NextResponse.next();
  }

  // STEP 6: Get user session cookie.
  // The cookie name is built using the Appwrite project ID.
  const sessionName = `a_session_${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
  const sessionId = request.cookies.get(sessionName)?.value;

  // STEP 7: If there is a session, try validating it.
  try {
    if (sessionId) {
      // Ask Appwrite to get the "current" session. If it works, the session is valid.
      await account.getSession('current');
      return NextResponse.next();
    }
  } catch (error) {
    if (error instanceof AppwriteException) {
      console.error('Auth error code:', error.code);
    }
  }

  // STEP 8: If there is no valid session, redirect the user to the login page.
  const loginUrl = new URL('/login', request.url);
  loginUrl.searchParams.set('redirect', pathname + search);
  return NextResponse.redirect(loginUrl);
}

// STEP 9: Define the matcher so that the middleware only runs on the specified paths.
export const config = {
  matcher: [
    // Match all paths except static files and API routes.
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
    // Protect all paths under these:
    '/(subscription)/:path*',
    '/(core)/:path*',
    '/knowledge/:path*',
    '/resources/:path*',
  ],
};
