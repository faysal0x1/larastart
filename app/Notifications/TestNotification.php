<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;

class TestNotification extends Notification
{
    protected string $message;

    /**
     * Create a new notification instance.
     */
    public function __construct(string $message = 'Test notification')
    {
        $this->message = $message;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }



    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'message' => $this->message,
            'type' => 'test',
            'timestamp' => now()->toISOString(),
        ];
    }

    /**
     * Get the notification's database type.
     */
    public function toDatabase(object $notifiable): array
    {
        return $this->toArray($notifiable);
    }
}
