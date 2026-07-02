'use client';

import { FormEvent, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { FadeIn } from '@/components/FadeIn';
import { GitHubIcon, LinkedInIcon, MailIcon } from '@/components/icons/SocialIcons';
import RecaptchaCheckbox, { type RecaptchaCheckboxHandle } from '@/components/RecaptchaCheckbox';
import type { Contact, ContactFormPayload } from '@portfolio/types';

const inputClassName =
  'w-full rounded-lg border border-zinc-800 bg-zinc-900/80 px-4 py-3 text-sm text-white placeholder:text-zinc-600 backdrop-blur-sm transition focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/30';

const labelClassName = 'mb-2 block font-mono text-[10px] uppercase tracking-wider text-zinc-600';

export default function ContactForm({ contact }: { contact: Contact }) {
  const t = useTranslations('contact');
  const tSections = useTranslations('sections');
  const locale = useLocale();
  const recaptchaRef = useRef<RecaptchaCheckboxHandle>(null);
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'recaptcha'>('idle');
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!recaptchaToken) {
      setStatus('recaptcha');
      return;
    }

    setLoading(true);
    setStatus('idle');
    const form = new FormData(e.currentTarget);
    const payload: ContactFormPayload = {
      name: String(form.get('name')),
      email: String(form.get('email')),
      subject: String(form.get('subject') || '') || undefined,
      message: String(form.get('message')),
      recaptcha_token: recaptchaToken,
      _honeypot: String(form.get('_honeypot') || '') || undefined,
    };
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Accept-Language': locale,
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus('success');
        e.currentTarget.reset();
        setRecaptchaToken('');
        recaptchaRef.current?.reset();
      } else {
        setStatus('error');
        recaptchaRef.current?.reset();
        setRecaptchaToken('');
      }
    } catch {
      setStatus('error');
      recaptchaRef.current?.reset();
      setRecaptchaToken('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[3fr_7fr] lg:gap-14">
      <FadeIn className="min-w-0 w-full rounded-xl border border-zinc-800 bg-zinc-900/80 p-6 backdrop-blur-sm md:p-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-orange-400/80">
          {tSections('social')}
        </p>

        <ul className="mt-6 space-y-3">
          <li className="min-w-0">
            <a
              href={`mailto:${contact.email}`}
              className="group flex min-w-0 items-start gap-3 rounded-lg border border-transparent px-3 py-2.5 transition hover:border-zinc-800 hover:bg-zinc-900"
            >
              <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-zinc-600 transition group-hover:text-orange-400" />
              <span className="min-w-0 break-all font-mono text-xs leading-relaxed text-zinc-300 transition group-hover:text-orange-400">
                {contact.email}
              </span>
            </a>
          </li>
          {contact.linkedin && (
            <li className="min-w-0">
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-w-0 items-center gap-3 rounded-lg border border-transparent px-3 py-2.5 transition hover:border-zinc-800 hover:bg-zinc-900"
              >
                <LinkedInIcon className="h-4 w-4 shrink-0 text-zinc-600 transition group-hover:text-orange-400" />
                <span className="font-mono text-xs uppercase tracking-wider text-zinc-500 transition group-hover:text-orange-400">
                  LinkedIn
                </span>
              </a>
            </li>
          )}
          {contact.github && (
            <li className="min-w-0">
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-w-0 items-center gap-3 rounded-lg border border-transparent px-3 py-2.5 transition hover:border-zinc-800 hover:bg-zinc-900"
              >
                <GitHubIcon className="h-4 w-4 shrink-0 text-zinc-600 transition group-hover:text-orange-400" />
                <span className="font-mono text-xs uppercase tracking-wider text-zinc-500 transition group-hover:text-orange-400">
                  GitHub
                </span>
              </a>
            </li>
          )}
        </ul>
      </FadeIn>

      <FadeIn delay={0.08}>
        <div className="relative">
          <span
            className="ghost-chapter pointer-events-none absolute -left-2 -top-10 select-none font-mono text-[4.5rem] font-bold leading-none text-zinc-900 md:-left-4 md:-top-12 md:text-[6rem]"
            aria-hidden
          >
            04
          </span>

          <p className="relative font-mono text-xs uppercase tracking-[0.25em] text-zinc-600">
            {t('formEyebrow')}
          </p>
          <h2 className="relative mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
            {t('title')}
          </h2>

          <form onSubmit={submit} className="relative mt-8 space-y-5">
            <input type="text" name="_honeypot" className="hidden" tabIndex={-1} autoComplete="off" />

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className={labelClassName}>
                  {t('name')}
                </label>
                <input id="contact-name" name="name" required className={inputClassName} />
              </div>
              <div>
                <label htmlFor="contact-email" className={labelClassName}>
                  {t('email')}
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  className={inputClassName}
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-subject" className={labelClassName}>
                {t('subject')}
              </label>
              <input id="contact-subject" name="subject" className={inputClassName} />
            </div>

            <div>
              <label htmlFor="contact-message" className={labelClassName}>
                {t('message')}
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={6}
                className={`${inputClassName} resize-y`}
              />
            </div>

            <RecaptchaCheckbox
              ref={recaptchaRef}
              onChange={setRecaptchaToken}
              onExpire={() => setRecaptchaToken('')}
            />

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-orange-500 px-6 py-3 font-medium text-white transition hover:bg-orange-600 disabled:opacity-50"
              >
                {t('send')}
              </button>

              {status === 'success' && (
                <p className="font-mono text-sm text-green-400">{t('success')}</p>
              )}
              {status === 'recaptcha' && (
                <p className="font-mono text-sm text-red-400">{t('recaptchaRequired')}</p>
              )}
              {status === 'error' && (
                <p className="font-mono text-sm text-red-400">{t('error')}</p>
              )}
            </div>
          </form>
        </div>
      </FadeIn>
    </div>
  );
}
