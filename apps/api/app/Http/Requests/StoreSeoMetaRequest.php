<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreSeoMetaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'rota' => ['required', 'string', 'max:255', 'regex:/^\//', 'unique:seo_metas,rota'],
            'title' => ['required', 'array'],
            'title.pt' => ['required', 'string', 'max:255'],
            'title.en' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'array'],
            'description.pt' => ['nullable', 'string', 'max:500'],
            'description.en' => ['nullable', 'string', 'max:500'],
            'og_title' => ['nullable', 'array'],
            'og_title.pt' => ['nullable', 'string', 'max:255'],
            'og_title.en' => ['nullable', 'string', 'max:255'],
            'og_description' => ['nullable', 'array'],
            'og_description.pt' => ['nullable', 'string', 'max:500'],
            'og_description.en' => ['nullable', 'string', 'max:500'],
            'og_image' => ['nullable', 'string', 'max:500'],
            'canonical' => ['nullable', 'url', 'max:500'],
            'noindex' => ['sometimes', 'boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'rota.regex' => 'A rota deve começar com / (ex.: /pt/projetos).',
            'rota.unique' => 'Já existe SEO cadastrado para esta rota.',
        ];
    }
}
