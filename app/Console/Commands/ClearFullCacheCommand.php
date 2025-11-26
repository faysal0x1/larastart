<?php

namespace App\Console\Commands;

use App\Modules\Cache\Services\SmartCacheService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;

class ClearFullCacheCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'cache:clear-full
                            {--smart : Only clear SmartCacheService caches}
                            {--laravel : Only clear Laravel application cache}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clear all caches (SmartCacheService and Laravel application cache)';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $smartOnly = $this->option('smart');
        $laravelOnly = $this->option('laravel');

        $this->info('🗑️  Clearing caches...');
        $this->newLine();

        try {
            if (!$laravelOnly) {
                // Clear SmartCacheService caches
                SmartCacheService::flushAll();
                $this->info('✅ Cleared all SmartCacheService caches');
            }

            if (!$smartOnly) {
                // Clear Laravel application cache
                Cache::flush();
                $this->info('✅ Cleared Laravel application cache');
            }

            // Also clear config, route, and view caches
            if (!$smartOnly) {
                $this->call('config:clear');
                $this->call('route:clear');
                $this->call('view:clear');
                $this->info('✅ Cleared config, route, and view caches');
            }

            $this->newLine();
            $this->info('🎉 All caches cleared successfully!');

            return Command::SUCCESS;
        } catch (\Exception $e) {
            $this->error('❌ Error clearing caches: ' . $e->getMessage());
            return Command::FAILURE;
        }
    }
}

