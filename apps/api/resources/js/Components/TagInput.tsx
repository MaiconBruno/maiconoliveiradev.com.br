import { KeyboardEvent, useState } from 'react';

interface TagInputProps {
    label: string;
    value: string[];
    onChange: (tags: string[]) => void;
    placeholder?: string;
    error?: string;
    suggestions?: string[];
    suggestionsLabel?: string;
}

export default function TagInput({
    label,
    value,
    onChange,
    placeholder = 'Digite e pressione Enter',
    error,
    suggestions = [],
    suggestionsLabel = 'Cadastradas',
}: TagInputProps) {
    const [input, setInput] = useState('');

    const addTag = (tag: string) => {
        const trimmed = tag.trim();
        if (trimmed && !value.includes(trimmed)) {
            onChange([...value, trimmed]);
        }
        setInput('');
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTag(input);
        } else if (e.key === 'Backspace' && !input && value.length > 0) {
            onChange(value.slice(0, -1));
        }
    };

    const removeTag = (index: number) => {
        onChange(value.filter((_, i) => i !== index));
    };

    const availableSuggestions = suggestions.filter((tag) => !value.includes(tag));

    return (
        <div>
            <label className="mb-1 block text-sm font-medium text-zinc-300">{label}</label>
            <div className="flex min-h-[42px] flex-wrap gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 focus-within:border-orange-500">
                {value.map((tag, index) => (
                    <span
                        key={`${tag}-${index}`}
                        className="inline-flex items-center gap-1 rounded-md bg-orange-500/10 px-2 py-0.5 text-xs text-orange-300"
                    >
                        {tag}
                        <button
                            type="button"
                            onClick={() => removeTag(index)}
                            className="text-orange-400 hover:text-orange-200"
                            aria-label={`Remover ${tag}`}
                        >
                            ×
                        </button>
                    </span>
                ))}
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={() => input && addTag(input)}
                    placeholder={value.length === 0 ? placeholder : ''}
                    className="min-w-[120px] flex-1 bg-transparent text-sm text-zinc-50 outline-none placeholder:text-zinc-500"
                />
            </div>
            {availableSuggestions.length > 0 && (
                <div className="mt-2">
                    <p className="mb-1.5 text-xs text-zinc-500">{suggestionsLabel}</p>
                    <div className="flex max-h-32 flex-wrap gap-1.5 overflow-y-auto">
                        {availableSuggestions.map((tag) => (
                            <button
                                key={tag}
                                type="button"
                                onClick={() => addTag(tag)}
                                className="rounded-md border border-zinc-700 bg-zinc-800/80 px-2 py-0.5 text-xs text-zinc-300 transition hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-orange-300"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            )}
            {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
        </div>
    );
}
