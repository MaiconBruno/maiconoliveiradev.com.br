<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Support\Facades\Log;

class DeepLTranslationService
{
    private Client $client;

    public function __construct(?Client $client = null)
    {
        $baseUrl = config('services.deepl.url', 'https://api-free.deepl.com');

        $this->client = $client ?? new Client([
            'base_uri' => rtrim($baseUrl, '/').'/v2/',
            'timeout' => 15,
        ]);
    }

    public function isConfigured(): bool
    {
        return ! empty(config('services.deepl.key'));
    }

    /**
     * @param  array<string, string|null>  $field
     * @return array<string, string|null>
     */
    public function translateField(array $field, string $sourceLang = 'PT', string $targetLang = 'EN'): array
    {
        if (empty($field['pt'])) {
            return $field;
        }

        $field['en'] = $this->translate($field['pt'], $sourceLang, $targetLang);

        return $field;
    }

    public function translate(string $text, string $sourceLang = 'PT', string $targetLang = 'EN'): ?string
    {
        $apiKey = config('services.deepl.key');

        if (empty($apiKey)) {
            Log::warning('DEEPL_API_KEY not configured');

            return null;
        }

        try {
            $response = $this->client->post('translate', [
                'headers' => [
                    'Authorization' => 'DeepL-Auth-Key '.$apiKey,
                ],
                'form_params' => [
                    'text' => $text,
                    'source_lang' => strtoupper($sourceLang),
                    'target_lang' => strtoupper($targetLang),
                ],
            ]);

            $payload = json_decode((string) $response->getBody(), true);

            return $payload['translations'][0]['text'] ?? null;
        } catch (GuzzleException $e) {
            Log::error('DeepL translation failed', ['message' => $e->getMessage()]);

            return null;
        }
    }
}
