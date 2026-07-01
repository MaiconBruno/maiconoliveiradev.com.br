<?php

namespace App\Http\Requests\Concerns;

use App\Models\Project;
use Illuminate\Validation\Validator;

trait ValidatesProjectData
{
    protected function projectRules(?int $ignoreProjectId = null): array
    {
        $slugRule = ['required', 'string', 'max:255', 'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/'];

        if ($ignoreProjectId) {
            $slugRule[] = 'unique:projects,slug,'.$ignoreProjectId;
        } else {
            $slugRule[] = 'unique:projects,slug';
        }

        return [
            'slug' => $slugRule,
            'titulo' => ['required', 'array'],
            'titulo.pt' => ['required', 'string', 'max:255'],
            'titulo.en' => ['nullable', 'string', 'max:255'],
            'empresa' => ['nullable', 'string', 'max:255'],
            'periodo' => ['nullable', 'string', 'max:255'],
            'papel' => ['nullable', 'array'],
            'papel.pt' => ['nullable', 'string', 'max:255'],
            'papel.en' => ['nullable', 'string', 'max:255'],
            'stack' => ['nullable', 'array'],
            'stack.*' => ['string', 'max:100'],
            'url' => ['nullable', 'url', 'max:500'],
            'status' => ['required', 'in:draft,published,archived'],
            'descricao' => ['nullable', 'array'],
            'descricao.pt' => ['nullable', 'string'],
            'descricao.en' => ['nullable', 'string'],
            'metricas' => ['nullable', 'array'],
            'metricas.*.label' => ['required', 'array'],
            'metricas.*.label.pt' => ['required', 'string', 'max:255'],
            'metricas.*.label.en' => ['nullable', 'string', 'max:255'],
            'metricas.*.valor' => ['nullable', 'string', 'max:255'],
            'destaques' => ['nullable', 'array'],
            'destaques.*.pt' => ['required', 'string', 'max:500'],
            'destaques.*.en' => ['nullable', 'string', 'max:500'],
            'imagens_existentes' => ['nullable', 'array', 'max:1'],
            'imagens_existentes.*' => ['string', 'max:500'],
            'imagens_upload' => ['nullable', 'array', 'max:1'],
            'imagens_upload.*' => ['file', 'mimes:jpeg,jpg,png,webp', 'max:5120'],
            'galeria_existentes' => ['nullable', 'array'],
            'galeria_existentes.*.path' => ['required', 'string', 'max:500'],
            'galeria_existentes.*.type' => ['required', 'in:image,video'],
            'galeria_upload' => ['nullable', 'array'],
            'galeria_upload.*' => ['file', 'mimes:jpeg,jpg,png,webp,mp4,webm,mov', 'max:51200'],
            'ordem' => ['required', 'integer', 'min:0'],
            'destaque' => ['boolean'],
            'publicado_em' => ['nullable', 'date'],
        ];
    }

    protected function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator) {
            if (! $this->boolean('destaque')) {
                return;
            }

            $query = Project::query()->where('destaque', true);

            $projectId = $this->route('project')?->id;
            if ($projectId) {
                $query->where('id', '!=', $projectId);
            }

            if ($query->count() >= 6) {
                $validator->errors()->add(
                    'destaque',
                    'Já existem 6 projetos em destaque. Remova o destaque de outro projeto antes.'
                );
            }
        });
    }

    /**
     * @return array<string, mixed>
     */
    public function normalizedProjectAttributes(): array
    {
        $data = $this->validated();

        $attributes = [
            'slug' => $data['slug'],
            'titulo' => [
                'pt' => $data['titulo']['pt'],
                'en' => $data['titulo']['en'] ?? null,
            ],
            'empresa' => $data['empresa'] ?? null,
            'periodo' => $data['periodo'] ?? null,
            'papel' => isset($data['papel']) ? [
                'pt' => $data['papel']['pt'] ?? null,
                'en' => $data['papel']['en'] ?? null,
            ] : null,
            'stack' => $data['stack'] ?? [],
            'url' => $data['url'] ?? null,
            'status' => $data['status'],
            'descricao' => isset($data['descricao']) ? [
                'pt' => $data['descricao']['pt'] ?? null,
                'en' => $data['descricao']['en'] ?? null,
            ] : null,
            'metricas' => $data['metricas'] ?? [],
            'destaques' => $data['destaques'] ?? [],
            'ordem' => (int) $data['ordem'],
            'destaque' => $this->boolean('destaque'),
            'publicado_em' => $data['publicado_em'] ?? null,
        ];

        if ($attributes['status'] === 'published' && empty($attributes['publicado_em'])) {
            $attributes['publicado_em'] = now();
        }

        if ($attributes['status'] !== 'published') {
            $attributes['publicado_em'] = $data['publicado_em'] ?? null;
        }

        return $attributes;
    }
}
