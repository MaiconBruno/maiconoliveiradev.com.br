import { LocaleValue } from '../types/locale';

export function pickPtEn(
    fields: Record<string, string>,
    existing: Record<string, string> = {}
): { pt: Record<string, string>; en: Record<string, string> } {
    const pt: Record<string, string> = {};
    const en: Record<string, string> = {};

    for (const [key, value] of Object.entries(fields)) {
        if (value.trim()) {
            pt[key] = value;
            en[key] = existing[key] ?? '';
        }
    }

    return { pt, en };
}

export function setLocaleField(
    current: LocaleValue,
    en: string
): LocaleValue {
    return { ...current, en };
}
