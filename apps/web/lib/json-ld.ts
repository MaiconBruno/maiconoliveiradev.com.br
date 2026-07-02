import type {
  Certification,
  Contact,
  Education,
  Experience,
  Profile,
  Project,
  SkillGroup,
} from '@portfolio/types';
import { getSiteUrl, getStorageUrl } from '@/lib/utils';

type Locale = 'pt' | 'en';

type PersonInput = {
  profile: Profile;
  experiences: Experience[];
  contact: Contact;
  education?: Education[];
  certifications?: Certification[];
  skills?: SkillGroup[];
  pageUrl: string;
};

type PageLabels = {
  home: string;
  projects: string;
  about: string;
  contact: string;
};

function toPageLanguage(locale: string): 'pt-BR' | 'en-US' {
  return locale === 'en' ? 'en-US' : 'pt-BR';
}

function absoluteImage(path?: string | null): string | undefined {
  return getStorageUrl(path) ?? undefined;
}

function buildGraph(...nodes: Record<string, unknown>[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  };
}

function buildPersonNode({
  profile,
  experiences,
  contact,
  education = [],
  certifications = [],
  skills = [],
  pageUrl,
}: PersonInput): Record<string, unknown> {
  const personId = `${pageUrl}#person`;
  const current = experiences.find((exp) => !exp.periodo_fim);

  const sameAs = [contact.linkedin, contact.github, contact.portfolio].filter(
    (url): url is string => Boolean(url)
  );

  const skillNames = skills.flatMap((group) => group.skills.map((skill) => skill.nome));
  const stackNames = experiences.flatMap((exp) => exp.stack ?? []);
  const knowsAbout = [...new Set([...skillNames, ...stackNames])];

  return {
    '@type': 'Person',
    '@id': personId,
    name: profile.nome_completo,
    jobTitle:
      current?.progressao?.[current.progressao.length - 1]?.cargo ??
      current?.cargo ??
      profile.headline,
    description: profile.bio_resumo,
    url: pageUrl,
    ...(profile.foto ? { image: absoluteImage(profile.foto) } : {}),
    ...(contact.email ? { email: contact.email } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
    ...(knowsAbout.length > 0 ? { knowsAbout } : {}),
    ...(current
      ? {
          worksFor: {
            '@type': 'Organization',
            name: current.empresa,
          },
        }
      : {}),
    ...(education.length > 0
      ? {
          alumniOf: education.map((edu) => ({
            '@type': 'EducationalOrganization',
            name: edu.instituicao,
          })),
        }
      : {}),
    ...(certifications.length > 0
      ? {
          hasCredential: certifications.map((cert) => ({
            '@type': 'EducationalOccupationalCredential',
            name: cert.titulo,
            ...(cert.emissor ? { credentialCategory: cert.emissor } : {}),
          })),
        }
      : {}),
  };
}

function buildOrganizationRoles(experiences: Experience[], pageUrl: string): Record<string, unknown>[] {
  return experiences.flatMap((exp) => {
    if (exp.progressao && exp.progressao.length > 0) {
      return exp.progressao.map((step, index) => ({
        '@type': 'OrganizationRole',
        '@id': `${pageUrl}#role-${exp.id}-${index}`,
        roleName: step.cargo,
        ...(exp.descricao && index === exp.progressao!.length - 1
          ? { description: exp.descricao }
          : {}),
        ...(step.periodo_inicio ? { startDate: step.periodo_inicio } : {}),
        ...(step.periodo_fim ? { endDate: step.periodo_fim } : {}),
        member: { '@id': `${pageUrl}#person` },
        memberOf: {
          '@type': 'Organization',
          name: exp.empresa,
        },
        ...(exp.stack && exp.stack.length > 0 && index === exp.progressao!.length - 1
          ? { skills: exp.stack.join(', ') }
          : {}),
      }));
    }

    return [
      {
        '@type': 'OrganizationRole',
        '@id': `${pageUrl}#role-${exp.id}`,
        roleName: exp.cargo,
        ...(exp.descricao ? { description: exp.descricao } : {}),
        ...(exp.periodo_inicio ? { startDate: exp.periodo_inicio } : {}),
        ...(exp.periodo_fim ? { endDate: exp.periodo_fim } : {}),
        member: { '@id': `${pageUrl}#person` },
        memberOf: {
          '@type': 'Organization',
          name: exp.empresa,
        },
        ...(exp.stack && exp.stack.length > 0 ? { skills: exp.stack.join(', ') } : {}),
      },
    ];
  });
}

function buildBreadcrumb(
  pageUrl: string,
  items: { name: string; url?: string }[]
): Record<string, unknown> {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };
}

function buildWebsiteNode(profile: Profile, personId: string): Record<string, unknown> {
  const siteUrl = getSiteUrl();

  return {
    '@type': 'WebSite',
    '@id': `${siteUrl}#website`,
    name: profile.nome_completo,
    alternateName: 'Maicon Oliveira',
    url: siteUrl,
    inLanguage: ['pt-BR', 'en-US'],
    author: { '@id': personId },
  };
}

export function buildHomeJsonLd(input: PersonInput & { locale: string }): Record<string, unknown> {
  const personId = `${input.pageUrl}#person`;
  const person = buildPersonNode(input);
  const roles = buildOrganizationRoles(input.experiences, input.pageUrl);
  const website = buildWebsiteNode(input.profile, personId);

  const webpage = {
    '@type': 'WebPage',
    '@id': `${input.pageUrl}#webpage`,
    url: input.pageUrl,
    name: input.profile.headline,
    description: input.profile.bio_resumo,
    inLanguage: toPageLanguage(input.locale),
    isPartOf: { '@id': `${getSiteUrl()}#website` },
    about: { '@id': personId },
    mainEntity: { '@id': personId },
  };

  return buildGraph(website, webpage, person, ...roles);
}

