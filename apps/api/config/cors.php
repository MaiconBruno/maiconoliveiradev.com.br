<?php

$normalizeOrigin = static fn (?string $url): ?string => $url
    ? rtrim(trim($url), '/')
    : null;

$fromEnv = array_filter(array_map(
    $normalizeOrigin,
    explode(',', (string) env('FRONTEND_URLS', env('FRONTEND_URL', '')))
));

$origins = array_values(array_unique(array_filter([
    ...$fromEnv,
    'https://maiconoliveiradev.com.br',
    'https://www.maiconoliveiradev.com.br',
])));

$originPatterns = [];
if (
    in_array(env('APP_ENV'), ['local', 'staging'], true)
    || filter_var(env('ALLOW_VERCEL_PREVIEWS', false), FILTER_VALIDATE_BOOL)
) {
    $originPatterns[] = '#^https://[\w-]+\.vercel\.app$#';
}

if (in_array(env('APP_ENV'), ['local', 'staging'], true)) {
    $origins[] = 'http://localhost:3000';
    $origins[] = 'http://127.0.0.1:3000';
}

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Apenas origens explícitas — sem wildcard (*).
    | FRONTEND_URL ou FRONTEND_URLS (vírgula) no .env.
    | Após alterar: php artisan config:clear && php artisan config:cache
    |
    */

    'paths' => ['api/*'],

    'allowed_methods' => ['GET', 'POST', 'OPTIONS'],

    'allowed_origins' => $origins,

    'allowed_origins_patterns' => $originPatterns,

    'allowed_headers' => [
        'Content-Type',
        'Accept',
        'Accept-Language',
        'X-Requested-With',
    ],

    'exposed_headers' => [],

    'max_age' => 86400,

    'supports_credentials' => false,

];
