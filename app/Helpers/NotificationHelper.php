<?php

namespace App\Helpers;

use App\Models\MicroTask;
use App\Models\User;
use App\Notifications\GlobalNotification;
use App\Notifications\JobNotification;
use App\Services\GlobalNotificationService;
use App\Services\JobNotificationService;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Log;

/**
 * Notification Helper Functions
 *
 * This helper provides easy-to-use functions for sending notifications
 * without needing to inject services into controllers.
 */

/**
 * Send job notification to admin when new job is posted
 */
function notifyAdminAboutNewJob(MicroTask $job): void
{
    try {
        $service = App::make(JobNotificationService::class);
        $service->notifyAdminAboutNewJob($job);
    } catch (\Exception $e) {
        Log::error('Failed to send admin notification about new job', [
            'job_id' => $job->id,
            'error' => $e->getMessage()
        ]);
    }
}

/**
 * Send job status notification to employer
 */
function notifyEmployerAboutJobStatus(MicroTask $job, string $status, ?string $reason = null): void
{
    try {
        $service = App::make(JobNotificationService::class);
        $service->notifyEmployerAboutJobStatus($job, $status, $reason);
    } catch (\Exception $e) {
        Log::error('Failed to send employer notification about job status', [
            'job_id' => $job->id,
            'status' => $status,
            'error' => $e->getMessage()
        ]);
    }
}

/**
 * Handle job status change with notifications
 */
function handleJobStatusChange(MicroTask $job, string $oldStatus, string $newStatus, ?string $reason = null): void
{
    try {
        $service = App::make(JobNotificationService::class);
        $service->handleJobStatusChange($job, $oldStatus, $newStatus, $reason);
    } catch (\Exception $e) {
        Log::error('Failed to handle job status change notification', [
            'job_id' => $job->id,
            'old_status' => $oldStatus,
            'new_status' => $newStatus,
            'error' => $e->getMessage()
        ]);
    }
}

/**
 * Send success notification to specific users
 */
function notifyUsersSuccess(array $userIds, string $subject, array $lines = [], ?string $actionText = null, ?string $actionUrl = null): void
{
    try {
        $service = App::make(GlobalNotificationService::class);
        $service->sendSuccessNotification($userIds, $subject, $lines, $actionText, $actionUrl);
    } catch (\Exception $e) {
        Log::error('Failed to send success notification', [
            'user_ids' => $userIds,
            'subject' => $subject,
            'error' => $e->getMessage()
        ]);
    }
}

/**
 * Send warning notification to specific users
 */
function notifyUsersWarning(array $userIds, string $subject, array $lines = [], ?string $actionText = null, ?string $actionUrl = null): void
{
    try {
        $service = App::make(GlobalNotificationService::class);
        $service->sendWarningNotification($userIds, $subject, $lines, $actionText, $actionUrl);
    } catch (\Exception $e) {
        Log::error('Failed to send warning notification', [
            'user_ids' => $userIds,
            'subject' => $subject,
            'error' => $e->getMessage()
        ]);
    }
}

/**
 * Send error notification to specific users
 */
function notifyUsersError(array $userIds, string $subject, array $lines = [], ?string $actionText = null, ?string $actionUrl = null): void
{
    try {
        $service = App::make(GlobalNotificationService::class);
        $service->sendErrorNotification($userIds, $subject, $lines, $actionText, $actionUrl);
    } catch (\Exception $e) {
        Log::error('Failed to send error notification', [
            'user_ids' => $userIds,
            'subject' => $subject,
            'error' => $e->getMessage()
        ]);
    }
}

/**
 * Send info notification to specific users
 */
function notifyUsersInfo(array $userIds, string $subject, array $lines = [], ?string $actionText = null, ?string $actionUrl = null): void
{
    try {
        $service = App::make(GlobalNotificationService::class);
        $service->sendInfoNotification($userIds, $subject, $lines, $actionText, $actionUrl);
    } catch (\Exception $e) {
        Log::error('Failed to send info notification', [
            'user_ids' => $userIds,
            'subject' => $subject,
            'error' => $e->getMessage()
        ]);
    }
}

/**
 * Send notification to all admins
 */
function notifyAdmins(GlobalNotification $notification): void
{
    try {
        $service = App::make(GlobalNotificationService::class);
        $service->notifyAdmins($notification);
    } catch (\Exception $e) {
        Log::error('Failed to send notification to admins', [
            'error' => $e->getMessage()
        ]);
    }
}

/**
 * Send notification to all employers
 */
function notifyEmployers(GlobalNotification $notification): void
{
    try {
        $service = App::make(GlobalNotificationService::class);
        $service->notifyEmployers($notification);
    } catch (\Exception $e) {
        Log::error('Failed to send notification to employers', [
            'error' => $e->getMessage()
        ]);
    }
}

/**
 * Send notification to all freelancers
 */
function notifyFreelancers(GlobalNotification $notification): void
{
    try {
        $service = App::make(GlobalNotificationService::class);
        $service->notifyFreelancers($notification);
    } catch (\Exception $e) {
        Log::error('Failed to send notification to freelancers', [
            'error' => $e->getMessage()
        ]);
    }
}

/**
 * Send notification to all users
 */
function notifyAllUsers(GlobalNotification $notification): void
{
    try {
        $service = App::make(GlobalNotificationService::class);
        $service->notifyAllUsers($notification);
    } catch (\Exception $e) {
        Log::error('Failed to send notification to all users', [
            'error' => $e->getMessage()
        ]);
    }
}

