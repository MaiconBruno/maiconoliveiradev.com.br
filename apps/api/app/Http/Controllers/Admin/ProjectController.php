<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Project;
use App\Models\Skill;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Projects/Index', [
            'projects' => Project::query()->orderBy('ordem')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Projects/Create', [
            'destaqueCount' => Project::query()->where('destaque', true)->count(),
            ...$this->formOptions(),
        ]);
    }

    public function store(StoreProjectRequest $request): RedirectResponse
    {
        try {
            $attributes = $request->normalizedProjectAttributes();
            $attributes['imagens'] = $this->syncImages(
                $request->input('imagens_existentes', []),
                $request->file('imagens_upload', [])
            );

            Project::query()->create($attributes);

            return redirect()
                ->route('admin.projects.index')
                ->with('success', 'Projeto criado com sucesso.');
        } catch (\Throwable $e) {
            report($e);

            return redirect()
                ->back()
                ->withInput()
                ->with('error', 'Erro ao criar projeto. Tente novamente.');
        }
    }

    public function edit(Project $project): Response
    {
        return Inertia::render('Admin/Projects/Edit', [
            'project' => $project,
            'destaqueCount' => Project::query()
                ->where('destaque', true)
                ->where('id', '!=', $project->id)
                ->count(),
            ...$this->formOptions(),
        ]);
    }

    public function update(UpdateProjectRequest $request, Project $project): RedirectResponse
    {
        try {
            $attributes = $request->normalizedProjectAttributes();
            $newImages = $this->syncImages(
                $request->input('imagens_existentes', []),
                $request->file('imagens_upload', [])
            );

            $this->deleteRemovedImages($project, $newImages);
            $attributes['imagens'] = $newImages;

            if ($attributes['status'] === 'published' && ! $project->publicado_em && empty($attributes['publicado_em'])) {
                $attributes['publicado_em'] = now();
            }

            $project->update($attributes);

            return redirect()
                ->route('admin.projects.index')
                ->with('success', 'Projeto atualizado com sucesso.');
        } catch (\Throwable $e) {
            report($e);

            return redirect()
                ->back()
                ->withInput()
                ->with('error', 'Erro ao atualizar projeto. Tente novamente.');
        }
    }

    public function destroy(Project $project): RedirectResponse
    {
        try {
            $this->deleteRemovedImages($project, []);
            $project->delete();

            return redirect()
                ->route('admin.projects.index')
                ->with('success', 'Projeto removido com sucesso.');
        } catch (\Throwable $e) {
            report($e);

            return redirect()
                ->route('admin.projects.index')
                ->with('error', 'Erro ao remover projeto. Tente novamente.');
        }
    }

    /**
     * @return array<string, mixed>
     */
    private function formOptions(): array
    {
        return [
            'stackOptions' => Skill::stackPickerOptions(),
        ];
    }

    /**
     * @param  array<int, string>  $existingPaths
     * @param  array<int, \Illuminate\Http\UploadedFile>  $uploadedFiles
     * @return array<int, string>
     */
    private function syncImages(array $existingPaths, array $uploadedFiles): array
    {
        $paths = array_values(array_filter($existingPaths));

        foreach ($uploadedFiles as $file) {
            $extension = $file->getClientOriginalExtension() ?: 'webp';
            $filename = Str::uuid().'.'.$extension;
            $stored = $file->storeAs('projects', $filename, 'public');

            if ($stored) {
                $paths[] = $stored;
            }
        }

        return $paths;
    }

    /**
     * @param  array<int, string>  $newPaths
     */
    private function deleteRemovedImages(Project $project, array $newPaths): void
    {
        $oldPaths = $project->imagens ?? [];
        $removed = array_diff($oldPaths, $newPaths);

        foreach ($removed as $path) {
            Storage::disk('public')->delete($path);
        }
    }
}
