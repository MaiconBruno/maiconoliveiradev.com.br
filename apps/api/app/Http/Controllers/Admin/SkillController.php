<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSkillRequest;
use App\Http\Requests\UpdateSkillRequest;
use App\Models\Skill;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class SkillController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Skills/Index', [
            'skills' => Skill::query()->orderBy('categoria')->orderBy('ordem')->get(),
            'categoryLabels' => Skill::categoryLabels(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Skills/Create', $this->formOptions());
    }

    public function store(StoreSkillRequest $request): RedirectResponse
    {
        Skill::query()->create($request->validated());

        return redirect()
            ->route('admin.skills.index')
            ->with('success', 'Skill criada com sucesso.');
    }

    public function edit(Skill $skill): Response
    {
        return Inertia::render('Admin/Skills/Edit', [
            'skill' => $skill,
            ...$this->formOptions(),
        ]);
    }

    public function update(UpdateSkillRequest $request, Skill $skill): RedirectResponse
    {
        $skill->update($request->validated());

        return redirect()
            ->route('admin.skills.index')
            ->with('success', 'Skill atualizada com sucesso.');
    }

    public function destroy(Skill $skill): RedirectResponse
    {
        $skill->delete();

        return redirect()
            ->route('admin.skills.index')
            ->with('success', 'Skill removida com sucesso.');
    }

    /**
     * @return array<string, mixed>
     */
    private function formOptions(): array
    {
        return [
            'categoryLabels' => Skill::categoryLabels(),
            'nivelLabels' => Skill::nivelLabels(),
        ];
    }
}
