<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreExperienceRequest;
use App\Http\Requests\UpdateExperienceRequest;
use App\Models\Experience;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ExperienceController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Experiences/Index', [
            'experiences' => Experience::query()->orderBy('ordem')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Experiences/Create');
    }

    public function store(StoreExperienceRequest $request): RedirectResponse
    {
        Experience::query()->create($request->validated());

        return redirect()
            ->route('admin.experiences.index')
            ->with('success', 'Experiência criada com sucesso.');
    }

    public function edit(Experience $experience): Response
    {
        return Inertia::render('Admin/Experiences/Edit', [
            'experience' => $experience,
        ]);
    }

    public function update(UpdateExperienceRequest $request, Experience $experience): RedirectResponse
    {
        $experience->update($request->validated());

        return redirect()
            ->route('admin.experiences.index')
            ->with('success', 'Experiência atualizada com sucesso.');
    }

    public function destroy(Experience $experience): RedirectResponse
    {
        $experience->delete();

        return redirect()
            ->route('admin.experiences.index')
            ->with('success', 'Experiência removida com sucesso.');
    }
}
