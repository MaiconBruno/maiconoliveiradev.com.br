<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEducationRequest;
use App\Http\Requests\UpdateEducationRequest;
use App\Models\Education;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class EducationController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Education/Index', [
            'educations' => Education::query()->orderBy('ordem')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Education/Create');
    }

    public function store(StoreEducationRequest $request): RedirectResponse
    {
        Education::query()->create($request->validated());

        return redirect()
            ->route('admin.educations.index')
            ->with('success', 'Formação criada com sucesso.');
    }

    public function edit(Education $education): Response
    {
        return Inertia::render('Admin/Education/Edit', [
            'education' => $education,
        ]);
    }

    public function update(UpdateEducationRequest $request, Education $education): RedirectResponse
    {
        $education->update($request->validated());

        return redirect()
            ->route('admin.educations.index')
            ->with('success', 'Formação atualizada com sucesso.');
    }

    public function destroy(Education $education): RedirectResponse
    {
        $education->delete();

        return redirect()
            ->route('admin.educations.index')
            ->with('success', 'Formação removida com sucesso.');
    }
}
