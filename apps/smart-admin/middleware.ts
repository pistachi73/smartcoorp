import { getToken } from 'next-auth/jwt';

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Thisasync  function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET;

  const session = await getToken({ req, secret, raw: true });

  console.log('middleware', { session });

  if (!session) {
    const requestedPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    url.search = `p=${requestedPage}`;

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = { matcher: ['/home', '/users/:path*', '/blog/:path*'] };
