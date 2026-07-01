import { ChangeEvent, useRef, useState } from 'react';
import axios from 'axios';

export interface GalleryMediaItem {
    path: string;
    type: 'image' | 'video';
}

interface MediaGalleryUploadProps {
    existing: GalleryMediaItem[];
    onExistingChange: (items: GalleryMediaItem[]) => void;
    error?: string;
}

function storageUrl(path: string): string {
    return `/storage/${path.replace(/^\//, '')}`;
}

export default function MediaGalleryUpload({
    existing,
    onExistingChange,
    error,
}: MediaGalleryUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);

    const uploadFile = async (file: File): Promise<GalleryMediaItem | null> => {
        setUploadError(null);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', 'projects');
        formData.append('allow_video', '1');

        try {
            const { data } = await axios.post<GalleryMediaItem & { url: string }>(
                '/admin/upload',
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );

            return { path: data.path, type: data.type };
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const message =
                    err.response?.data?.message ??
                    err.response?.data?.errors?.file?.[0] ??
                    'Falha ao enviar o arquivo.';
                setUploadError(message);
            } else {
                setUploadError('Falha ao enviar o arquivo.');
            }

            return null;
        }
    };

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        if (files.length === 0) {
            return;
        }

        setUploading(true);
        const nextItems = [...existing];

        for (const file of files) {
            const item = await uploadFile(file);
            if (item) {
                nextItems.push(item);
            }
        }

        onExistingChange(nextItems);
        setUploading(false);

        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    const removeExisting = (index: number) => {
        onExistingChange(existing.filter((_, i) => i !== index));
    };

    const totalCount = existing.length;
    const displayError = error ?? uploadError;

    return (
        <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">Galeria do case</label>
            <p className="mb-3 text-xs text-zinc-500">
                Imagens (JPEG, PNG, WebP — máx. 5 MB) ou vídeos (MP4, WebM, MOV — máx. 50 MB).
                Exibidos no mockup de laptop na página do projeto.
            </p>

            <div className="mb-3 flex flex-wrap gap-3">
                {existing.map((item, index) => (
                    <div
                        key={`existing-${item.path}`}
                        className="group relative h-24 w-36 overflow-hidden rounded-lg border border-zinc-700 bg-zinc-950"
                    >
                        {item.type === 'video' ? (
                            <video
                                src={storageUrl(item.path)}
                                className="h-full w-full object-cover"
                                muted
                                playsInline
                            />
                        ) : (
                            <img
                                src={storageUrl(item.path)}
                                alt=""
                                className="h-full w-full object-cover"
                            />
                        )}
                        <span className="absolute left-1 top-1 rounded bg-black/70 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-zinc-300">
                            {item.type}
                        </span>
                        <button
                            type="button"
                            onClick={() => removeExisting(index)}
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
                accept="image/jpeg,image/png,image/webp,video/mp4,video/webm,video/quicktime"
                multiple
                disabled={uploading}
                onChange={handleFileChange}
                className="block w-full text-sm text-zinc-400 file:mr-4 file:rounded-md file:border-0 file:bg-orange-500 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-orange-600 disabled:opacity-50"
            />
            {uploading && (
                <p className="mt-2 text-sm text-zinc-400">Enviando...</p>
            )}
            {totalCount > 0 && (
                <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-zinc-600">
                    {totalCount} {totalCount === 1 ? 'item' : 'itens'} na galeria
                </p>
            )}
            {displayError && <p className="mt-1 text-sm text-red-400">{displayError}</p>}
        </div>
    );
}
