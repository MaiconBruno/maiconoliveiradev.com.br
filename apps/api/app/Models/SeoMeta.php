<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SeoMeta extends Model
{
    protected $table = 'seo_metas';

    protected $fillable = [
        'rota',
        'title',
        'description',
        'og_title',
        'og_description',
        'og_image',
        'canonical',
        'noindex',
    ];

    protected function casts(): array
    {
        return [
            'title' => 'array',
            'description' => 'array',
            'og_title' => 'array',
            'og_description' => 'array',
            'noindex' => 'boolean',
        ];
    }
}
