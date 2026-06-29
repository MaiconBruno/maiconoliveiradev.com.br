<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'nome_completo',
        'headline',
        'localizacao',
        'modelo_trabalho',
        'anos_experiencia',
        'bio_resumo',
        'bio_longa',
        'foto',
        'cta_primario',
        'cta_secundario',
        'curriculo_pdf',
    ];

    protected function casts(): array
    {
        return [
            'headline' => 'array',
            'modelo_trabalho' => 'array',
            'bio_resumo' => 'array',
            'bio_longa' => 'array',
            'cta_primario' => 'array',
            'cta_secundario' => 'array',
        ];
    }
}
