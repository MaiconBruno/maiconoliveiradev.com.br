<?php

namespace App\Rules;

use App\Services\RecaptchaService;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ValidRecaptcha implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (! is_string($value) || trim($value) === '') {
            $fail('Recaptcha verification is required.');

            return;
        }

        $service = app(RecaptchaService::class);

        if (! $service->verify($value, request()->ip())) {
            $fail('Recaptcha verification failed.');
        }
    }
}
