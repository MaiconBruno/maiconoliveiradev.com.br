import type { ContactFormPayload } from '@portfolio/types';
import { getApiBaseUrl } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  let payload: ContactFormPayload;

  try {
    payload = (await request.json()) as ContactFormPayload;
  } catch {
    return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 });
  }

  const locale = request.headers.get('accept-language')?.split(',')[0]?.trim() || 'pt';
  const forwardedFor = request.headers.get('x-forwarded-for');
  const clientIp = forwardedFor?.split(',')[0]?.trim() || request.headers.get('x-real-ip');

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Accept-Language': locale,
  };

  if (clientIp) {
    headers['X-Forwarded-For'] = clientIp;
  }

  try {
    const res = await fetch(`${getApiBaseUrl()}/api/v1/contact`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    const body = await res.text();
    const contentType = res.headers.get('content-type') ?? 'application/json';

    return new NextResponse(body, {
      status: res.status,
      headers: { 'Content-Type': contentType },
    });
  } catch {
    return NextResponse.json({ message: 'Upstream API unavailable' }, { status: 502 });
  }
}
