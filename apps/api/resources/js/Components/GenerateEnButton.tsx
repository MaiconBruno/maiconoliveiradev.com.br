import { useState } from 'react';
import { translateText } from '../lib/translate';

interface GenerateEnButtonProps {
    ptText: string;
    onTranslated: (en: string) => void;
    disabled?: boolean;
    size?: 'sm' | 'md';
}

export default function GenerateEnButton({
    ptText,
    onTranslated,
    disabled = false,
    size = 'sm',
}: GenerateEnButtonProps) {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const handleClick = async () => {
        if (!ptText.trim()) {
            setMessage('Preencha o texto em PT-BR antes de gerar.');
            return;
        }

        setLoading(true);
        setMessage(null);

        const result = await translateText(ptText);

        setLoading(false);

        if (result.error) {
            setMessage(result.error);
            return;
        }

        if (typeof result.en === 'string' && result.en.trim()) {
            onTranslated(result.en);
            setMessage(null);
            return;
        }

        setMessage('A tradução não retornou conteúdo.');
    };

    const sizeClass =
        size === 'sm'
            ? 'px-2 py-1 text-xs'
            : 'px-3 py-1.5 text-sm';

    return (
        <div className="flex flex-col items-end gap-1">
            <button
                type="button"
                onClick={handleClick}
                disabled={disabled || loading || !ptText.trim()}
                className={`inline-flex items-center gap-1 rounded-md border border-orange-500/30 bg-orange-500/10 font-medium text-orange-400 transition hover:border-orange-500/50 hover:bg-orange-500/20 disabled:cursor-not-allowed disabled:opacity-50 ${sizeClass}`}
            >
                {loading ? 'Gerando…' : 'Gerar EN'}
            </button>
            {message && (
                <span className="max-w-xs text-right text-xs text-amber-400">
                    {message}
                </span>
            )}
        </div>
    );
}
