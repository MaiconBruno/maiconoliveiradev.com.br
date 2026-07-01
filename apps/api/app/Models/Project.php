<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'slug',
        'titulo',
        'empresa',
        'periodo',
        'papel',
        'stack',
        'url',
        'status',
        'descricao',
        'metricas',
        'destaques',
        'imagens',
        'galeria',
        'ordem',
        'destaque',
        'publicado_em',
    ];

    protected function casts(): array
    {
        return [
            'titulo' => 'array',
            'papel' => 'array',
            'stack' => 'array',
            'descricao' => 'array',
            'metricas' => 'array',
            'destaques' => 'array',
            'imagens' => 'array',
            'galeria' => 'array',
            'destaque' => 'boolean',
            'publicado_em' => 'datetime',
        ];
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }
}
