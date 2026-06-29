<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Project;
use App\Support\Locale;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProjectController extends BaseApiController
{
    public function index(Request $request): JsonResponse
    {
        $locale = $this->locale($request);

        $query = Project::query()
            ->published()
            ->orderBy('ordem');

        if ($request->boolean('featured')) {
            $query->where('destaque', true)->limit(6);
        }

        $projects = $query->get()->map(function (Project $project) use ($locale) {
            return $this->transformProject($project, $locale);
        });

        return response()
            ->json($projects)
            ->header('Cache-Control', 'public, max-age=300');
    }

    public function show(Request $request, string $slug): JsonResponse
    {
        $project = Project::query()
            ->published()
            ->where('slug', $slug)
            ->first();

        if (! $project) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        return response()
            ->json($this->transformProject($project, $this->locale($request)))
            ->header('Cache-Control', 'public, max-age=300');
    }

    private function transformProject(Project $project, string $locale): array
    {
        $data = $this->resolveRecord(
            $project->toArray(),
            $locale,
            ['titulo', 'papel', 'descricao']
        );

        if (is_array($data['metricas'] ?? null)) {
            $data['metricas'] = array_map(function (array $metrica) use ($locale) {
                if (isset($metrica['label']) && is_array($metrica['label'])) {
                    $metrica['label'] = Locale::resolve($metrica['label'], $locale);
                }

                return $metrica;
            }, $data['metricas']);
        }

        if (is_array($data['destaques'] ?? null)) {
            $data['destaques'] = array_map(
                fn (mixed $item) => Locale::resolve($item, $locale),
                $data['destaques']
            );
        }

        return $data;
    }
}
