<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Profile;
use App\Support\MediaUrl;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProfileController extends BaseApiController
{
    public function show(Request $request): JsonResponse
    {
        $profile = Profile::query()->first();

        if (! $profile) {
            return response()->json(['message' => 'Profile not found'], 404);
        }

        $locale = $this->locale($request);
        $data = $this->resolveRecord(
            $profile->toArray(),
            $locale,
            ['headline', 'modelo_trabalho', 'bio_resumo', 'bio_longa', 'cta_primario', 'cta_secundario']
        );

        $data['foto'] = MediaUrl::public($data['foto'] ?? null);
        $data['curriculo_pdf'] = MediaUrl::public($data['curriculo_pdf'] ?? null);

        return response()
            ->json($data)
            ->header('Cache-Control', 'public, max-age=300');
    }
}
