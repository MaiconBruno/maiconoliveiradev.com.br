import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { fetchApi, getSiteUrl } from '@/lib/utils';
import type { Project } from '@portfolio/types';

type SitemapEntry = MetadataRoute.Sitemap[number];

const STATIC_PATHS = ['', '/projetos', '/sobre', '/contato'] as const;

function toHreflang(locale: string): string {
  return locale === 'en' ? 'en-US' : 'pt-BR';
}

function localizedAlternates(pathSuffix: string): Record<string, string> {
  const siteUrl = getSiteUrl();
  const languages: Record<string, string> = {};

  for (const locale of routing.locales) {
    languages[toHreflang(locale)] = `${siteUrl}/${locale}${pathSuffix}`;
  }

  return languages;
}

function buildEntry(
  pathSuffix: string,
  options?: {
    lastModified?: Date;
    changeFrequency?: SitemapEntry['changeFrequency'];
    priority?: number;
  }
): SitemapEntry {
  const siteUrl = getSiteUrl();

  return {
    url: `${siteUrl}/${routing.defaultLocale}${pathSuffix}`,
    lastModified: options?.lastModified ?? new Date(),
    changeFrequency: options?.changeFrequency ?? 'monthly',
    priority: options?.priority ?? 0.8,
    alternates: { languages: localizedAlternates(pathSuffix) },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = STATIC_PATHS.map((pathSuffix) =>
    buildEntry(pathSuffix, {
      changeFrequency: pathSuffix === '' ? 'weekly' : 'monthly',
      priority: pathSuffix === '' ? 1 : pathSuffix === '/projetos' ? 0.9 : 0.8,
    })
  );

  try {
    const projects = await fetchApi<Project[]>('/projects', routing.defaultLocale);

    for (const project of projects) {
      const pathSuffix = `/projetos/${project.slug}`;
      const lastModified = project.updated_at ? new Date(project.updated_at) : new Date();

      entries.push(
        buildEntry(pathSuffix, {
          lastModified,
          changeFrequency: 'monthly',
          priority: 0.7,
        })
      );
    }
  } catch {
    // Sitemap estático ainda é útil se a API estiver indisponível no build.
  }

  return entries;
}
