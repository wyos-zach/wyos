/**
 * @jest-environment node
 */

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { AppwriteException } from 'node-appwrite';

// Mock environment variables before importing any modules
process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT = 'https://cloud.appwrite.io/v1';
process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID = 'test-project-id';
process.env.APPWRITE_API_KEY = 'test-api-key';

// Mock NextResponse static methods
jest.mock('next/server', () => {
  const originalModule = jest.requireActual('next/server');
  return {
    ...originalModule,
    NextResponse: {
      next: jest.fn().mockReturnValue({ status: 200 }),
      redirect: jest.fn().mockImplementation((url) => ({
        status: 302,
        url,
      })),
    },
  };
});

// Define mock account type
interface MockAccount {
  getSession: jest.Mock;
}

// Mock the node-appwrite Account module
jest.mock('node-appwrite', () => {
  return {
    Client: jest.fn().mockImplementation(() => {
      return {
        setEndpoint: jest.fn().mockReturnThis(),
        setProject: jest.fn().mockReturnThis(),
        setKey: jest.fn().mockReturnThis(),
      };
    }),
    Account: jest.fn().mockImplementation(() => {
      return {
        getSession: jest.fn(),
      };
    }),
    AppwriteException: jest.fn().mockImplementation((message, code, type) => {
      return { message, code, type };
    }),
  };
});

// Import the mocked modules
import { Account } from 'node-appwrite';

describe('Middleware', () => {
  let mockRequest: NextRequest;
  let mockAccount: MockAccount;
  let middleware: (
    request: NextRequest
  ) => Promise<
    | ReturnType<typeof NextResponse.next>
    | ReturnType<typeof NextResponse.redirect>
  >;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Get the mocked account instance
    mockAccount = (Account as jest.Mock)() as MockAccount;

    // Create a fresh middleware implementation for each test
    middleware = async (request: NextRequest) => {
      // Check if the path is protected
      const protectedPaths = ['/(subscription)', '/(core)'];
      const publicPaths = [
        '/login',
        '/register',
        '/reset-password',
        '/verify-email',
      ];

      const { pathname } = request.nextUrl;

      // Check if the path is public (no auth required)
      if (publicPaths.some((path) => pathname.startsWith(path))) {
        return NextResponse.next();
      }

      // Check if the path is protected (auth required)
      const isProtectedPath = protectedPaths.some((path) =>
        pathname.startsWith(path)
      );

      if (!isProtectedPath) {
        return NextResponse.next();
      }

      // Get the session cookie
      const sessionCookie = request.cookies.get('appwrite_session');

      if (!sessionCookie) {
        // No session cookie, redirect to login
        const redirectUrl = new URL('/login', request.url);
        redirectUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(redirectUrl);
      }

      try {
        // Try to get the session
        await mockAccount.getSession('current');
        return NextResponse.next();
      } catch {
        // Session is invalid, redirect to login
        const redirectUrl = new URL('/login', request.url);
        redirectUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(redirectUrl);
      }
    };
  });

  it('allows access to public paths without session', async () => {
    // Create a mock request for a public path
    mockRequest = {
      nextUrl: {
        pathname: '/login',
        search: '',
      },
      cookies: {
        get: jest.fn().mockReturnValue(undefined),
      },
      url: 'http://localhost:3000/login',
    } as unknown as NextRequest;

    await middleware(mockRequest);

    // Should call next() without redirecting
    expect(NextResponse.next).toHaveBeenCalled();
    expect(NextResponse.redirect).not.toHaveBeenCalled();
    expect(mockAccount.getSession).not.toHaveBeenCalled();
  });

  it('allows access to non-protected paths without session', async () => {
    // Create a mock request for a non-protected path
    mockRequest = {
      nextUrl: {
        pathname: '/',
        search: '',
      },
      cookies: {
        get: jest.fn().mockReturnValue(undefined),
      },
      url: 'http://localhost:3000/',
    } as unknown as NextRequest;

    await middleware(mockRequest);

    // Should call next() without redirecting
    expect(NextResponse.next).toHaveBeenCalled();
    expect(NextResponse.redirect).not.toHaveBeenCalled();
    expect(mockAccount.getSession).not.toHaveBeenCalled();
  });

  it('redirects to login for protected paths without session', async () => {
    // Create a mock request for a protected path
    mockRequest = {
      nextUrl: {
        pathname: '/(core)/dashboard',
        search: '',
      },
      cookies: {
        get: jest.fn().mockReturnValue(undefined),
      },
      url: 'http://localhost:3000/(core)/dashboard',
    } as unknown as NextRequest;

    await middleware(mockRequest);

    // Should redirect to login
    expect(NextResponse.redirect).toHaveBeenCalled();
    expect(NextResponse.next).not.toHaveBeenCalled();

    // Check that the redirect URL includes the original path
    const redirectCall = (NextResponse.redirect as jest.Mock).mock.calls[0][0];
    expect(redirectCall.toString()).toContain('/login');
    expect(redirectCall.searchParams.get('redirect')).toBe('/(core)/dashboard');
  });

  it('allows access to protected paths with valid session', async () => {
    // Create a mock request for a protected path with a session
    mockRequest = {
      nextUrl: {
        pathname: '/(core)/dashboard',
        search: '',
      },
      cookies: {
        get: jest.fn().mockReturnValue({ value: 'valid-session-id' }),
      },
      url: 'http://localhost:3000/(core)/dashboard',
    } as unknown as NextRequest;

    // Mock successful session validation
    mockAccount.getSession.mockResolvedValueOnce({ $id: 'session-id' });

    await middleware(mockRequest);

    // Should call next() without redirecting
    expect(NextResponse.next).toHaveBeenCalled();
    expect(NextResponse.redirect).not.toHaveBeenCalled();
    expect(mockAccount.getSession).toHaveBeenCalledWith('current');
  });

  it('redirects to login when session is invalid', async () => {
    // Create a mock request for a protected path with an invalid session
    mockRequest = {
      nextUrl: {
        pathname: '/(core)/dashboard',
        search: '',
      },
      cookies: {
        get: jest.fn().mockReturnValue({ value: 'invalid-session-id' }),
      },
      url: 'http://localhost:3000/(core)/dashboard',
    } as unknown as NextRequest;

    // Mock failed session validation
    mockAccount.getSession.mockRejectedValueOnce(
      new AppwriteException('Invalid session', 401, 'unauthorized')
    );

    await middleware(mockRequest);

    // Should redirect to login
    expect(NextResponse.redirect).toHaveBeenCalled();
    expect(NextResponse.next).not.toHaveBeenCalled();

    // Check that the redirect URL includes the original path
    const redirectCall = (NextResponse.redirect as jest.Mock).mock.calls[0][0];
    expect(redirectCall.toString()).toContain('/login');
    expect(redirectCall.searchParams.get('redirect')).toBe('/(core)/dashboard');
  });

  it('redirects to login when session is expired', async () => {
    // Create a mock request for a protected path with an expired session
    mockRequest = {
      nextUrl: {
        pathname: '/(core)/dashboard',
        search: '',
      },
      cookies: {
        get: jest.fn().mockReturnValue({ value: 'expired-session-id' }),
      },
      url: 'http://localhost:3000/(core)/dashboard',
    } as unknown as NextRequest;

    // Mock expired session
    mockAccount.getSession.mockRejectedValueOnce(
      new AppwriteException('Session expired', 401, 'user_session_expired')
    );

    await middleware(mockRequest);

    // Should redirect to login
    expect(NextResponse.redirect).toHaveBeenCalled();
    expect(NextResponse.next).not.toHaveBeenCalled();
  });
});
