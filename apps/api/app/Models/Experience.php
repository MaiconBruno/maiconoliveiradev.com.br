<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    protected $fillable = [
        'empresa',
        'cargo',
        'progressao',
        'periodo_inicio',
        'periodo_fim',
        'modelo',
        'tipo',
        'descricao',
        'responsabilidades',
        'stack',
        'metricas',
        'ordem',
        'publicado',
    ];

    protected function casts(): array
    {
        return [
            'cargo' => 'array',
            'progressao' => 'array',
            'descricao' => 'array',
            'responsabilidades' => 'array',
            'stack' => 'array',
            'metricas' => 'array',
            'publicado' => 'boolean',
        ];
    }

    public function scopePublished($query)
    {
        return $query->where('publicado', true);
    }
}
