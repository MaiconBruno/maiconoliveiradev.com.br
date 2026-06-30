<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Experience;
use App\Support\Locale;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ExperienceController extends BaseApiController
{
    public function index(Request $request): JsonResponse
    {
        $locale = $this->locale($request);

        $query = Experience::query()
            ->published()
            ->orderBy('ordem');

        if ($request->has('limit')) {
            $query->limit((int) $request->query('limit', 3));
        }

        $experiences = $query->get()->map(function (Experience $experience) use ($locale) {
            $data = $this->resolveRecord(
                $experience->toArray(),
                $locale,
                ['cargo', 'descricao', 'responsabilidades']
            );

            if (is_array($data['progressao'] ?? null)) {
                $data['progressao'] = array_map(function (array $step) use ($locale) {
                    if (isset($step['cargo']) && is_array($step['cargo'])) {
                        $step['cargo'] = Locale::resolve($step['cargo'], $locale);
                    }

                    return $step;
                }, $data['progressao']);
            }

            if (is_array($data['metricas'] ?? null)) {
                $data['metricas'] = array_map(function (array $metrica) use ($locale) {
                    if (isset($metrica['label']) && is_array($metrica['label'])) {
                        $metrica['label'] = Locale::resolve($metrica['label'], $locale);
                    }

                    return $metrica;
                }, $data['metricas']);
            }

            return $data;
        });

        return response()
            ->json($experiences)
            ->header('Cache-Control', 'public, max-age=300');
    }
}
