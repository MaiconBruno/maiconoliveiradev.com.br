<?php

namespace App\Http\Controllers\Api\V1;

use App\Mail\ContactFormSubmitted;
use App\Models\Contact;
use App\Rules\ValidRecaptcha;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Throwable;

class ContactController extends BaseApiController
{
    public function show(): JsonResponse
    {
        $contact = Contact::query()->first();

        if (! $contact) {
            return response()->json(['message' => 'Contact not found'], 404);
        }

        return response()
            ->json($contact)
            ->header('Cache-Control', 'public, max-age=300');
    }

    /**
     * Rate limit: 5 requests per minute per IP (configure throttle middleware on route).
     */
    public function store(Request $request): JsonResponse
    {
        if ($request->filled('_honeypot')) {
            return response()->json(['message' => 'Invalid submission'], 422);
        }

        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'subject' => ['nullable', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:5000'],
            'recaptcha_token' => ['required', 'string', new ValidRecaptcha],
            '_honeypot' => ['prohibited'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $validator->validated();

        $recipient = config('mail.to.address');
        if (! is_string($recipient) || trim($recipient) === '') {
            Log::error('Contact form: MAIL_TO_ADDRESS not configured');

            return response()->json(['message' => 'Service unavailable'], 503);
        }

        try {
            Mail::to($recipient)->send(new ContactFormSubmitted(
                senderName: $data['name'],
                senderEmail: $data['email'],
                subjectLine: $data['subject'] ?? null,
                body: $data['message'],
            ));
        } catch (Throwable $e) {
            Log::error('Contact form mail failed', [
                'error' => $e->getMessage(),
                'email' => $data['email'],
            ]);

            return response()->json(['message' => 'Failed to send message'], 500);
        }

        Log::info('Contact form submission', [
            'name' => $data['name'],
            'email' => $data['email'],
            'subject' => $data['subject'] ?? null,
        ]);

        return response()->json(['message' => 'Message received'], 201);
    }
}
