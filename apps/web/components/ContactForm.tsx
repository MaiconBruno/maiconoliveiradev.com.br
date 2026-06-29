'use client';

import { FormEvent, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import type { Contact, ContactFormPayload } from '@portfolio/types';

const API_URL =
  typeof window !== 'undefined'
    ? (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000')
    : (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000');

export default function ContactPage({ contact }: { contact: Contact }) {
  const t = useTranslations('contact');
  const locale = useLocale();
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');
    const form = new FormData(e.currentTarget);
    const payload: ContactFormPayload = {
      name: String(form.get('name')),
      email: String(form.get('email')),
      subject: String(form.get('subject') || '') || undefined,
      message: String(form.get('message')),
      _honeypot: String(form.get('_honeypot') || '') || undefined,
    };
    try {
      const res = await fetch(`${API_URL}/api/v1/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Accept-Language': locale,
        },
        body: JSON.stringify(payload),
      });
      setStatus(res.ok ? 'success' : 'error');
      if (res.ok) e.currentTarget.reset();
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-2 text-3xl font-bold text-white">{t('title')}</h1>
      <p className="mb-12 text-zinc-400">{t('subtitle')}</p>

      <div className="mb-12 flex flex-wrap gap-6">
        <a href={`mailto:${contact.email}`} className="text-orange-400 hover:text-orange-300">
          {contact.email}
        </a>
        {contact.linkedin && (
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-orange-400">
            LinkedIn
          </a>
        )}
        {contact.github && (
          <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-orange-400">
            GitHub
          </a>
        )}
      </div>

      <form onSubmit={submit} className="space-y-4 max-w-lg">
        <input type="text" name="_honeypot" className="hidden" tabIndex={-1} autoComplete="off" />
        <div>
          <label className="mb-1 block text-sm text-zinc-400">{t('name')}</label>
          <input name="name" required className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-white focus:border-orange-500 focus:outline-none" />
        </div>
        <div>
          <label className="mb-1 block text-sm text-zinc-400">{t('email')}</label>
          <input name="email" type="email" required className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-white focus:border-orange-500 focus:outline-none" />
        </div>
        <div>
          <label className="mb-1 block text-sm text-zinc-400">{t('subject')}</label>
          <input name="subject" className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-white focus:border-orange-500 focus:outline-none" />
        </div>
        <div>
          <label className="mb-1 block text-sm text-zinc-400">{t('message')}</label>
          <textarea name="message" required rows={5} className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-white focus:border-orange-500 focus:outline-none" />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-orange-500 px-6 py-3 font-medium text-white hover:bg-orange-600 disabled:opacity-50"
        >
          {t('send')}
        </button>
        {status === 'success' && <p className="text-green-400">{t('success')}</p>}
        {status === 'error' && <p className="text-red-400">{t('error')}</p>}
      </form>
    </div>
  );
}
