<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;

class GlobalNotification extends Notification
{
    protected string $type;
    protected string $subject;
    protected string $greeting;
    protected array $lines;
    protected ?string $actionText;
    protected ?string $actionUrl;
    protected ?string $salutation;
    protected array $data;

    /**
     * Create a new notification instance.
     */
    public function __construct(
        string $type,
        string $subject,
        string $greeting = 'Hello',
        array $lines = [],
        ?string $actionText = null,
        ?string $actionUrl = null,
        ?string $salutation = 'Best regards, JobConnect Team',
        array $data = []
    ) {
        $this->type = $type;
        $this->subject = $subject;
        $this->greeting = $greeting;
        $this->lines = $lines;
        $this->actionText = $actionText;
        $this->actionUrl = $actionUrl;
        $this->salutation = $salutation;
        $this->data = $data;
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
        $baseData = [
            'type' => $this->type,
            'subject' => $this->subject,
            'greeting' => $this->greeting,
            'lines' => $this->lines,
            'action_text' => $this->actionText,
            'action_url' => $this->actionUrl,
            'salutation' => $this->salutation,
            'created_at' => now()->toISOString(),
        ];

        return array_merge($baseData, $this->data);
    }

    /**
     * Get the notification's database type.
     */
    public function toDatabase(object $notifiable): array
    {
        return $this->toArray($notifiable);
    }

    /**
     * Get notification type
     */
    public function getType(): string
    {
        return $this->type;
    }

    /**
     * Get notification subject
     */
    public function getSubject(): string
    {
        return $this->subject;
    }

    /**
     * Static factory method for common notification types
     */
    public static function success(
        string $subject,
        array $lines = [],
        ?string $actionText = null,
        ?string $actionUrl = null,
        array $data = []
    ): self {
        return new self(
            'success',
            $subject,
            'Hello',
            $lines,
            $actionText,
            $actionUrl,
            'Best regards, JobConnect Team',
            $data
        );
    }

    /**
     * Static factory method for warning notifications
     */
    public static function warning(
        string $subject,
        array $lines = [],
        ?string $actionText = null,
        ?string $actionUrl = null,
        array $data = []
    ): self {
        return new self(
            'warning',
            $subject,
            'Hello',
            $lines,
            $actionText,
            $actionUrl,
            'Best regards, JobConnect Team',
            $data
        );
    }

    /**
     * Static factory method for error notifications
     */
    public static function error(
        string $subject,
        array $lines = [],
        ?string $actionText = null,
        ?string $actionUrl = null,
        array $data = []
    ): self {
        return new self(
            'error',
            $subject,
            'Hello',
            $lines,
            $actionText,
            $actionUrl,
            'Best regards, JobConnect Team',
            $data
        );
    }

    /**
     * Static factory method for info notifications
     */
    public static function info(
        string $subject,
        array $lines = [],
        ?string $actionText = null,
        ?string $actionUrl = null,
        array $data = []
    ): self {
        return new self(
            'info',
            $subject,
            'Hello',
            $lines,
            $actionText,
            $actionUrl,
            'Best regards, JobConnect Team',
            $data
        );
    }
}
