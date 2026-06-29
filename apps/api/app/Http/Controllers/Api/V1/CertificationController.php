<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Certification;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CertificationController extends BaseApiController
{
    public function index(Request $request): JsonResponse
    {
        $locale = $this->locale($request);

        $certifications = Certification::query()
            ->orderBy('ordem')
            ->get()
            ->map(fn (Certification $certification) => $this->resolveRecord(
                $certification->toArray(),
                $locale,
                ['titulo']
            ));

        return response()
            ->json($certifications)
            ->header('Cache-Control', 'public, max-age=300');
    }
}
