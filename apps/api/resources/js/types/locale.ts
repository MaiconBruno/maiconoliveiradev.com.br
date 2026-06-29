export type Locale = 'pt' | 'en';

export interface LocaleValue {
    pt: string;
    en: string;
}

export const emptyLocale = (): LocaleValue => ({ pt: '', en: '' });

export function normalizeLocale(value?: Partial<LocaleValue> | null): LocaleValue {
    return {
        pt: value?.pt ?? '',
        en: value?.en ?? '',
    };
}
