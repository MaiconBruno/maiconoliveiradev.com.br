<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEducationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'grau.pt' => ['required', 'string', 'max:500'],
            'grau.en' => ['nullable', 'string', 'max:500'],
            'instituicao' => ['required', 'string', 'max:255'],
            'periodo' => ['nullable', 'string', 'max:100'],
            'status.pt' => ['nullable', 'string', 'max:100'],
            'status.en' => ['nullable', 'string', 'max:100'],
            'ordem' => ['required', 'integer', 'min:0'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'grau.pt.required' => 'O grau em português é obrigatório.',
            'instituicao.required' => 'A instituição é obrigatória.',
            'ordem.required' => 'A ordem é obrigatória.',
            'ordem.integer' => 'A ordem deve ser um número inteiro.',
        ];
    }
}
