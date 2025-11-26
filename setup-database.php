<?php

/**
 * Interactive database setup script
 * Prompts user for database credentials and updates .env file
 */

if (php_sapi_name() !== 'cli') {
    die('This script can only be run from the command line.');
}

// Check if readline is available, if not use fgets as fallback
if (! function_exists('readline')) {
    function readline($prompt = '')
    {
        echo $prompt;
        return fgets(STDIN);
    }
}

$envFile = '.env';

if (! file_exists($envFile)) {
    if (file_exists('.env.example')) {
        copy('.env.example', $envFile);
        echo "✅ Created .env file from .env.example\n";
    } else {
        die("❌ Error: .env file not found and .env.example doesn't exist.\n");
    }
}

echo "\n";
echo "═══════════════════════════════════════════════════════════\n";
echo "  Database Configuration Setup\n";
echo "═══════════════════════════════════════════════════════════\n";
echo "\n";
echo "You can skip this setup by pressing Ctrl+C and manually edit .env file.\n";
echo "\n";

// Read current .env file
$envContent = file_get_contents($envFile);

// Prompt for database type
echo "Select database type:\n";
echo "  1) MySQL/MariaDB\n";
echo "  2) PostgreSQL\n";
echo "  3) SQLite\n";
echo "\n";
$dbTypeChoice = readline("Enter choice [1-3] (default: 1): ");
$dbTypeChoice = trim($dbTypeChoice) ?: '1';

$dbType = match ($dbTypeChoice) {
    '2'     => 'pgsql',
    '3'     => 'sqlite',
    default => 'mysql',
};

// Update DB_CONNECTION
$envContent = preg_replace('/^DB_CONNECTION=.*/m', "DB_CONNECTION={$dbType}", $envContent);

if ($dbType === 'sqlite') {
    // SQLite setup
    echo "\n✅ SQLite selected. Database file will be created at: database/database.sqlite\n";

    // Ensure database directory exists
    if (! is_dir('database')) {
        mkdir('database', 0755, true);
    }

    // Create SQLite database file if it doesn't exist
    $sqlitePath = 'database/database.sqlite';
    if (! file_exists($sqlitePath)) {
        touch($sqlitePath);
        echo "✅ Created SQLite database file\n";
    }

    // Update .env for SQLite
    $envContent = preg_replace('/^DB_DATABASE=.*/m', "DB_DATABASE={$sqlitePath}", $envContent);
    $envContent = preg_replace('/^DB_HOST=.*/m', "DB_HOST=127.0.0.1", $envContent);
    $envContent = preg_replace('/^DB_PORT=.*/m', "DB_PORT=3306", $envContent);
    $envContent = preg_replace('/^DB_USERNAME=.*/m', "DB_USERNAME=", $envContent);
    $envContent = preg_replace('/^DB_PASSWORD=.*/m', "DB_PASSWORD=", $envContent);

} else {
    // MySQL/PostgreSQL setup
    echo "\n";
    echo "Enter database credentials:\n";
    echo "\n";

    // Database name
    $dbName = readline("Database name (default: laravel): ");
    $dbName = trim($dbName) ?: 'laravel';

    // Host
    $dbHost = readline("Database host (default: 127.0.0.1): ");
    $dbHost = trim($dbHost) ?: '127.0.0.1';

    // Port
    $defaultPort = $dbType === 'pgsql' ? '5432' : '3306';
    $dbPort      = readline("Database port (default: {$defaultPort}): ");
    $dbPort      = trim($dbPort) ?: $defaultPort;

    // Username
    $dbUsername = readline("Database username (default: root): ");
    $dbUsername = trim($dbUsername) ?: 'root';

    // Password (with Windows compatibility)
    echo "Database password: ";
    if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
        // Windows: password will be visible (limitation)
        $dbPassword = readline('');
    } else {
        // Unix/Linux: hide password
        system('stty -echo');
        $dbPassword = readline('');
        system('stty echo');
        echo "\n";
    }
    $dbPassword = trim($dbPassword);

    // Update .env file
    $envContent = preg_replace('/^DB_DATABASE=.*/m', "DB_DATABASE={$dbName}", $envContent);
    $envContent = preg_replace('/^DB_HOST=.*/m', "DB_HOST={$dbHost}", $envContent);
    $envContent = preg_replace('/^DB_PORT=.*/m', "DB_PORT={$dbPort}", $envContent);
    $envContent = preg_replace('/^DB_USERNAME=.*/m', "DB_USERNAME={$dbUsername}", $envContent);
    $envContent = preg_replace('/^DB_PASSWORD=.*/m', "DB_PASSWORD={$dbPassword}", $envContent);

    echo "\n";
    echo "✅ Database credentials configured:\n";
    echo "   Type: {$dbType}\n";
    echo "   Database: {$dbName}\n";
    echo "   Host: {$dbHost}\n";
    echo "   Port: {$dbPort}\n";
    echo "   Username: {$dbUsername}\n";
}

// Write updated .env file
file_put_contents($envFile, $envContent);

echo "\n";
echo "✅ .env file updated successfully!\n";
echo "\n";
