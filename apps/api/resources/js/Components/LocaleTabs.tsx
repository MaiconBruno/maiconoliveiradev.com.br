import { Locale } from '../types/locale';

interface LocaleTabsProps {
    active: Locale;
    onChange: (locale: Locale) => void;
}

const tabs: { id: Locale; label: string }[] = [
    { id: 'pt', label: 'PT-BR' },
    { id: 'en', label: 'EN' },
];

export default function LocaleTabs({ active, onChange }: LocaleTabsProps) {
    return (
        <div
            className="inline-flex rounded-md bg-zinc-800 p-0.5"
            role="tablist"
            aria-label="Idioma do campo"
        >
            {tabs.map((tab) => {
                const isActive = active === tab.id;

                return (
                    <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => onChange(tab.id)}
                        className={`rounded px-2.5 py-1 text-xs font-medium transition ${
                            isActive
                                ? 'bg-orange-500 text-white shadow-sm'
                                : 'text-zinc-400 hover:text-zinc-200'
                        }`}
                    >
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
}
