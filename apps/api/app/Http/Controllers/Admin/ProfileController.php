<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateProfileRequest;
use App\Models\Profile;
use App\Services\ImageUploadService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function __construct(private ImageUploadService $uploads) {}

    public function edit(): Response
    {
        $profile = Profile::query()->firstOrFail();

        return Inertia::render('Admin/Profile/Edit', [
            'profile' => $this->formatForForm($profile),
        ]);
    }

    public function update(UpdateProfileRequest $request): RedirectResponse
    {
        $profile = Profile::query()->firstOrFail();
        $validated = $request->validated();

        $data = collect($validated)
            ->except(['curriculo_pdf_file', 'remove_curriculo_pdf'])
            ->toArray();

        if (array_key_exists('foto', $data)) {
            if ($data['foto'] === null || $data['foto'] === '') {
                $this->uploads->delete($profile->foto);
                $data['foto'] = null;
            } elseif ($profile->foto && $profile->foto !== $data['foto']) {
                $this->uploads->delete($profile->foto);
            }
        }

        if ($request->boolean('remove_curriculo_pdf') && $profile->curriculo_pdf) {
            $this->uploads->delete($profile->curriculo_pdf);
            $data['curriculo_pdf'] = null;
        } elseif ($request->hasFile('curriculo_pdf_file')) {
            if ($profile->curriculo_pdf) {
                $this->uploads->delete($profile->curriculo_pdf);
            }

            $data['curriculo_pdf'] = $request->file('curriculo_pdf_file')->store('profile', 'public');
        }

        $profile->update($data);

        return redirect()
            ->route('admin.profile.edit')
            ->with('success', 'Perfil atualizado com sucesso.');
    }

    private function formatForForm(Profile $profile): array
    {
        $data = $profile->toArray();

        $data['foto_url'] = $this->uploads->publicUrl($profile->foto);
        $data['curriculo_pdf_url'] = $this->uploads->publicUrl($profile->curriculo_pdf);

        foreach (['headline', 'modelo_trabalho', 'bio_resumo', 'bio_longa'] as $field) {
            $value = $data[$field] ?? [];
            $data[$field] = [
                'pt' => $value['pt'] ?? '',
                'en' => $value['en'] ?? '',
            ];
        }

        foreach (['cta_primario', 'cta_secundario'] as $ctaField) {
            $cta = $data[$ctaField] ?? null;

            if (! is_array($cta)) {
                $data[$ctaField] = $this->emptyCta();

                continue;
            }

            $label = $cta['label'] ?? [];

            $data[$ctaField] = [
                'label' => [
                    'pt' => $label['pt'] ?? '',
                    'en' => $label['en'] ?? '',
                ],
                'url' => $cta['url'] ?? '',
                'externo' => (bool) ($cta['externo'] ?? false),
            ];
        }

        return $data;
    }

    private function emptyCta(): array
    {
        return [
            'label' => ['pt' => '', 'en' => ''],
            'url' => '',
            'externo' => false,
        ];
    }
}
