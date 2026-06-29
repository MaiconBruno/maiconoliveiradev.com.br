<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use InvalidArgumentException;

class ImageUploadService
{
    public const ALLOWED_FOLDERS = ['projects', 'profile', 'seo'];

    private const MAX_SIZE_KB = 5120;

    /**
     * @return array{path: string, url: string}
     */
    public function store(UploadedFile $file, string $folder): array
    {
        $this->assertAllowedFolder($folder);
        $this->validateFile($file);

        $extension = $file->guessExtension() ?: $file->getClientOriginalExtension() ?: 'jpg';
        $filename = Str::uuid().'.'.strtolower($extension);
        $path = $file->storeAs($folder, $filename, 'public');

        return [
            'path' => $path,
            'url' => $this->publicUrl($path) ?? '',
        ];
    }

    public function delete(?string $path): void
    {
        if ($path === null || $path === '') {
            return;
        }

        $normalized = ltrim(str_replace('/storage/', '', $path), '/');

        if (Storage::disk('public')->exists($normalized)) {
            Storage::disk('public')->delete($normalized);
        }
    }

    public function publicUrl(?string $path): ?string
    {
        if ($path === null || $path === '') {
            return null;
        }

        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
            return $path;
        }

        $normalized = ltrim(str_replace('/storage/', '', $path), '/');

        return Storage::disk('public')->url($normalized);
    }

    private function assertAllowedFolder(string $folder): void
    {
        if (! in_array($folder, self::ALLOWED_FOLDERS, true)) {
            throw new InvalidArgumentException("Pasta de upload inválida: {$folder}");
        }
    }

    /**
     * @throws ValidationException
     */
    private function validateFile(UploadedFile $file): void
    {
        Validator::make(
            ['file' => $file],
            [
                'file' => ['required', 'image', 'mimes:jpeg,jpg,png,webp', 'max:'.self::MAX_SIZE_KB],
            ],
            [
                'file.image' => 'O arquivo deve ser uma imagem.',
                'file.mimes' => 'Formatos permitidos: JPEG, PNG ou WebP.',
                'file.max' => 'A imagem deve ter no máximo 5 MB.',
            ]
        )->validate();
    }
}
