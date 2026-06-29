<?php

use App\Http\Controllers\Api\V1\CertificationController;
use App\Http\Controllers\Api\V1\ContactController;
use App\Http\Controllers\Api\V1\EducationController;
use App\Http\Controllers\Api\V1\ExperienceController;
use App\Http\Controllers\Api\V1\ProfileController;
use App\Http\Controllers\Api\V1\ProjectController;
use App\Http\Controllers\Api\V1\SeoController;
use App\Http\Controllers\Api\V1\SkillController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::get('/projects', [ProjectController::class, 'index']);
    Route::get('/projects/{slug}', [ProjectController::class, 'show']);
    Route::get('/experiences', [ExperienceController::class, 'index']);
    Route::get('/skills', [SkillController::class, 'index']);
    Route::get('/education', [EducationController::class, 'index']);
    Route::get('/certifications', [CertificationController::class, 'index']);
    Route::get('/contact', [ContactController::class, 'show']);
    // Rate limit: 5 req/min per IP (see api-conventions.md)
    Route::post('/contact', [ContactController::class, 'store'])->middleware('throttle:5,1');
    Route::get('/seo', [SeoController::class, 'show']);
});
