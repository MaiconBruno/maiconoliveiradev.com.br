import type { Certification, Contact, Education, Experience, Profile, SkillGroup } from '@portfolio/types';

type PersonJsonLdInput = {
  profile: Profile;
  experiences: Experience[];
  contact: Contact;
  education?: Education[];
  certifications?: Certification[];
  skills?: SkillGroup[];
  pageUrl: string;
};

export function buildPersonJsonLd({
  profile,
  experiences,
  contact,
  education = [],
  certifications = [],
  skills = [],
  pageUrl,
}: PersonJsonLdInput): Record<string, unknown> {
  const personId = `${pageUrl}#person`;
  const current = experiences.find((exp) => !exp.periodo_fim);

  const sameAs = [contact.linkedin, contact.github, contact.portfolio].filter(
    (url): url is string => Boolean(url)
  );

  const skillNames = skills.flatMap((group) => group.skills.map((skill) => skill.nome));
  const stackNames = experiences.flatMap((exp) => exp.stack ?? []);
  const knowsAbout = [...new Set([...skillNames, ...stackNames])];

  const person: Record<string, unknown> = {
    '@type': 'Person',
    '@id': personId,
    name: profile.nome_completo,
    jobTitle:
      current?.progressao?.[current.progressao.length - 1]?.cargo ??
      current?.cargo ??
      profile.headline,
    description: profile.bio_resumo,
    url: pageUrl,
    ...(profile.foto ? { image: profile.foto } : {}),
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

  const roles = experiences.flatMap((exp) => {
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
        member: { '@id': personId },
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
        member: { '@id': personId },
        memberOf: {
          '@type': 'Organization',
          name: exp.empresa,
        },
        ...(exp.stack && exp.stack.length > 0 ? { skills: exp.stack.join(', ') } : {}),
      },
    ];
  });

  return {
    '@context': 'https://schema.org',
    '@graph': [person, ...roles],
  };
}
