<?php

namespace App\Services;

use App\Models\User;
use App\Notifications\GlobalNotification;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;

class GlobalNotificationService
{
    /**
     * Send notification to specific users
     */
    public function notifyUsers(array $userIds, GlobalNotification $notification): void
    {
        try {
            $users = User::whereIn('id', $userIds)->get();

            if ($users->isEmpty()) {
                            Log::warning('No users found to notify', [
                'user_ids' => $userIds,
                'notification_type' => $notification->getType()
            ]);
                return;
            }

            Notification::send($users, $notification);

            Log::info('Global notification sent to users', [
                'user_count' => $users->count(),
                'notification_type' => $notification->getType(),
                'subject' => $notification->getSubject()
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to send global notification to users', [
                'user_ids' => $userIds,
                'notification_type' => $notification->getType(),
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
        }
    }

    /**
     * Send notification to users by role
     */
    public function notifyUsersByRole(string $role, GlobalNotification $notification): void
    {
        try {
            $users = User::where('role', $role)->get();

            if ($users->isEmpty()) {
                Log::warning('No users found with role', [
                    'role' => $role,
                    'notification_type' => $notification->getType()
                ]);
                return;
            }

            Notification::send($users, $notification);

            Log::info('Global notification sent to users by role', [
                'role' => $role,
                'user_count' => $users->count(),
                'notification_type' => $notification->getType(),
                'subject' => $notification->getSubject()
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to send global notification to users by role', [
                'role' => $role,
                'notification_type' => $notification->getType(),
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
        }
    }

    /**
     * Send notification to all users
     */
    public function notifyAllUsers(GlobalNotification $notification): void
    {
        try {
            $users = User::all();

            if ($users->isEmpty()) {
                Log::warning('No users found in system');
                return;
            }

            Notification::send($users, $notification);

            Log::info('Global notification sent to all users', [
                'user_count' => $users->count(),
                'notification_type' => $notification->getType(),
                'subject' => $notification->getSubject()
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to send global notification to all users', [
                'notification_type' => $notification->getType(),
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
        }
    }

    /**
     * Send success notification
     */
    public function sendSuccessNotification(
        array $userIds,
        string $subject,
        array $lines = [],
        ?string $actionText = null,
        ?string $actionUrl = null,
        array $data = []
    ): void {
        $notification = GlobalNotification::success($subject, $lines, $actionText, $actionUrl, $data);
        $this->notifyUsers($userIds, $notification);
    }

    /**
     * Send warning notification
     */
    public function sendWarningNotification(
        array $userIds,
        string $subject,
        array $lines = [],
        ?string $actionText = null,
        ?string $actionUrl = null,
        array $data = []
    ): void {
        $notification = GlobalNotification::warning($subject, $lines, $actionText, $actionUrl, $data);
        $this->notifyUsers($userIds, $notification);
    }

    /**
     * Send error notification
     */
    public function sendErrorNotification(
        array $userIds,
        string $subject,
        array $lines = [],
        ?string $actionText = null,
        ?string $actionUrl = null,
        array $data = []
    ): void {
        $notification = GlobalNotification::error($subject, $lines, $actionText, $actionUrl, $data);
        $this->notifyUsers($userIds, $notification);
    }

    /**
     * Send info notification
     */
    public function sendInfoNotification(
        array $userIds,
        string $subject,
        array $lines = [],
        ?string $actionText = null,
        ?string $actionUrl = null,
        array $data = []
    ): void {
        $notification = GlobalNotification::info($subject, $lines, $actionText, $actionUrl, $data);
        $this->notifyUsers($userIds, $notification);
    }

    /**
     * Send notification to admins
     */
    public function notifyAdmins(GlobalNotification $notification): void
    {
        $this->notifyUsersByRole('admin', $notification);
    }

    /**
     * Send notification to employers
     */
    public function notifyEmployers(GlobalNotification $notification): void
    {
        $this->notifyUsersByRole('employer', $notification);
    }

    /**
     * Send notification to freelancers
     */
    public function notifyFreelancers(GlobalNotification $notification): void
    {
        $this->notifyUsersByRole('freelancer', $notification);
    }

    /**
     * Send system maintenance notification
     */
    public function sendSystemMaintenanceNotification(
        string $message,
        ?string $estimatedDuration = null,
        ?string $actionUrl = null
    ): void {
        $lines = ['System maintenance is scheduled.'];

        if ($estimatedDuration) {
            $lines[] = "Estimated duration: {$estimatedDuration}";
        }

        $lines[] = $message;

        $notification = GlobalNotification::warning(
            'System Maintenance Notice',
            $lines,
            'Check Status',
            $actionUrl
        );

        $this->notifyAllUsers($notification);
    }

    /**
     * Send feature update notification
     */
    public function sendFeatureUpdateNotification(
        string $featureName,
        string $description,
        ?string $actionUrl = null
    ): void {
        $notification = GlobalNotification::info(
            'New Feature Available',
            [
                "We're excited to announce a new feature: {$featureName}",
                $description,
                'Check it out and let us know what you think!'
            ],
            'Try New Feature',
            $actionUrl
        );

        $this->notifyAllUsers($notification);
    }
}