export function buildAboutJsonLd(input: PersonInput & { locale: string }): Record<string, unknown> {
  const personId = `${input.pageUrl}#person`;
  const person = buildPersonNode(input);
  const roles = buildOrganizationRoles(input.experiences, input.pageUrl);
  const siteUrl = getSiteUrl();

  const webpage = {
    '@type': 'ProfilePage',
    '@id': `${input.pageUrl}#webpage`,
    url: input.pageUrl,
    name: input.profile.nome_completo,
    description: input.profile.bio_resumo,
    inLanguage: toPageLanguage(input.locale),
    isPartOf: { '@id': `${siteUrl}#website` },
    mainEntity: { '@id': personId },
  };

  const breadcrumb = buildBreadcrumb(input.pageUrl, [
    { name: input.locale === 'en' ? 'Home' : 'Início', url: `${siteUrl}/${input.locale}` },
    { name: input.locale === 'en' ? 'About' : 'Sobre' },
  ]);

  return buildGraph(webpage, person, ...roles, breadcrumb);
}

export function buildProjectsListJsonLd({
  projects,
  pageUrl,
  locale,
  pageName,
}: {
  projects: Project[];
  pageUrl: string;
  locale: Locale;
  pageName: string;
}): Record<string, unknown> {
  const siteUrl = getSiteUrl();

  const itemList = {
    '@type': 'ItemList',
    '@id': `${pageUrl}#itemlist`,
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: project.titulo,
      url: `${siteUrl}/${locale}/projetos/${project.slug}`,
    })),
  };

  const webpage = {
    '@type': 'CollectionPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: pageName,
    inLanguage: toPageLanguage(locale),
    isPartOf: { '@id': `${siteUrl}#website` },
    mainEntity: { '@id': `${pageUrl}#itemlist` },
  };

  const breadcrumb = buildBreadcrumb(pageUrl, [
    { name: locale === 'en' ? 'Home' : 'Início', url: `${siteUrl}/${locale}` },
    { name: pageName },
  ]);

  return buildGraph(webpage, itemList, breadcrumb);
}

export function buildProjectJsonLd({
  project,
  profile,
  pageUrl,
  locale,
  labels,
}: {
  project: Project;
  profile: Profile;
  pageUrl: string;
  locale: Locale;
  labels: PageLabels;
}): Record<string, unknown> {
  const siteUrl = getSiteUrl();
  const projectId = `${pageUrl}#project`;
  const coverImage = project.imagens?.[0] ?? project.galeria?.find((item) => item.type === 'image')?.path;

  const creativeWork = {
    '@type': 'CreativeWork',
    '@id': projectId,
    name: project.titulo,
    ...(project.descricao ? { description: project.descricao } : {}),
    ...(coverImage ? { image: absoluteImage(coverImage) } : {}),
    url: project.url ?? pageUrl,
    ...(project.publicado_em ? { datePublished: project.publicado_em } : {}),
    ...(project.stack.length > 0 ? { keywords: project.stack.join(', ') } : {}),
    creator: {
      '@type': 'Person',
      name: profile.nome_completo,
      url: `${siteUrl}/${locale}`,
    },
    ...(project.empresa
      ? {
          publisher: {
            '@type': 'Organization',
            name: project.empresa,
          },
        }
      : {}),
    ...(project.papel ? { contributor: { '@type': 'Person', name: profile.nome_completo, jobTitle: project.papel } } : {}),
  };

  const webpage = {
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: project.titulo,
    ...(project.descricao ? { description: project.descricao } : {}),
    inLanguage: toPageLanguage(locale),
    isPartOf: { '@id': `${siteUrl}#website` },
    mainEntity: { '@id': projectId },
  };

  const breadcrumb = buildBreadcrumb(pageUrl, [
    { name: labels.home, url: `${siteUrl}/${locale}` },
    { name: labels.projects, url: `${siteUrl}/${locale}/projetos` },
    { name: project.titulo },
  ]);

  return buildGraph(webpage, creativeWork, breadcrumb);
}

export function buildContactJsonLd({
  profile,
  contact,
  pageUrl,
  locale,
  pageName,
}: {
  profile: Profile;
  contact: Contact;
  pageUrl: string;
  locale: Locale;
  pageName: string;
}): Record<string, unknown> {
  const siteUrl = getSiteUrl();
  const personId = `${pageUrl}#person`;

  const sameAs = [contact.linkedin, contact.github, contact.portfolio].filter(
    (url): url is string => Boolean(url)
  );

  const person = {
    '@type': 'Person',
    '@id': personId,
    name: profile.nome_completo,
    url: `${siteUrl}/${locale}`,
    ...(contact.email ? { email: contact.email } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  const webpage = {
    '@type': 'ContactPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: pageName,
    description: profile.bio_resumo,
    inLanguage: toPageLanguage(locale),
    isPartOf: { '@id': `${siteUrl}#website` },
    mainEntity: { '@id': personId },
  };

  const breadcrumb = buildBreadcrumb(pageUrl, [
    { name: locale === 'en' ? 'Home' : 'Início', url: `${siteUrl}/${locale}` },
    { name: pageName },
  ]);

  return buildGraph(webpage, person, breadcrumb);
}

/** @deprecated Use buildHomeJsonLd or buildAboutJsonLd */
export function buildPersonJsonLd(input: PersonInput): Record<string, unknown> {
  const person = buildPersonNode(input);
  const roles = buildOrganizationRoles(input.experiences, input.pageUrl);
  return buildGraph(person, ...roles);
}
