// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   // Only protect /admin routes — allow the login page itself through
//   if (!pathname.startsWith('/admin') || pathname === '/admin/login') {
//     return NextResponse.next();
//   }

//   const token = req.cookies.get('admin_token')?.value;
//   const adminPassword = process.env.ADMIN_PASSWORD;
//   console.log('adminPassword:', process.env.ADMIN_PASSWORD, 'token:', token);

//   if (!adminPassword || token !== adminPassword) {
//     return NextResponse.redirect(new URL('/admin/login', req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/admin/:path*'],
// };

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname, hostname } = req.nextUrl;

  // ─────────────────────────────────────────────
  // 1. Redirect non-www → www
  // ─────────────────────────────────────────────
  if (hostname === 'edificationoverseas.in') {
    const url = req.nextUrl.clone();
    url.hostname = 'www.edificationoverseas.in';

    return NextResponse.redirect(url, 301);
  }

  // ─────────────────────────────────────────────
  // 2. Admin authentication
  // ─────────────────────────────────────────────
  const isLoginPage = pathname.startsWith('/admin/login');
  const isAdminRoute = pathname.startsWith('/admin');

  if (!isAdminRoute || isLoginPage) {
    return NextResponse.next();
  }

  const token = req.cookies.get('admin_token')?.value;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || token !== adminPassword) {
    return NextResponse.redirect(
      new URL('/admin/login', req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Run middleware on all routes so that
     * non-www → www redirect works everywhere.
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};