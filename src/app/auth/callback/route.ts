import { NextResponse } from 'next/server';

export function GET(request: Request) {
  try {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
