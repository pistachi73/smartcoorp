import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Thisasync  function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const sessionToken = req.cookies.get('next-auth.session-token')?.value;

  if (!sessionToken) {
    const requestedPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    url.search = `p=${requestedPage}`;

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = { matcher: ['/home', '/users/:path*', '/blog/:path*'] };
