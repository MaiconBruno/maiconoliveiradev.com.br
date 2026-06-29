import { useState } from 'react';
import GenerateEnButton from './GenerateEnButton';
import LocaleTabs from './LocaleTabs';
import { Locale, LocaleValue } from '../types/locale';

interface LocaleFieldProps {
    label: string;
    value: LocaleValue;
    onChange: (value: LocaleValue) => void;
    type?: 'text' | 'textarea' | 'markdown';
    rows?: number;
    error?: string;
    showGenerate?: boolean;
    placeholder?: string;
}

const inputClassName =
    'w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-50 placeholder:text-zinc-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500';

export default function LocaleField({
    label,
    value,
    onChange,
    type = 'text',
    rows = 4,
    error,
    showGenerate = true,
    placeholder,
}: LocaleFieldProps) {
    const [locale, setLocale] = useState<Locale>('pt');

    const handleChange = (text: string) => {
        onChange({ ...value, [locale]: text });
    };

    const handleTranslated = (en: string) => {
        onChange({ ...value, en });
        setLocale('en');
    };

    const isMultiline = type === 'textarea' || type === 'markdown';

    return (
        <div>
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <label className="text-sm font-medium text-zinc-300">{label}</label>
                <div className="flex flex-wrap items-center gap-2">
                    <LocaleTabs active={locale} onChange={setLocale} />
                    {showGenerate && (
                        <GenerateEnButton
                            ptText={value.pt}
                            onTranslated={handleTranslated}
                        />
                    )}
                </div>
            </div>

            {isMultiline ? (
                <textarea
                    value={value[locale] ?? ''}
                    onChange={(event) => handleChange(event.target.value)}
                    rows={rows}
                    placeholder={placeholder}
                    className={`${inputClassName} font-mono text-xs leading-relaxed`}
                />
            ) : (
                <input
                    type="text"
                    value={value[locale] ?? ''}
                    onChange={(event) => handleChange(event.target.value)}
                    placeholder={placeholder}
                    className={inputClassName}
                />
            )}

            {type === 'markdown' && locale === 'pt' && (
                <p className="mt-1 text-xs text-zinc-500">Markdown suportado.</p>
            )}

            {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
        </div>
    );
}
