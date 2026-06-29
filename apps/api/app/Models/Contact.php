<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $table = 'contacts';

    protected $fillable = [
        'email',
        'telefone',
        'linkedin',
        'github',
        'portfolio',
        'outros',
    ];

    protected function casts(): array
    {
        return [
            'outros' => 'array',
        ];
    }
}
