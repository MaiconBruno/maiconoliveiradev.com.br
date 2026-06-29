import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    const locale = request.cookies.get('locale')?.value === 'en' ? 'en' : 'pt';
    const response = NextResponse.redirect(new URL(`/${locale}`, request.url));
    response.cookies.set('locale', locale, { path: '/', maxAge: 60 * 60 * 24 * 365 });
    return response;
  }

  const response = intlMiddleware(request);
  const locale = request.nextUrl.pathname.split('/')[1];
  if (locale === 'pt' || locale === 'en') {
    response.cookies.set('locale', locale, { path: '/', maxAge: 60 * 60 * 24 * 365 });
  }
  return response;
}

export const config = {
  matcher: ['/', '/(pt|en)/:path*'],
};
