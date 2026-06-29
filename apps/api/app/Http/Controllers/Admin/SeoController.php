<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSeoMetaRequest;
use App\Http\Requests\UpdateSeoMetaRequest;
use App\Models\SeoMeta;
use App\Services\ImageUploadService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class SeoController extends Controller
{
    public function __construct(
        private readonly ImageUploadService $imageUpload,
    ) {}

    public function index(): Response
    {
        $seoMetas = SeoMeta::query()
            ->orderBy('rota')
            ->get()
            ->map(fn (SeoMeta $seo) => [
                'id' => $seo->id,
                'rota' => $seo->rota,
                'title' => $seo->title,
                'noindex' => $seo->noindex,
                'og_image_url' => $this->imageUpload->publicUrl($seo->og_image),
            ]);

        return Inertia::render('Admin/Seo/Index', [
            'seoMetas' => $seoMetas,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Seo/Create', [
            'suggestedRoutes' => $this->suggestedRoutes(),
        ]);
    }

    public function store(StoreSeoMetaRequest $request): RedirectResponse
    {
        $data = $this->preparePayload($request->validated());
        unset($data['remove_og_image']);

        SeoMeta::query()->create($data);

        return redirect()
            ->route('admin.seo.index')
            ->with('success', 'SEO criado com sucesso.');
    }

    public function edit(SeoMeta $seoMeta): Response
    {
        return Inertia::render('Admin/Seo/Edit', [
            'seoMeta' => [
                'id' => $seoMeta->id,
                'rota' => $seoMeta->rota,
                'title' => $seoMeta->title ?? ['pt' => '', 'en' => ''],
                'description' => $seoMeta->description ?? ['pt' => '', 'en' => ''],
                'og_title' => $seoMeta->og_title ?? ['pt' => '', 'en' => ''],
                'og_description' => $seoMeta->og_description ?? ['pt' => '', 'en' => ''],
                'og_image' => $seoMeta->og_image,
                'og_image_url' => $this->imageUpload->publicUrl($seoMeta->og_image),
                'canonical' => $seoMeta->canonical,
                'noindex' => $seoMeta->noindex,
            ],
        ]);
    }

    public function update(UpdateSeoMetaRequest $request, SeoMeta $seoMeta): RedirectResponse
    {
        $data = $this->preparePayload($request->validated());

        if ($request->boolean('remove_og_image')) {
            $this->imageUpload->delete($seoMeta->og_image);
            $data['og_image'] = null;
        } elseif (array_key_exists('og_image', $data) && $data['og_image'] !== $seoMeta->og_image) {
            $this->imageUpload->delete($seoMeta->og_image);
            $data['og_image'] = $data['og_image'] ?: null;
        }

        unset($data['remove_og_image']);

        $seoMeta->update($data);

        return redirect()
            ->route('admin.seo.index')
            ->with('success', 'SEO atualizado com sucesso.');
    }

    public function destroy(SeoMeta $seoMeta): RedirectResponse
    {
        $this->imageUpload->delete($seoMeta->og_image);
        $seoMeta->delete();

        return redirect()
            ->route('admin.seo.index')
            ->with('success', 'SEO removido com sucesso.');
    }

    /**
     * @param  array<string, mixed>  $validated
     * @return array<string, mixed>
     */
    private function preparePayload(array $validated): array
    {
        $validated['noindex'] = (bool) ($validated['noindex'] ?? false);

        foreach (['title', 'description', 'og_title', 'og_description'] as $field) {
            if (! isset($validated[$field])) {
                continue;
            }

            $validated[$field] = [
                'pt' => $validated[$field]['pt'] ?? null,
                'en' => $validated[$field]['en'] ?? null,
            ];
        }

        return $validated;
    }

    /**
     * @return list<string>
     */
    private function suggestedRoutes(): array
    {
        $existing = SeoMeta::query()->pluck('rota')->all();

        $defaults = [
            '/pt',
            '/en',
            '/pt/projetos',
            '/en/projetos',
            '/pt/sobre',
            '/en/sobre',
            '/pt/contato',
            '/en/contato',
        ];

        return array_values(array_diff($defaults, $existing));
    }
}
