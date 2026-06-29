<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Skill;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SkillController extends BaseApiController
{
    public function index(Request $request): JsonResponse
    {
        $locale = $this->locale($request);

        $groups = Skill::query()
            ->orderBy('categoria')
            ->orderBy('ordem')
            ->get()
            ->groupBy('categoria')
            ->map(fn ($skills, $categoria) => [
                'categoria' => $categoria,
                'skills' => $skills->map(fn (Skill $skill) => [
                    'nome' => $skill->nome,
                    'destaque' => (bool) $skill->destaque,
                ])->values()->all(),
            ])
            ->values()
            ->all();

        return response()
            ->json($groups)
            ->header('Cache-Control', 'public, max-age=300');
    }
}
