import type { Metadata } from 'next';
import { getApiBaseUrl, getSiteUrl, mediaUrl } from '@/lib/utils';

export type SeoData = {
  title?: string | null;
  description?: string | null;
  og_title?: string | null;
  og_description?: string | null;
  og_image?: string | null;
  canonical?: string | null;
  noindex?: boolean;
};

type Locale = 'pt' | 'en';

type PageFallbackKey = 'home' | 'projects' | 'about' | 'contact' | 'project';

const PAGE_FALLBACKS: Record<PageFallbackKey, Record<Locale, { title: string; description: string }>> = {
  home: {
    pt: {
      title: 'Maicon Oliveira — Desenvolvedor Full Stack Sênior',
      description: 'Portfólio de Maicon Bruno Rodrigues Oliveira — Full Stack, IA e sistemas SaaS.',
    },
    en: {
      title: 'Maicon Oliveira — Senior Full Stack Developer',
      description: 'Portfolio of Maicon Bruno Rodrigues Oliveira — Full Stack, AI and SaaS systems.',
    },
  },
  projects: {
    pt: {
      title: 'Projetos — Maicon Oliveira',
      description: 'Cases de projetos em SaaS, e-commerce, IA e integrações.',
    },
    en: {
      title: 'Projects — Maicon Oliveira',
      description: 'Project cases in SaaS, e-commerce, AI and integrations.',
    },
  },
  about: {
    pt: {
      title: 'Sobre — Maicon Oliveira',
      description: 'Bio, experiências, formação acadêmica e certificações.',
    },
    en: {
      title: 'About — Maicon Oliveira',
      description: 'Bio, experience, education and certifications.',
    },
  },
  contact: {
    pt: {
      title: 'Contato — Maicon Oliveira',
      description: 'Entre em contato por e-mail, LinkedIn ou GitHub.',
    },
    en: {
      title: 'Contact — Maicon Oliveira',
      description: 'Get in touch via email, LinkedIn or GitHub.',
    },
  },
  project: {
    pt: {
      title: 'Projeto — Maicon Oliveira',
      description: 'Case study de projeto em desenvolvimento de software.',
    },
    en: {
      title: 'Project — Maicon Oliveira',
      description: 'Software project case study.',
    },
  },
};

function toOgLocale(locale: string): 'pt_BR' | 'en_US' {
  return locale === 'en' ? 'en_US' : 'pt_BR';
}

function swapLocaleInPath(path: string, targetLocale: Locale): string {
  return path.replace(/^\/(pt|en)(?=\/|$)/, `/${targetLocale}`);
}

async function fetchSeo(path: string, locale: string): Promise<SeoData | null> {
  try {
    const res = await fetch(
      `${getApiBaseUrl()}/api/v1/seo?path=${encodeURIComponent(path)}`,
      {
        headers: {
          Accept: 'application/json',
          'Accept-Language': locale,
        },
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) {
      return null;
    }

    return (await res.json()) as SeoData;
  } catch {
    return null;
  }
}

export type SeoMetadataOptions = {
  page?: PageFallbackKey;
  overrides?: {
    title?: string;
    description?: string;
    image?: string | null;
  };
};

export async function getSeoMetadata(
  locale: string,
  path: string,
  options?: SeoMetadataOptions
): Promise<Metadata> {
  const resolvedLocale = (locale === 'en' ? 'en' : 'pt') as Locale;
  const alternateLocale: Locale = resolvedLocale === 'en' ? 'pt' : 'en';
  const siteUrl = getSiteUrl();
  const seo = await fetchSeo(path, resolvedLocale);
  const fallback = options?.page ? PAGE_FALLBACKS[options.page][resolvedLocale] : undefined;

  const title =
    options?.overrides?.title ?? seo?.title ?? fallback?.title ?? 'Maicon Oliveira';
  const description =
    options?.overrides?.description ?? seo?.description ?? fallback?.description ?? undefined;
  const ogTitle = seo?.og_title ?? title;
  const ogDescription = seo?.og_description ?? description;
  const imagePath = options?.overrides?.image ?? seo?.og_image;
  const imageUrl = imagePath ? mediaUrl(imagePath) : null;

  const canonical = seo?.canonical ?? `${siteUrl}${path}`;

  const metadata: Metadata = {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        'pt-BR': `${siteUrl}${swapLocaleInPath(path, 'pt')}`,
        'en-US': `${siteUrl}${swapLocaleInPath(path, 'en')}`,
      },
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      locale: toOgLocale(resolvedLocale),
      alternateLocale: toOgLocale(alternateLocale),
      url: canonical,
      siteName: 'Maicon Oliveira',
      type: 'website',
      ...(imageUrl ? { images: [{ url: imageUrl }] } : {}),
    },
  };

  if (seo?.noindex) {
    metadata.robots = { index: false, follow: false };
  }

  return metadata;
}

export function truncateDescription(text: string | undefined | null, max = 160): string | undefined {
  if (!text) return undefined;
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (normalized.length <= max) return normalized;
  return `${normalized.slice(0, max - 1).trimEnd()}…`;
}
