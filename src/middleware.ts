import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export default function middleware(request: NextRequest) {
  const token = cookies().get('accessToken');
  console.log('accessToken!!!', token);

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!google-auth|login|api|_next/static|_next/image|favicon.ico).*)'],
};
