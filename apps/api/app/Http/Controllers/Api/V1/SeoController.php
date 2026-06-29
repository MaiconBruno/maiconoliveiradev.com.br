<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\SeoMeta;
use App\Services\ImageUploadService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SeoController extends BaseApiController
{
    public function __construct(
        private readonly ImageUploadService $imageUpload,
    ) {}

    public function show(Request $request): JsonResponse
    {
        $path = $request->query('path') ?? $request->query('rota');

        if (! $path) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => [
                    'path' => ['The path or rota query parameter is required.'],
                ],
            ], 422);
        }

        $seo = SeoMeta::query()->where('rota', $path)->first();

        if (! $seo) {
            return response()->json(['message' => 'SEO meta not found'], 404);
        }

        $locale = $this->locale($request);
        $data = $this->resolveRecord(
            $seo->toArray(),
            $locale,
            ['title', 'description', 'og_title', 'og_description']
        );

        $data['og_image'] = $this->imageUpload->publicUrl($data['og_image'] ?? null);

        return response()
            ->json($data)
            ->header('Cache-Control', 'public, max-age=300');
    }
}
