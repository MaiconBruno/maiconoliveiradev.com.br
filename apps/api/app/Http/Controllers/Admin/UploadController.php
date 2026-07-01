<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\ImageUploadService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use InvalidArgumentException;

class UploadController extends Controller
{
    public function __invoke(Request $request, ImageUploadService $uploadService): JsonResponse
    {
        $data = $request->validate([
            'file' => ['required', 'file'],
            'folder' => ['required', 'string', 'in:'.implode(',', ImageUploadService::ALLOWED_FOLDERS)],
            'allow_video' => ['sometimes', 'boolean'],
        ]);

        try {
            $result = $uploadService->store(
                $data['file'],
                $data['folder'],
                $request->boolean('allow_video')
            );
        } catch (InvalidArgumentException $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }

        return response()->json($result);
    }
}
