<?php

namespace App\Http\Requests;

use App\Models\Skill;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreSkillRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'destaque' => $this->boolean('destaque'),
            'nivel' => $this->input('nivel') ?: null,
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'nome' => [
                'required',
                'string',
                'max:255',
                Rule::unique('skills')->where(fn ($query) => $query->where('categoria', $this->input('categoria'))),
            ],
            'categoria' => ['required', 'string', Rule::in(Skill::categoryKeys())],
            'nivel' => ['nullable', 'string', Rule::in(Skill::niveis())],
            'ordem' => ['required', 'integer', 'min:0'],
            'destaque' => ['boolean'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'nome.required' => 'O nome da skill é obrigatório.',
            'nome.unique' => 'Já existe uma skill com este nome nesta categoria.',
            'categoria.required' => 'A categoria é obrigatória.',
            'categoria.in' => 'Categoria inválida.',
            'ordem.required' => 'A ordem é obrigatória.',
            'ordem.integer' => 'A ordem deve ser um número inteiro.',
        ];
    }
}
