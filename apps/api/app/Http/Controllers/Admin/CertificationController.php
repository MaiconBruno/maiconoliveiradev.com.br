<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCertificationRequest;
use App\Http\Requests\UpdateCertificationRequest;
use App\Models\Certification;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CertificationController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Certifications/Index', [
            'certifications' => Certification::query()->orderBy('ordem')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Certifications/Create');
    }

    public function store(StoreCertificationRequest $request): RedirectResponse
    {
        Certification::query()->create($request->validated());

        return redirect()
            ->route('admin.certifications.index')
            ->with('success', 'Certificação criada com sucesso.');
    }

    public function edit(Certification $certification): Response
    {
        return Inertia::render('Admin/Certifications/Edit', [
            'certification' => $certification,
        ]);
    }

    public function update(UpdateCertificationRequest $request, Certification $certification): RedirectResponse
    {
        $certification->update($request->validated());

        return redirect()
            ->route('admin.certifications.index')
            ->with('success', 'Certificação atualizada com sucesso.');
    }

    public function destroy(Certification $certification): RedirectResponse
    {
        $certification->delete();

        return redirect()
            ->route('admin.certifications.index')
            ->with('success', 'Certificação removida com sucesso.');
    }
}
