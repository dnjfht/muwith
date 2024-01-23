import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import Cookies from 'universal-cookie';

export default function middleware(request: NextRequest) {
  const cookies = new Cookies();

  const token = cookies.get('token');

  if (!token) {
    return NextResponse.redirect(new URL('/auth', request.url));
  } else if (token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}
