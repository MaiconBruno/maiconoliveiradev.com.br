<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class RecaptchaService
{
    public function verify(string $token, ?string $remoteIp = null): bool
    {
        $secret = config('services.recaptcha.secret');

        if (empty($secret)) {
            return app()->environment('local');
        }

        $response = Http::asForm()
            ->timeout(10)
            ->post('https://www.google.com/recaptcha/api/siteverify', array_filter([
                'secret' => $secret,
                'response' => $token,
                'remoteip' => $remoteIp,
            ]));

        if (! $response->ok()) {
            return false;
        }

        return ($response->json('success') ?? false) === true;
    }
}
