import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import getOrCreateDB from './models/server/dbSetup';
import getOrCreateStorage from './models/server/storageSetup';

export async function middleware(request: NextRequest) {
  await Promise.all([getOrCreateDB(), getOrCreateStorage()]);
  return NextResponse.next();
}

export const config = {
  /* match all request paths except for the one that start with:
    - api
    - _next/static
    - _next/image
    - favicon.ico

    */
  matcher: [
    // Only run on main routes where we need DB access
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
