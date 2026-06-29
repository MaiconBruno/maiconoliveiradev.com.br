import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getApiBaseUrl(): string {
  return typeof window === 'undefined'
    ? (process.env.API_INTERNAL_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000')
    : (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000');
}

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
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
