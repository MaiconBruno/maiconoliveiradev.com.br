import { getTranslations } from 'next-intl/server';
import ContactForm from '@/components/ContactForm';
import { getSeoMetadata } from '@/lib/seo';
import { fetchApi } from '@/lib/utils';
import type { Contact } from '@portfolio/types';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return getSeoMetadata(locale, `/${locale}/contato`, { page: 'contact' });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  await getTranslations({ locale });
  const contact = await fetchApi<Contact>('/contact', locale);

  return <ContactForm contact={contact} />;
}
