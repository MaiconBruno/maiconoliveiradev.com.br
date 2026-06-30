<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreExperienceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'empresa' => ['required', 'string', 'max:255'],
            'cargo' => ['required', 'array'],
            'cargo.pt' => ['required', 'string', 'max:255'],
            'cargo.en' => ['nullable', 'string', 'max:255'],
            'progressao' => ['nullable', 'array'],
            'progressao.*.cargo' => ['required', 'array'],
            'progressao.*.cargo.pt' => ['required', 'string', 'max:255'],
            'progressao.*.cargo.en' => ['nullable', 'string', 'max:255'],
            'progressao.*.periodo_inicio' => ['nullable', 'string', 'max:20'],
            'progressao.*.periodo_fim' => ['nullable', 'string', 'max:20'],
            'periodo_inicio' => ['nullable', 'string', 'max:20'],
            'periodo_fim' => ['nullable', 'string', 'max:20'],
            'modelo' => ['nullable', 'string', 'in:remoto,hibrido,presencial'],
            'tipo' => ['nullable', 'string', 'in:CLT,PJ,contrato'],
            'descricao' => ['nullable', 'array'],
            'descricao.pt' => ['nullable', 'string'],
            'descricao.en' => ['nullable', 'string'],
            'responsabilidades' => ['nullable', 'array'],
            'responsabilidades.*.pt' => ['nullable', 'string'],
            'responsabilidades.*.en' => ['nullable', 'string'],
            'stack' => ['nullable', 'array'],
            'stack.*' => ['string', 'max:100'],
            'metricas' => ['nullable', 'array'],
            'metricas.*.label' => ['nullable', 'array'],
            'metricas.*.label.pt' => ['nullable', 'string', 'max:255'],
            'metricas.*.label.en' => ['nullable', 'string', 'max:255'],
            'metricas.*.valor' => ['nullable', 'string', 'max:255'],
            'ordem' => ['integer', 'min:0'],
            'publicado' => ['boolean'],
        ];
    }

    public function validated($key = null, $default = null): array
    {
        $data = parent::validated($key, $default);

        $data['publicado'] = $this->boolean('publicado');
        $data['periodo_inicio'] = $this->nullableString($data['periodo_inicio'] ?? null);
        $data['periodo_fim'] = $this->nullableString($data['periodo_fim'] ?? null);
        $data['modelo'] = $this->nullableString($data['modelo'] ?? null);
        $data['tipo'] = $this->nullableString($data['tipo'] ?? null);
        $data['responsabilidades'] = $this->filterResponsabilidades($data['responsabilidades'] ?? []);
        $data['progressao'] = $this->filterProgressao($data['progressao'] ?? []);
        $data['metricas'] = $this->filterMetricas($data['metricas'] ?? []);
        $data['stack'] = array_values(array_filter($data['stack'] ?? [], fn ($item) => trim($item) !== ''));

        return $data;
    }

    private function filterProgressao(array $items): array
    {
        return array_values(array_filter($items, function (array $item) {
            return trim($item['cargo']['pt'] ?? '') !== '' || trim($item['cargo']['en'] ?? '') !== '';
        }));
    }

    private function filterResponsabilidades(array $items): array
    {
        return array_values(array_filter($items, function (array $item) {
            return trim($item['pt'] ?? '') !== '' || trim($item['en'] ?? '') !== '';
        }));
    }

    private function filterMetricas(array $items): array
    {
        return array_values(array_filter($items, function (array $item) {
            $labelPt = trim($item['label']['pt'] ?? '');
            $labelEn = trim($item['label']['en'] ?? '');
            $valor = trim($item['valor'] ?? '');

            return $labelPt !== '' || $labelEn !== '' || $valor !== '';
        }));
    }

    private function nullableString(?string $value): ?string
    {
        if ($value === null) {
            return null;
        }

        $trimmed = trim($value);

        return $trimmed === '' ? null : $trimmed;
    }
}
