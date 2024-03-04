import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export default function middleware(request: NextRequest) {
  const token = cookies().get('accessToken');

  if (!token && !request.url.includes('/login')) {
    return NextResponse.redirect(new URL('/login', request.url));
  } else if (token && request.url.includes('/login')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!google-auth|api|_next/static|_next/image|favicon.ico).*)'],
};
