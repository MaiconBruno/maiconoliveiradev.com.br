<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    protected $fillable = [
        'nome',
        'categoria',
        'nivel',
        'ordem',
        'destaque',
    ];

    protected function casts(): array
    {
        return [
            'destaque' => 'boolean',
        ];
    }

    /**
     * @return array<string, string>
     */
    public static function categoryLabels(): array
    {
        return [
            'linguagens' => 'Linguagens',
            'frontend' => 'Frontend',
            'backend' => 'Backend',
            'banco_de_dados' => 'Banco de dados',
            'mensageria' => 'Mensageria',
            'cloud_devops' => 'Cloud / DevOps',
            'ia_automacao' => 'IA / Automação',
            'testes' => 'Testes',
        ];
    }

    /**
     * @return list<string>
     */
    public static function categoryKeys(): array
    {
        return array_keys(self::categoryLabels());
    }

    /**
     * @return list<string>
     */
    public static function niveis(): array
    {
        return ['basico', 'intermediario', 'avancado', 'especialista'];
    }

    /**
     * @return array<string, string>
     */
    public static function nivelLabels(): array
    {
        return [
            'basico' => 'Básico',
            'intermediario' => 'Intermediário',
            'avancado' => 'Avançado',
            'especialista' => 'Especialista',
        ];
    }

    /**
     * @return list<string>
     */
    public static function stackPickerOptions(): array
    {
        return self::query()
            ->orderBy('categoria')
            ->orderBy('ordem')
            ->pluck('nome')
            ->all();
    }
}
