<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateContactRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'email' => ['required', 'email', 'max:255'],
            'telefone' => ['nullable', 'string', 'max:50'],
            'linkedin' => ['nullable', 'url', 'max:255'],
            'github' => ['nullable', 'url', 'max:255'],
            'portfolio' => ['nullable', 'url', 'max:255'],
            'outros' => ['nullable', 'array'],
            'outros.*.label' => ['required_with:outros.*.url', 'string', 'max:100'],
            'outros.*.url' => ['required_with:outros.*.label', 'url', 'max:255'],
            'outros.*.icone' => ['nullable', 'string', 'max:50'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $nullableUrls = ['linkedin', 'github', 'portfolio'];
        $normalized = [];

        foreach ($nullableUrls as $field) {
            $value = $this->input($field);
            $normalized[$field] = filled($value) ? $value : null;
        }

        $outros = collect($this->input('outros', []))
            ->filter(fn (mixed $item) => is_array($item) && (filled($item['label'] ?? null) || filled($item['url'] ?? null)))
            ->map(fn (array $item) => [
                'label' => $item['label'] ?? '',
                'url' => $item['url'] ?? '',
                'icone' => filled($item['icone'] ?? null) ? $item['icone'] : null,
            ])
            ->values()
            ->all();

        $this->merge([
            ...$normalized,
            'outros' => $outros,
            'telefone' => filled($this->input('telefone')) ? $this->input('telefone') : null,
        ]);
    }
}
