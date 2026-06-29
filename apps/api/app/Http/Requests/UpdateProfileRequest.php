<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nome_completo' => ['required', 'string', 'max:255'],
            'headline' => ['required', 'array'],
            'headline.pt' => ['required', 'string', 'max:500'],
            'headline.en' => ['nullable', 'string', 'max:500'],
            'localizacao' => ['nullable', 'string', 'max:255'],
            'modelo_trabalho' => ['nullable', 'array'],
            'modelo_trabalho.pt' => ['nullable', 'string', 'max:255'],
            'modelo_trabalho.en' => ['nullable', 'string', 'max:255'],
            'anos_experiencia' => ['nullable', 'string', 'max:50'],
            'bio_resumo' => ['nullable', 'array'],
            'bio_resumo.pt' => ['nullable', 'string'],
            'bio_resumo.en' => ['nullable', 'string'],
            'bio_longa' => ['nullable', 'array'],
            'bio_longa.pt' => ['nullable', 'string'],
            'bio_longa.en' => ['nullable', 'string'],
            'foto' => ['nullable', 'string', 'max:500'],
            'cta_primario' => ['nullable', 'array'],
            'cta_primario.label' => ['nullable', 'array'],
            'cta_primario.label.pt' => ['nullable', 'string', 'max:255'],
            'cta_primario.label.en' => ['nullable', 'string', 'max:255'],
            'cta_primario.url' => ['nullable', 'string', 'max:500'],
            'cta_primario.externo' => ['sometimes', 'boolean'],
            'cta_secundario' => ['nullable', 'array'],
            'cta_secundario.label' => ['nullable', 'array'],
            'cta_secundario.label.pt' => ['nullable', 'string', 'max:255'],
            'cta_secundario.label.en' => ['nullable', 'string', 'max:255'],
            'cta_secundario.url' => ['nullable', 'string', 'max:500'],
            'cta_secundario.externo' => ['sometimes', 'boolean'],
            'curriculo_pdf_file' => ['nullable', 'file', 'mimes:pdf', 'max:5120'],
            'remove_curriculo_pdf' => ['sometimes', 'boolean'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'remove_curriculo_pdf' => $this->boolean('remove_curriculo_pdf'),
            'cta_primario' => $this->normalizeCta($this->input('cta_primario')),
            'cta_secundario' => $this->normalizeCta($this->input('cta_secundario')),
        ]);
    }

    private function normalizeCta(mixed $cta): ?array
    {
        if (! is_array($cta)) {
            return null;
        }

        $cta['externo'] = filter_var($cta['externo'] ?? false, FILTER_VALIDATE_BOOLEAN);

        return $cta;
    }
}
