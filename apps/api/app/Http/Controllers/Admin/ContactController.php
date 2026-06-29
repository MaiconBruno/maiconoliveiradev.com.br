<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateContactRequest;
use App\Models\Contact;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function edit(): Response
    {
        $contact = Contact::query()->firstOrFail();

        return Inertia::render('Admin/Contact/Edit', [
            'contact' => $contact,
        ]);
    }

    public function update(UpdateContactRequest $request): RedirectResponse
    {
        $contact = Contact::query()->firstOrFail();
        $contact->update($request->validated());

        return redirect()
            ->route('admin.contact.edit')
            ->with('success', 'Contato atualizado com sucesso.');
    }
}
