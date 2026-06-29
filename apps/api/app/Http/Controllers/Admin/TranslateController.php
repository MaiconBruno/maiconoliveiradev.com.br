<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\DeepLTranslationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class TranslateController extends Controller
{
    public function __invoke(Request $request, DeepLTranslationService $deepL): JsonResponse
    {
        if (! $deepL->isConfigured()) {
            return response()->json([
                'error' => 'DEEPL_API_KEY não configurada. Adicione a chave no arquivo .env do Laravel (apps/api/.env).',
                'configured' => false,
            ], 503);
        }

        $data = $request->validate([
            'text' => ['nullable', 'string'],
            'fields' => ['nullable', 'array'],
            'fields.*' => ['nullable', 'string'],
        ]);

        $text = isset($data['text']) ? trim($data['text']) : '';
        $fields = $data['fields'] ?? [];

        if ($text === '' && $fields === []) {
            throw ValidationException::withMessages([
                'text' => 'Informe text ou fields para traduzir.',
            ]);
        }

        if ($text !== '') {
            $translated = $deepL->translate($text);

            if ($translated === null) {
                return response()->json([
                    'error' => 'Não foi possível traduzir o texto. Verifique a chave DeepL e tente novamente.',
                    'configured' => true,
                ], 502);
            }

            return response()->json([
                'en' => $translated,
                'configured' => true,
            ]);
        }

        $translated = [];
        $hasInput = false;
        $hasSuccess = false;

        foreach ($fields as $key => $value) {
            if (! is_string($value) || trim($value) === '') {
                $translated[$key] = '';
                continue;
            }

            $hasInput = true;
            $result = $deepL->translate($value);

            if ($result !== null && $result !== '') {
                $hasSuccess = true;
            }

            $translated[$key] = $result ?? '';
        }

        if ($hasInput && ! $hasSuccess) {
            return response()->json([
                'error' => 'Não foi possível traduzir os campos. Verifique a chave DeepL e tente novamente.',
                'configured' => true,
            ], 502);
        }

        return response()->json([
            'en' => $translated,
            'configured' => true,
        ]);
    }
}
