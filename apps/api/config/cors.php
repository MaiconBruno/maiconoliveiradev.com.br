<?php

$origins = array_values(array_unique(array_filter([
    env('FRONTEND_URL'),
    'https://maiconoliveiradev.com.br',
    'https://www.maiconoliveiradev.com.br',
])));

if (in_array(env('APP_ENV'), ['local', 'staging'], true)) {
    $origins[] = 'http://localhost:3000';
    $origins[] = 'http://127.0.0.1:3000';
}

$originPatterns = [];
if (
    in_array(env('APP_ENV'), ['local', 'staging'], true)
    || filter_var(env('ALLOW_VERCEL_PREVIEWS', false), FILTER_VALIDATE_BOOL)
) {
    $originPatterns[] = '#^https://[\w-]+\.vercel\.app$#';
}

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Origens permitidas para o site Next.js (Vercel) consumir a API pública.
    | Previews *.vercel.app: APP_ENV local/staging ou ALLOW_VERCEL_PREVIEWS=true.
    |
    */

    'paths' => ['api/*'],

    'allowed_methods' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],

    'allowed_origins' => $origins,

    'allowed_origins_patterns' => $originPatterns,

    'allowed_headers' => ['Content-Type', 'Authorization', 'Accept-Language', 'X-Requested-With'],

    'exposed_headers' => [],

    'max_age' => 86400,

    'supports_credentials' => true,

];
