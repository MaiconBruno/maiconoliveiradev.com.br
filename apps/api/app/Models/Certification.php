<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Certification extends Model
{
    protected $fillable = [
        'titulo',
        'emissor',
        'ordem',
    ];

    protected function casts(): array
    {
        return [
            'titulo' => 'array',
        ];
    }
}
