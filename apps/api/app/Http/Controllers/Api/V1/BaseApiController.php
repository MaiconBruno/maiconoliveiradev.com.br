<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Support\Locale;
use Illuminate\Http\Request;

abstract class BaseApiController extends Controller
{
    protected function locale(Request $request): string
    {
        return Locale::fromHeader($request->header('Accept-Language'));
    }

    protected function resolveRecord(array $record, string $locale, array $translatableFields): array
    {
        return Locale::resolveFields($record, $locale, $translatableFields);
    }
}
