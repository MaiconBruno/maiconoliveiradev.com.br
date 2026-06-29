<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Education;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EducationController extends BaseApiController
{
    public function index(Request $request): JsonResponse
    {
        $locale = $this->locale($request);

        $educations = Education::query()
            ->orderBy('ordem')
            ->get()
            ->map(fn (Education $education) => $this->resolveRecord(
                $education->toArray(),
                $locale,
                ['grau', 'status']
            ));

        return response()
            ->json($educations)
            ->header('Cache-Control', 'public, max-age=300');
    }
}
