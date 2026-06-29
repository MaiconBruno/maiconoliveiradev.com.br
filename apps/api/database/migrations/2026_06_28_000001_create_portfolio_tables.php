<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->string('nome_completo');
            $table->json('headline');
            $table->string('localizacao')->nullable();
            $table->json('modelo_trabalho')->nullable();
            $table->string('anos_experiencia')->nullable();
            $table->json('bio_resumo')->nullable();
            $table->json('bio_longa')->nullable();
            $table->string('foto')->nullable();
            $table->json('cta_primario')->nullable();
            $table->json('cta_secundario')->nullable();
            $table->string('curriculo_pdf')->nullable();
            $table->timestamps();
        });

        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->json('titulo');
            $table->string('empresa')->nullable();
            $table->string('periodo')->nullable();
            $table->json('papel')->nullable();
            $table->json('stack')->nullable();
            $table->string('url')->nullable();
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
            $table->json('descricao')->nullable();
            $table->json('metricas')->nullable();
            $table->json('destaques')->nullable();
            $table->json('imagens')->nullable();
            $table->unsignedInteger('ordem')->default(0);
            $table->boolean('destaque')->default(false);
            $table->timestamp('publicado_em')->nullable();
            $table->timestamps();
        });

        Schema::create('experiences', function (Blueprint $table) {
            $table->id();
            $table->string('empresa');
            $table->json('cargo');
            $table->string('periodo_inicio')->nullable();
            $table->string('periodo_fim')->nullable();
            $table->string('modelo')->nullable();
            $table->string('tipo')->nullable();
            $table->json('descricao')->nullable();
            $table->json('responsabilidades')->nullable();
            $table->json('stack')->nullable();
            $table->json('metricas')->nullable();
            $table->unsignedInteger('ordem')->default(0);
            $table->boolean('publicado')->default(true);
            $table->timestamps();
        });

        Schema::create('skills', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->string('categoria');
            $table->string('nivel')->nullable();
            $table->unsignedInteger('ordem')->default(0);
            $table->boolean('destaque')->default(false);
            $table->timestamps();
        });

        Schema::create('contacts', function (Blueprint $table) {
            $table->id();
            $table->string('email');
            $table->string('telefone')->nullable();
            $table->string('linkedin')->nullable();
            $table->string('github')->nullable();
            $table->string('portfolio')->nullable();
            $table->json('outros')->nullable();
            $table->timestamps();
        });

        Schema::create('seo_metas', function (Blueprint $table) {
            $table->id();
            $table->string('rota')->unique();
            $table->json('title');
            $table->json('description')->nullable();
            $table->json('og_title')->nullable();
            $table->json('og_description')->nullable();
            $table->string('og_image')->nullable();
            $table->string('canonical')->nullable();
            $table->boolean('noindex')->default(false);
            $table->timestamps();
        });

        Schema::create('educations', function (Blueprint $table) {
            $table->id();
            $table->json('grau');
            $table->string('instituicao');
            $table->string('periodo')->nullable();
            $table->json('status')->nullable();
            $table->unsignedInteger('ordem')->default(0);
            $table->timestamps();
        });

        Schema::create('certifications', function (Blueprint $table) {
            $table->id();
            $table->json('titulo');
            $table->string('emissor')->nullable();
            $table->unsignedInteger('ordem')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('certifications');
        Schema::dropIfExists('educations');
        Schema::dropIfExists('seo_metas');
        Schema::dropIfExists('contacts');
        Schema::dropIfExists('skills');
        Schema::dropIfExists('experiences');
        Schema::dropIfExists('projects');
        Schema::dropIfExists('profiles');
    }
};
