import { ChangeEvent, useRef } from 'react';

interface ImageGalleryUploadProps {
    existing: string[];
    uploads: File[];
    onExistingChange: (paths: string[]) => void;
    onUploadsChange: (files: File[]) => void;
    error?: string;
    label?: string;
    hint?: string;
    maxItems?: number;
}

function storageUrl(path: string): string {
    return `/storage/${path.replace(/^\//, '')}`;
}

export default function ImageGalleryUpload({
    existing,
    uploads,
    onExistingChange,
    onUploadsChange,
    error,
    label = 'Imagens',
    hint = 'JPEG, PNG ou WebP — máx. 5 MB cada',
    maxItems,
}: ImageGalleryUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        if (files.length > 0) {
            const next = maxItems === 1 ? files.slice(0, 1) : [...uploads, ...files];
            onUploadsChange(next);
            if (maxItems === 1 && existing.length > 0) {
                onExistingChange([]);
            }
        }
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    const removeExisting = (index: number) => {
        onExistingChange(existing.filter((_, i) => i !== index));
    };

    const removeUpload = (index: number) => {
        onUploadsChange(uploads.filter((_, i) => i !== index));
    };

    const totalCount = existing.length + uploads.length;
    const atLimit = maxItems !== undefined && totalCount >= maxItems;

    return (
        <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">{label}</label>
            <p className="mb-3 text-xs text-zinc-500">{hint}</p>

            <div className="mb-3 flex flex-wrap gap-3">
                {existing.map((path, index) => (
                    <div
                        key={`existing-${path}`}
                        className="group relative h-24 w-24 overflow-hidden rounded-lg border border-zinc-700"
                    >
                        <img
                            src={storageUrl(path)}
                            alt=""
                            className="h-full w-full object-cover"
                        />
                        <button
                            type="button"
                            onClick={() => removeExisting(index)}
                            className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition group-hover:opacity-100"
                        >
                            <span className="text-sm text-white">Remover</span>
                        </button>
                    </div>
                ))}
                {uploads.map((file, index) => (
                    <div
                        key={`upload-${file.name}-${index}`}
                        className="group relative h-24 w-24 overflow-hidden rounded-lg border border-orange-500/30"
                    >
                        <img
                            src={URL.createObjectURL(file)}
                            alt=""
                            className="h-full w-full object-cover"
                        />
                        <button
                            type="button"
                            onClick={() => removeUpload(index)}
                            className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition group-hover:opacity-100"
                        >
                            <span className="text-sm text-white">Remover</span>
                        </button>
                    </div>
                ))}
            </div>

            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple={maxItems !== 1}
                disabled={atLimit}
                onChange={handleFileChange}
                className="block w-full text-sm text-zinc-400 file:mr-4 file:rounded-md file:border-0 file:bg-orange-500 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-orange-600 disabled:opacity-50"
            />
            {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
        </div>
    );
}
