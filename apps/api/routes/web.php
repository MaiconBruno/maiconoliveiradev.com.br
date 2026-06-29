<?php

use App\Http\Controllers\Admin\CertificationController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\EducationController;
use App\Http\Controllers\Admin\ExperienceController;
use App\Http\Controllers\Admin\ProfileController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\SeoController;
use App\Http\Controllers\Admin\SkillController;
use App\Http\Controllers\Admin\TranslateController;
use App\Http\Controllers\Admin\UploadController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Support\Facades\Route;

Route::get('/', fn () => redirect('/admin'));

Route::middleware('guest')->group(function () {
    Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('login', [AuthenticatedSessionController::class, 'store']);
});

Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');

Route::prefix('admin')->middleware(['auth'])->name('admin.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    Route::post('translate', TranslateController::class)->name('translate');
    Route::post('upload', UploadController::class)->name('upload');
    Route::get('contact/edit', [ContactController::class, 'edit'])->name('contact.edit');
    Route::put('contact', [ContactController::class, 'update'])->name('contact.update');
    Route::get('profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::resource('projects', ProjectController::class);
    Route::resource('experiences', ExperienceController::class)->except(['show']);
    Route::resource('skills', SkillController::class)->except(['show']);
    Route::resource('educations', EducationController::class);
    Route::resource('certifications', CertificationController::class);
    Route::resource('seo', SeoController::class)
        ->except(['show'])
        ->parameters(['seo' => 'seoMeta']);
});
