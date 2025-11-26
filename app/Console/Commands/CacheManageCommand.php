<?php
namespace App\Console\Commands;

use App\Services\SmartCacheService;
use Illuminate\Console\Command;

class CacheManageCommand extends Command
{
    protected $signature = 'cache:manage
                            {action : Action to perform (status|clear|flush|stats)}
                            {--type= : Cache type to target (home|products|categories|brands|deals)}
                            {--key= : Specific cache key to target}';

    protected $description = 'Manage the smart cache system';

    public function handle(): int
    {
        $action = $this->argument('action');
        $type   = $this->option('type');
        $key    = $this->option('key');

        switch ($action) {
            case 'status':
                return $this->showStatus();
            case 'clear':
                return $this->clearCache($type, $key);
            case 'flush':
                return $this->flushCache($type);
            case 'stats':
                return $this->showStats();
            default:
                $this->error("Unknown action: {$action}");
                return Command::FAILURE;
        }
    }

    private function showStatus(): int
    {
        $this->info('🔍 Smart Cache System Status');
        $this->newLine();

        $stats = SmartCacheService::getStats();

        $this->table(
            ['Property', 'Value'],
            [
                ['Cache Driver', $stats['driver']],
                ['Available Types', count($stats['available_types'])],
            ]
        );

        $this->newLine();
        $this->info('📊 Cache Types & TTL:');
        foreach ($stats['ttl_config'] as $type => $ttl) {
            $this->line("  <comment>{$type}:</comment> " . $this->formatTtl($ttl));
        }

        $this->newLine();
        $this->info('💡 Usage Examples:');
        $this->line('  php artisan cache:manage clear --type=products');
        $this->line('  php artisan cache:manage flush');
        $this->line('  php artisan cache:manage stats');

        return Command::SUCCESS;
    }

    private function clearCache(?string $type, ?string $key): int
    {
        if ($type && $key) {
            SmartCacheService::forget($type, $key);
            $this->info("✅ Cleared cache: {$type}:{$key}");
        } elseif ($type) {
            SmartCacheService::flush($type);
            $this->info("✅ Cleared all {$type} caches");
        } else {
            SmartCacheService::flushAll();
            $this->info("✅ Cleared all caches");
        }

        return Command::SUCCESS;
    }

    private function flushCache(?string $type): int
    {
        if ($type) {
            SmartCacheService::flush($type);
            $this->info("✅ Flushed {$type} caches");
        } else {
            SmartCacheService::flushAll();
            $this->info("✅ Flushed all caches");
        }

        return Command::SUCCESS;
    }

    private function showStats(): int
    {
        $this->info('📈 Cache Statistics');
        $this->newLine();

        $stats = SmartCacheService::getStats();

        $this->table(
            ['Type', 'TTL', 'Description'],
            [
                ['home', $this->formatTtl($stats['ttl_config']['home']), 'Home page data'],
                ['products', $this->formatTtl($stats['ttl_config']['products']), 'Product listings'],
                ['categories', $this->formatTtl($stats['ttl_config']['categories']), 'Category data'],
                ['brands', $this->formatTtl($stats['ttl_config']['brands']), 'Brand data'],
                ['deals', $this->formatTtl($stats['ttl_config']['deals']), 'Deal data'],
                ['users', $this->formatTtl($stats['ttl_config']['users']), 'User data'],
                ['orders', $this->formatTtl($stats['ttl_config']['orders']), 'Order data'],
                ['cart', $this->formatTtl($stats['ttl_config']['cart']), 'Cart data'],
                ['search', $this->formatTtl($stats['ttl_config']['search']), 'Search results'],
                ['static', $this->formatTtl($stats['ttl_config']['static']), 'Static content'],
            ]
        );

        return Command::SUCCESS;
    }

    private function formatTtl(int $seconds): string
    {
        if ($seconds < 60) {
            return "{$seconds}s";
        } elseif ($seconds < 3600) {
            return round($seconds / 60) . 'm';
        } else {
            return round($seconds / 3600) . 'h';
        }
    }
}