/**
 * Send system maintenance notification to all users
 */
function notifySystemMaintenance(string $message, ?string $estimatedDuration = null, ?string $actionUrl = null): void
{
    try {
        $service = App::make(GlobalNotificationService::class);
        $service->sendSystemMaintenanceNotification($message, $estimatedDuration, $actionUrl);
    } catch (\Exception $e) {
        Log::error('Failed to send system maintenance notification', [
            'message' => $message,
            'error' => $e->getMessage()
        ]);
    }
}

/**
 * Send feature update notification to all users
 */
function notifyFeatureUpdate(string $featureName, string $description, ?string $actionUrl = null): void
{
    try {
        $service = App::make(GlobalNotificationService::class);
        $service->sendFeatureUpdateNotification($featureName, $description, $actionUrl);
    } catch (\Exception $e) {
        Log::error('Failed to send feature update notification', [
            'feature_name' => $featureName,
            'error' => $e->getMessage()
        ]);
    }
}

/**
 * Send welcome notification to new user
 */
function notifyWelcomeUser(User $user): void
{
    $lines = [
        "Welcome to JobConnect, {$user->name}!",
        "We're excited to have you on board.",
        "Complete your profile to get started with finding or posting jobs."
    ];

    notifyUsersSuccess(
        [$user->id],
        'Welcome to JobConnect!',
        $lines,
        'Complete Profile',
        route('profile.edit')
    );
}

/**
 * Send job completion notification to employer
 */
function notifyJobCompleted(MicroTask $job): void
{
    notifyEmployerAboutJobStatus($job, 'completed');
}

/**
 * Send job approval notification to employer
 */
function notifyJobApproved(MicroTask $job): void
{
    notifyEmployerAboutJobStatus($job, 'approved');
}

/**
 * Send job rejection notification to employer
 */
function notifyJobRejected(MicroTask $job, string $reason): void
{
    notifyEmployerAboutJobStatus($job, 'rejected', $reason);
}

/**
 * Send job pause notification to employer
 */
function notifyJobPaused(MicroTask $job, string $reason): void
{
    notifyEmployerAboutJobStatus($job, 'paused', $reason);
}

/**
 * Send balance low warning to user
 */
function notifyLowBalance(User $user, float $currentBalance, float $threshold = 10.0): void
{
    $lines = [
        "Your account balance is running low.",
        "Current balance: $" . number_format($currentBalance, 2),
        "Please add funds to continue using our services."
    ];

    notifyUsersWarning(
        [$user->id],
        'Low Balance Warning',
        $lines,
        'Add Funds',
        route('balance.add')
    );
}

/**
 * Send payment success notification
 */
function notifyPaymentSuccess(User $user, float $amount, string $description): void
{
    $lines = [
        "Payment processed successfully!",
        "Amount: $" . number_format($amount, 2),
        "Description: {$description}",
        "Your account has been updated."
    ];

    notifyUsersSuccess(
        [$user->id],
        'Payment Successful',
        $lines,
        'View Transaction',
        route('transactions.index')
    );
}

/**
 * Send account verification notification
 */
function notifyAccountVerified(User $user): void
{
    $lines = [
        "Congratulations! Your account has been verified.",
        "You now have access to all platform features.",
        "Start posting jobs or applying for opportunities!"
    ];

    notifyUsersSuccess(
        [$user->id],
        'Account Verified!',
        $lines,
        'Get Started',
        route('dashboard')
    );
}

/**
 * Send security alert notification
 */
function notifySecurityAlert(User $user, string $alertType, string $description): void
{
    $lines = [
        "Security Alert: {$alertType}",
        $description,
        "If this wasn't you, please contact support immediately."
    ];

    notifyUsersError(
        [$user->id],
        'Security Alert',
        $lines,
                        'Contact Support',
                route('contact')
    );
}

/**
 * Send reminder notification
 */
function notifyReminder(User $user, string $title, array $lines, ?string $actionText = null, ?string $actionUrl = null): void
{
    notifyUsersInfo(
        [$user->id],
        $title,
        $lines,
        $actionText,
        $actionUrl
    );
}

/**
 * Send bulk notification to multiple users
 */
function notifyBulkUsers(array $userIds, string $type, string $subject, array $lines, ?string $actionText = null, ?string $actionUrl = null): void
{
    switch ($type) {
        case 'success':
            notifyUsersSuccess($userIds, $subject, $lines, $actionText, $actionUrl);
            break;
        case 'warning':
            notifyUsersWarning($userIds, $subject, $lines, $actionText, $actionUrl);
            break;
        case 'error':
            notifyUsersError($userIds, $subject, $lines, $actionText, $actionUrl);
            break;
        case 'info':
            notifyUsersInfo($userIds, $subject, $lines, $actionText, $actionUrl);
            break;
        default:
            notifyUsersInfo($userIds, $subject, $lines, $actionText, $actionUrl);
    }
}

/**
 * Send notification to users by role
 */
function notifyUsersByRole(string $role, string $type, string $subject, array $lines, ?string $actionText = null, ?string $actionUrl = null): void
{
    $users = User::where('role', $role)->pluck('id')->toArray();

    if (!empty($users)) {
        notifyBulkUsers($users, $type, $subject, $lines, $actionText, $actionUrl);
    }
}
