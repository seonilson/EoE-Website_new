import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Get the original hostname from proxy headers
  const forwardedHost = req.headers.get('x-forwarded-host');
  const host = forwardedHost || req.headers.get('host') || req.nextUrl.hostname;

  // Remove port if present
  const hostname = host.split(':')[0];

  // ─────────────────────────────────────────────
  // NON-WWW → WWW REDIRECT
  // ─────────────────────────────────────────────
  if (hostname === 'edificationoverseas.in') {
    const url = req.nextUrl.clone();

    url.protocol = 'https:';
    url.hostname = 'www.edificationoverseas.in';
    url.port = '';

    return NextResponse.redirect(url, 307);
  }

  // ─────────────────────────────────────────────
  // ADMIN AUTHENTICATION
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
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};