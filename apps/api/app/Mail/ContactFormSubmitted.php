<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactFormSubmitted extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public readonly string $senderName,
        public readonly string $senderEmail,
        public readonly ?string $subjectLine,
        public readonly string $body,
    ) {}

    public function envelope(): Envelope
    {
        $subject = $this->subjectLine
            ? "Contato: {$this->subjectLine}"
            : "Contato do site — {$this->senderName}";

        return new Envelope(
            subject: $subject,
            replyTo: [new Address($this->senderEmail, $this->senderName)],
        );
    }

    public function content(): Content
    {
        return new Content(
            text: 'emails.contact-form',
        );
    }
}
