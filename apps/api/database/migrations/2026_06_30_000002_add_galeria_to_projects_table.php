<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->json('galeria')->nullable()->after('imagens');
        });

        DB::table('projects')->orderBy('id')->get()->each(function (object $project) {
            $imagens = json_decode($project->imagens ?? '[]', true);
            if (! is_array($imagens) || count($imagens) <= 1) {
                return;
            }

            $cover = [array_shift($imagens)];
            $galeria = array_map(
                fn (string $path) => ['path' => $path, 'type' => 'image'],
                $imagens
            );

            DB::table('projects')->where('id', $project->id)->update([
                'imagens' => json_encode($cover),
                'galeria' => json_encode($galeria),
            ]);
        });
    }

    public function down(): void
    {
        DB::table('projects')->orderBy('id')->get()->each(function (object $project) {
            $imagens = json_decode($project->imagens ?? '[]', true) ?? [];
            $galeria = json_decode($project->galeria ?? '[]', true) ?? [];

            if ($galeria === []) {
                return;
            }

            $extraPaths = array_column($galeria, 'path');
            DB::table('projects')->where('id', $project->id)->update([
                'imagens' => json_encode(array_merge($imagens, $extraPaths)),
            ]);
        });

        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn('galeria');
        });
    }
};
