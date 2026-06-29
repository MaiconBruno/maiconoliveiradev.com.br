<?php

namespace App\Http\Requests;

use App\Models\Skill;
use Illuminate\Validation\Rule;

class UpdateSkillRequest extends StoreSkillRequest
{
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
                Rule::unique('skills')
                    ->where(fn ($query) => $query->where('categoria', $this->input('categoria')))
                    ->ignore($this->route('skill')),
            ],
            'categoria' => ['required', 'string', Rule::in(Skill::categoryKeys())],
            'nivel' => ['nullable', 'string', Rule::in(Skill::niveis())],
            'ordem' => ['required', 'integer', 'min:0'],
            'destaque' => ['boolean'],
        ];
    }
}
