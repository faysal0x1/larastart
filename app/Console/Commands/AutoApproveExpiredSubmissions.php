<?php
namespace App\Console\Commands;

use App\Models\Freelancer;
use App\Models\MicroTask;
use App\Services\BalanceService;
use App\Services\ReferralActivityService;
use Carbon\Carbon;
use function App\Helpers\notifyUsersInfo;
use function App\Helpers\notifyUsersSuccess;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class AutoApproveExpiredSubmissions extends Command
{
    protected $signature   = 'submissions:auto-approve-expired';
    protected $description = 'Auto-approve pending submissions for micro tasks that have been past their deadline for 3 days';

    protected BalanceService $balanceService;

    public function __construct(BalanceService $balanceService)
    {
        parent::__construct();
        $this->balanceService = $balanceService;
    }

    public function handle()
    {
        $this->info('Starting auto-approval of expired submissions...');

        // Find micro tasks that are past deadline for 3 days and have pending submissions
        $expiredTasks = MicroTask::where('deadline', '<', Carbon::now()->subDays(3))
            ->where('status', 'active')
            ->whereHas('completions', function ($query) {
                $query->where('status', 'pending');
            })
            ->get();

        $totalAutoApproved   = 0;
        $totalTasksProcessed = 0;

        foreach ($expiredTasks as $microTask) {
            $this->info("Processing task: {$microTask->title} (ID: {$microTask->id})");

            // Get all pending submissions for this task
            $pendingSubmissions = $microTask->completions()
                ->where('status', 'pending')
                ->get();

            $taskAutoApproved = 0;

            foreach ($pendingSubmissions as $submission) {
                try {
                    // Auto-approve the submission
                    $submission->update([
                        'status'          => 'approved',
                        'approval_reason' => 'Auto-approved: Task deadline exceeded by 3+ days',
                        'approved_at'     => now(),
                        'reviewed_at'     => now(),
                        'reviewed_by'     => null, // System auto-approval
                    ]);

                    // Add balance to freelancer
                    $freelancer = Freelancer::where('user_id', $submission->freelancer_id)->first();
                    if ($freelancer) {
                        $this->balanceService->addBalanceToFreelancer(
                            $freelancer,
                            $microTask->points_per_completion,
                            [],
                            true
                        );
                    }

                    // Process referral commission
                    $isReferred = ReferralActivityService::processTaskSubmissionCommission($submission);
                    if ($isReferred) {
                        $referrerFreelancer = Freelancer::where('user_id', $isReferred->referrer_id)->first();
                        if ($referrerFreelancer) {
                            // 5% commission from admin
                            $fivePercent = $microTask->points_per_completion * 0.05;
                            $this->balanceService->addBalanceToFreelancer(
                                $referrerFreelancer,
                                $fivePercent,
                                [],
                                true
                            );
                        }
                    }

                    // Send notification to freelancer
                    notifyUsersSuccess(
                        [$submission->freelancer_id],
                        'Submission Auto-Approved! 🎉',
                        [
                            "Your submission for '{$microTask->title}' has been auto-approved.",
                            "Reason: Task deadline exceeded by 3+ days",
                            "You have earned {$microTask->points_per_completion} points for this completion.",
                            "The points have been added to your account balance.",
                            "This was an automatic approval due to task expiration.",
                        ],
                        'View Submission',
                        route('submit.tasks')
                    );

                    // Send notification to task owner
                    notifyUsersInfo(
                        [$microTask->employer_id],
                        'Submission Auto-Approved',
                        [
                            "A submission for your task '{$microTask->title}' has been auto-approved.",
                            "Reason: Task deadline exceeded by 3+ days",
                            "The freelancer has been paid {$microTask->points_per_completion} points.",
                            "This was an automatic approval due to task expiration.",
                        ],
                        'View Task',
                        route('submit.tasks', $microTask->slug)
                    );

                    $taskAutoApproved++;
                    $totalAutoApproved++;

                    // Log the auto-approval
                    Log::info('Submission auto-approved due to expired deadline', [
                        'submission_id'  => $submission->id,
                        'micro_task_id'  => $microTask->id,
                        'freelancer_id'  => $submission->freelancer_id,
                        'employer_id'    => $microTask->employer_id,
                        'points_awarded' => $microTask->points_per_completion,
                        'deadline'       => $microTask->deadline,
                        'days_overdue'   => Carbon::now()->diffInDays($microTask->deadline),
                    ]);

                } catch (\Exception $e) {
                    Log::error('Failed to auto-approve submission', [
                        'submission_id' => $submission->id,
                        'micro_task_id' => $microTask->id,
                        'error'         => $e->getMessage(),
                    ]);
                }
            }

            // Update task status if max completions reached
            if ($taskAutoApproved > 0) {
                $approvedCount = $microTask->approvedCompletions()->count();
                if ($approvedCount >= $microTask->max_completions) {
                    $microTask->update([
                        'status'       => 'completed',
                        'completed_at' => now(),
                    ]);

                    Log::info('Micro task marked as completed due to auto-approvals', [
                        'micro_task_id'   => $microTask->id,
                        'approved_count'  => $approvedCount,
                        'max_completions' => $microTask->max_completions,
                    ]);
                }
            }

            $totalTasksProcessed++;
            $this->info("  - Auto-approved {$taskAutoApproved} submission(s)");
        }

        $this->info("Auto-approval completed!");
        $this->info("Total tasks processed: {$totalTasksProcessed}");
        $this->info("Total submissions auto-approved: {$totalAutoApproved}");

        Log::info("Auto-approval of expired submissions completed", [
            'tasks_processed'           => $totalTasksProcessed,
            'submissions_auto_approved' => $totalAutoApproved,
        ]);

        return 0;
    }
}
