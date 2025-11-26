<?php
namespace App\Console\Commands;

use App\Modules\ModuleManager;
use Illuminate\Console\Command;

class ModuleStatusCommand extends Command
{
    protected $signature = 'module:status {--detailed : Show detailed information}';

    protected $description = 'Show the status of all modules';

    public function handle(): int
    {
        $this->info('🔍 Module Status');
        $this->newLine();

        $status = ModuleManager::getStatus();

        if ($this->option('detailed')) {
            $this->showDetailedStatus($status);
        } else {
            $this->showBasicStatus($status);
        }

        return Command::SUCCESS;
    }

    private function showBasicStatus(array $status): void
    {
        $rows = [];
        foreach ($status as $moduleName => $moduleStatus) {
            $rows[] = [
                $moduleName,
                $moduleStatus['enabled'] ? '✅ Enabled' : '❌ Disabled',
                $moduleStatus['loaded'] ? '✅ Loaded' : '❌ Not Loaded',
                $moduleStatus['exists'] ? '✅ Exists' : '❌ Missing',
            ];
        }

        $this->table(
            ['Module', 'Enabled', 'Loaded', 'Exists'],
            $rows
        );
    }

    private function showDetailedStatus(array $status): void
    {
        $this->info('📊 Detailed Module Information');
        $this->newLine();

        foreach ($status as $moduleName => $moduleStatus) {
            $this->line("<comment>{$moduleName}:</comment>");
            $this->line("  Class: {$moduleStatus['class']}");
            $this->line("  Enabled: " . ($moduleStatus['enabled'] ? 'Yes' : 'No'));
            $this->line("  Auto Register: " . ($moduleStatus['auto_register'] ? 'Yes' : 'No'));
            $this->line("  Loaded: " . ($moduleStatus['loaded'] ? 'Yes' : 'No'));
            $this->line("  Exists: " . ($moduleStatus['exists'] ? 'Yes' : 'No'));
            $this->newLine();
        }

        $this->info('💡 Module Management Commands:');
        $this->line('  php artisan module:status --detailed');
        $this->line('  php artisan cache:manage status');
        $this->line('  php artisan cache:warmup');
    }
}
