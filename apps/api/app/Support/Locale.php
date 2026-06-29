<?php

namespace App\Support;

class Locale
{
    public static function fromHeader(?string $acceptLanguage): string
    {
        if ($acceptLanguage === null) {
            return 'pt';
        }

        $primary = strtolower(trim(explode(',', $acceptLanguage)[0]));
        $primary = explode(';', $primary)[0];

        return str_starts_with($primary, 'en') ? 'en' : 'pt';
    }

    public static function resolve(mixed $value, string $locale = 'pt'): mixed
    {
        if (! is_array($value)) {
            return $value;
        }

        if (array_key_exists('pt', $value) || array_key_exists('en', $value)) {
            if (isset($value[$locale]) && $value[$locale] !== null && $value[$locale] !== '') {
                return $value[$locale];
            }

            $fallback = $locale === 'en' ? 'pt' : 'en';

            if (isset($value[$fallback]) && $value[$fallback] !== null && $value[$fallback] !== '') {
                return $value[$fallback];
            }

            return null;
        }

        return array_map(
            fn (mixed $item) => self::resolve($item, $locale),
            $value
        );
    }

    public static function resolveFields(array $data, string $locale, array $fields): array
    {
        foreach ($fields as $field) {
            if (array_key_exists($field, $data)) {
                $data[$field] = self::resolve($data[$field], $locale);
            }
        }

        return $data;
    }

    public static function pt(?string $text): array
    {
        return ['pt' => $text, 'en' => null];
    }
}
