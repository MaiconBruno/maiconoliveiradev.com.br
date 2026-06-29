<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    protected $table = 'educations';

    protected $fillable = [
        'grau',
        'instituicao',
        'periodo',
        'status',
        'ordem',
    ];

    protected function casts(): array
    {
        return [
            'grau' => 'array',
            'status' => 'array',
        ];
    }
}
