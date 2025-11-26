<?php
namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Str;

class PasswordResetMail extends Mailable
{
    use Queueable, SerializesModels;

    public $otp;
    public $resetUrl;

    public function __construct($otp)
    {
        $this->otp      = $otp;
        $this->resetUrl = route('password.reset', [
            'token' => Str::random(64),
            'email' => request()->email,
        ]);
    }

    public function build()
    {
        return $this->subject('Password Reset Request')
            ->markdown('emails.password-reset', [
                'otp'      => $this->otp,
                'resetUrl' => $this->resetUrl,
            ]);
    }
}