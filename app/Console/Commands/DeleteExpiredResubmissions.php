<?php
namespace App\Console\Commands;

use App\Models\MicroTaskSubmission;
use Carbon\Carbon;
use function App\Helpers\notifyUsersWarning;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class DeleteExpiredResubmissions extends Command
{
    protected $signature   = 'submissions:cleanup-resubmissions';
    protected $description = 'Delete submissions with resubmission_required status that are older than 24 hours';

    public function handle()
    {
        $expiredSubmissions = MicroTaskSubmission::where('status', 'resubmission_required')
            ->where('resubmission_requested_at', '<', Carbon::now()->subDay())
            ->get();

        $deletedCount = 0;

        foreach ($expiredSubmissions as $submission) {
            try {
                // Log the deletion for tracking
                Log::info('Deleting expired resubmission', [
                    'submission_id' => $submission->id,
                    'freelancer_id' => $submission->freelancer_id,
                    'micro_task_id' => $submission->micro_task_id,
                    'requested_at'  => $submission->resubmission_requested_at,
                ]);

                // Send final notification to freelancer
                $microTask = $submission->microTask;
                if ($microTask) {
                    notifyUsersWarning(
                        [$submission->freelancer_id],
                        'Submission Expired',
                        [
                            "Your submission for '{$microTask->title}' has expired.",
                            "The 24-hour resubmission period has ended.",
                            "You can still submit a new submission for this task if available.",
                            "Please be more prompt with future resubmissions.",
                        ],
                        'View Available Tasks',
                        route('submit.tasks')
                    );
                }

                $submission->delete();
                $deletedCount++;
            } catch (\Exception $e) {
                Log::error('Failed to delete expired resubmission', [
                    'submission_id' => $submission->id,
                    'error'         => $e->getMessage(),
                ]);
            }
        }

        $this->info("Deleted {$deletedCount} expired resubmission(s)");
        Log::info("Cleanup completed: {$deletedCount} expired resubmissions deleted");

        return 0;
    }
}
