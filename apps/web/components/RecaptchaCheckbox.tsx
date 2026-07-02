'use client';

import Script from 'next/script';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? '';

type Grecaptcha = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      theme?: 'light' | 'dark';
      callback: (token: string) => void;
      'expired-callback'?: () => void;
      'error-callback'?: () => void;
    }
  ) => number;
  reset: (widgetId?: number) => void;
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
    onPortfolioRecaptchaLoad?: () => void;
  }
}

export type RecaptchaCheckboxHandle = {
  reset: () => void;
};

type RecaptchaCheckboxProps = {
  onChange: (token: string) => void;
  onExpire: () => void;
};

const RecaptchaCheckbox = forwardRef<RecaptchaCheckboxHandle, RecaptchaCheckboxProps>(
  function RecaptchaCheckbox({ onChange, onExpire }, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<number | null>(null);
    const [scriptReady, setScriptReady] = useState(false);

    const reset = useCallback(() => {
      if (window.grecaptcha && widgetIdRef.current !== null) {
        window.grecaptcha.reset(widgetIdRef.current);
      }
      onExpire();
    }, [onExpire]);

    useImperativeHandle(ref, () => ({ reset }), [reset]);

    const renderWidget = useCallback(() => {
      if (!SITE_KEY || !containerRef.current || !window.grecaptcha || widgetIdRef.current !== null) {
        return;
      }

      widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
        sitekey: SITE_KEY,
        theme: 'dark',
        callback: onChange,
        'expired-callback': onExpire,
        'error-callback': onExpire,
      });
    }, [onChange, onExpire]);

    useEffect(() => {
      window.onPortfolioRecaptchaLoad = () => setScriptReady(true);

      if (window.grecaptcha) {
        setScriptReady(true);
      }

      return () => {
        delete window.onPortfolioRecaptchaLoad;
      };
    }, []);

    useEffect(() => {
      if (scriptReady) {
        renderWidget();
      }
    }, [scriptReady, renderWidget]);

    if (!SITE_KEY) {
      return null;
    }

    return (
      <>
        <Script
          src="https://www.google.com/recaptcha/api.js?onload=onPortfolioRecaptchaLoad&render=explicit"
          strategy="lazyOnload"
        />
        <div ref={containerRef} className="min-h-[78px]" />
      </>
    );
  }
);

export default RecaptchaCheckbox;
