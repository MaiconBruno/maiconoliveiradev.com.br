import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function ensureUrlProtocol(raw: string): string {
  const trimmed = raw.replace(/\/$/, '');
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  const useHttp = /^(localhost|127\.0\.0\.1|api)(:|$)/i.test(trimmed);
  return `${useHttp ? 'http' : 'https'}://${trimmed}`;
}

export function getSiteUrl(): string {
  return ensureUrlProtocol(process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000');
}

export function getApiBaseUrl(): string {
  const fallback = 'http://localhost:8000';
  const raw =
    typeof window === 'undefined'
      ? (process.env.API_INTERNAL_URL ?? process.env.NEXT_PUBLIC_API_URL ?? fallback)
      : (process.env.NEXT_PUBLIC_API_URL ?? fallback);

  return ensureUrlProtocol(raw);
}

export async function fetchApi<T>(
  path: string,
  locale: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${getApiBaseUrl()}/api/v1${path}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      'Accept-Language': locale,
      ...(options?.headers ?? {}),
    },
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error(`API ${path} failed: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export type Translated = string | { pt?: string; en?: string };

export function getStorageUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `${getApiBaseUrl()}/storage/${path.replace(/^\//, '')}`;
}

/** @deprecated Use getStorageUrl */
export const mediaUrl = getStorageUrl;
