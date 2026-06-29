/**
 * Upload de imagem reutilizável (tasks 01, 02, 06).
 *
 * Props:
 * - value: path relativo (`projects/uuid.webp`) ou URL pública
 * - onChange: recebe path relativo após upload, ou null ao remover
 * - folder: `projects` | `profile` | `seo`
 *
 * Endpoint: POST /admin/upload (multipart: file, folder)
 */
import { DragEvent, useRef, useState } from 'react';
import axios from 'axios';

export type ImageUploadFolder = 'projects' | 'profile' | 'seo';

interface ImageUploadProps {
    value?: string | null;
    onChange: (path: string | null) => void;
    folder: ImageUploadFolder;
    label?: string;
    disabled?: boolean;
}

function resolvePreviewUrl(value: string): string {
    if (value.startsWith('http://') || value.startsWith('https://')) {
        return value;
    }

    if (value.startsWith('/storage/')) {
        return value;
    }

    return `/storage/${value.replace(/^\/+/, '')}`;
}

export default function ImageUpload({
    value,
    onChange,
    folder,
    label = 'Imagem',
    disabled = false,
}: ImageUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [dragging, setDragging] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const previewUrl = value ? resolvePreviewUrl(value) : null;

    const uploadFile = async (file: File) => {
        setError(null);
        setUploading(true);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', folder);

        try {
            const { data } = await axios.post<{ path: string; url: string }>(
                '/admin/upload',
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                }
            );

            onChange(data.path);
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const message =
                    err.response?.data?.message ??
                    err.response?.data?.errors?.file?.[0] ??
                    'Falha ao enviar a imagem.';
                setError(message);
            } else {
                setError('Falha ao enviar a imagem.');
            }
        } finally {
            setUploading(false);
        }
    };

    const handleFiles = (files: FileList | null) => {
        const file = files?.[0];
        if (file) {
            void uploadFile(file);
        }
    };

    const onDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragging(false);

        if (disabled || uploading) {
            return;
        }

        handleFiles(event.dataTransfer.files);
    };

    return (
        <div className="space-y-2">
            <span className="block text-sm font-medium text-zinc-300">{label}</span>

            {previewUrl ? (
                <div className="relative inline-block">
                    <img
                        src={previewUrl}
                        alt="Preview"
                        className="max-h-48 rounded-lg border border-zinc-700 object-cover"
                    />
                    {!disabled && (
                        <button
                            type="button"
                            onClick={() => onChange(null)}
                            className="absolute right-2 top-2 rounded-md bg-zinc-900/90 px-2 py-1 text-xs text-zinc-200 transition hover:bg-red-900/90 hover:text-red-100"
                        >
                            Remover
                        </button>
                    )}
                </div>
            ) : (
                <div
                    onDragOver={(event) => {
                        event.preventDefault();
                        if (!disabled && !uploading) {
                            setDragging(true);
                        }
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={onDrop}
                    onClick={() => !disabled && !uploading && inputRef.current?.click()}
                    className={[
                        'flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-4 py-6 text-center transition',
                        dragging
                            ? 'border-orange-500 bg-orange-500/10'
                            : 'border-zinc-700 bg-zinc-900/50 hover:border-orange-500/60',
                        disabled || uploading ? 'pointer-events-none opacity-60' : '',
                    ].join(' ')}
                >
                    <p className="text-sm text-zinc-300">
                        {uploading ? 'Enviando...' : 'Arraste uma imagem ou clique para selecionar'}
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">JPEG, PNG ou WebP — máx. 5 MB</p>
                </div>
            )}

            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                disabled={disabled || uploading}
                onChange={(event) => handleFiles(event.target.files)}
            />

            {error && <p className="text-sm text-red-400">{error}</p>}
        </div>
    );
}
