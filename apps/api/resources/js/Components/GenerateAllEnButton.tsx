import { useState } from 'react';
import { translateFields } from '../lib/translate';

interface GenerateAllEnButtonProps {
    ptFields: Record<string, string>;
    existingEn?: Record<string, string>;
    onTranslated: (translations: Record<string, string>) => void;
    disabled?: boolean;
}

export default function GenerateAllEnButton({
    ptFields,
    existingEn = {},
    onTranslated,
    disabled = false,
}: GenerateAllEnButtonProps) {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const nonEmptyPt = Object.fromEntries(
        Object.entries(ptFields).filter(([, value]) => value.trim() !== '')
    );

    const hasExistingEn = Object.entries(existingEn).some(
        ([key, value]) => value.trim() !== '' && (nonEmptyPt[key]?.trim() ?? '') !== ''
    );

    const handleClick = async () => {
        if (Object.keys(nonEmptyPt).length === 0) {
            setMessage('Preencha ao menos um campo em PT-BR antes de gerar.');
            return;
        }

        if (
            hasExistingEn &&
            !window.confirm(
                'Campos EN já preenchidos serão sobrescritos. Deseja continuar?'
            )
        ) {
            return;
        }

        setLoading(true);
        setMessage(null);

        const result = await translateFields(nonEmptyPt);

        setLoading(false);

        if (result.error) {
            setMessage(result.error);
            return;
        }

        if (result.en && typeof result.en === 'object') {
            onTranslated(result.en);
            setMessage(null);
            return;
        }

        setMessage('A tradução não retornou conteúdo.');
    };

    return (
        <div className="flex flex-col items-end gap-1">
            <button
                type="button"
                onClick={handleClick}
                disabled={disabled || loading || Object.keys(nonEmptyPt).length === 0}
                className="inline-flex items-center gap-2 rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {loading ? 'Gerando traduções…' : 'Gerar EN (todos)'}
            </button>
            {message && (
                <span className="max-w-md text-right text-xs text-amber-400">
                    {message}
                </span>
            )}
        </div>
    );
}
