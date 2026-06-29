<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Certification;
use App\Models\Contact;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Profile;
use App\Models\Project;
use App\Models\SeoMeta;
use App\Models\Skill;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'projects' => Project::query()->count(),
                'projectsPublished' => Project::query()->where('status', 'published')->count(),
                'experiences' => Experience::query()->count(),
                'experiencesPublished' => Experience::query()->where('publicado', true)->count(),
                'skills' => Skill::query()->count(),
                'certifications' => Certification::query()->count(),
                'education' => Education::query()->count(),
                'seo' => SeoMeta::query()->count(),
                'profileConfigured' => Profile::query()->exists(),
                'contactConfigured' => Contact::query()->exists(),
            ],
        ]);
    }
}
