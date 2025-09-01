<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class GenerateModelRelationshipsCommand extends Command
{
    protected $signature = 'make:model-relations {model?} {--all : Generate all models with relations}';

    protected $description = 'Generate Laravel models with proper relationships based on migration files';

    protected $migrationsPath;

    protected $modelsPath;

    protected $relationships = [];

    public function __construct()
    {
        parent::__construct();
        $this->migrationsPath = database_path('migrations');
        $this->modelsPath = app_path('Models');
    }

    public function handle()
    {
        $this->info('🔍 Analyzing migration files for relationships...');

        // Analyze all migration files to build relationship map
        $this->analyzeMigrations();

        if ($this->option('all')) {
            $this->generateAllModels();
        } elseif ($this->argument('model')) {
            $this->generateModel($this->argument('model'));
        } else {
            $this->error('Please specify a model name or use --all flag');

            return 1;
        }

        $this->info('✅ Model generation completed!');

        return 0;
    }

    protected function analyzeMigrations()
    {
        $migrationFiles = File::glob($this->migrationsPath.'/*.php');

        foreach ($migrationFiles as $file) {
            $content = File::get($file);
            $tableName = $this->extractTableName($content);

            if ($tableName) {
                $this->relationships[$tableName] = $this->extractRelationships($content, $tableName);
            }
        }
    }

    protected function extractTableName($content)
    {
        if (preg_match('/Schema::create\(\'([^\']+)\'/', $content, $matches)) {
            return $matches[1];
        }

        return null;
    }

    protected function extractRelationships($content, $tableName)
    {
        $relationships = [
            'hasMany' => [],
            'belongsTo' => [],
            'hasOne' => [],
            'belongsToMany' => [],
            'hasManyThrough' => [],
            'morphTo' => [],
            'morphMany' => [],
        ];

        // Extract foreign key constraints
        preg_match_all('/\$table->foreignId\(\'([^\']+)\'\)->constrained\([^)]*\)/', $content, $matches);
        foreach ($matches[1] as $foreignKey) {
            $relatedTable = $this->getRelatedTableName($foreignKey);
            if ($relatedTable) {
                $relationships['belongsTo'][] = [
                    'table' => $relatedTable,
                    'foreign_key' => $foreignKey,
                    'local_key' => 'id',
                ];
            }
        }

        // Extract foreign key with custom table name
        preg_match_all('/\$table->foreignId\(\'([^\']+)\'\)->constrained\(\'([^\']+)\'/', $content, $matches);
        for ($i = 0; $i < count($matches[1]); $i++) {
            $foreignKey = $matches[1][$i];
            $relatedTable = $matches[2][$i];
            $relationships['belongsTo'][] = [
                'table' => $relatedTable,
                'foreign_key' => $foreignKey,
                'local_key' => 'id',
            ];
        }

        // Extract unsignedBigInteger foreign keys
        preg_match_all('/\$table->unsignedBigInteger\(\'([^\']+)\'\)/', $content, $matches);
        foreach ($matches[1] as $foreignKey) {
            if (Str::endsWith($foreignKey, '_id')) {
                $relatedTable = $this->getRelatedTableName($foreignKey);
                if ($relatedTable) {
                    $relationships['belongsTo'][] = [
                        'table' => $relatedTable,
                        'foreign_key' => $foreignKey,
                        'local_key' => 'id',
                    ];
                }
            }
        }

        // Extract pivot table relationships
        if (Str::contains($tableName, '_')) {
            $parts = explode('_', $tableName);
            if (count($parts) === 2) {
                $relationships['belongsToMany'][] = [
                    'table1' => $parts[0],
                    'table2' => $parts[1],
                    'pivot_table' => $tableName,
                ];
            }
        }

        return $relationships;
    }

    protected function getRelatedTableName($foreignKey)
    {
        // Remove _id suffix and convert to table name
        $tableName = Str::beforeLast($foreignKey, '_id');

        // Handle special cases
        $specialCases = [
            'blog_category' => 'blog_categories',
            'sub_category' => 'sub_categories',
            'product_cart' => 'product_carts',
            'flash_deal' => 'flash_deals',
            'deal_of_the_day' => 'deal_of_the_days',
            'marketing_service' => 'marketing_services',
            'color_attribute' => 'color_attributes',
        ];

        if (isset($specialCases[$tableName])) {
            return $specialCases[$tableName];
        }

        // Convert to plural
        return Str::plural($tableName);
    }

    protected function generateAllModels()
    {
        foreach (array_keys($this->relationships) as $tableName) {
            $this->generateModel($this->tableToModelName($tableName));
        }
    }

    protected function generateModel($modelName)
    {
        $tableName = $this->modelToTableName($modelName);

        if (! isset($this->relationships[$tableName])) {
            $this->warn("No relationships found for table: {$tableName}");

            return;
        }

        $modelPath = $this->modelsPath.'/'.$modelName.'.php';
        $relationships = $this->relationships[$tableName];

        if (File::exists($modelPath)) {
            $this->updateExistingModel($modelPath, $relationships, $tableName);
        } else {
            $this->createNewModel($modelPath, $modelName, $relationships, $tableName);
        }

        $this->info("✅ Model {$modelName} processed successfully");
    }

    protected function createNewModel($modelPath, $modelName, $relationships, $tableName)
    {
        $content = $this->generateModelContent($modelName, $relationships, $tableName);
        File::put($modelPath, $content);
        $this->info("📝 Created new model: {$modelName}");
    }

    protected function updateExistingModel($modelPath, $relationships, $tableName)
    {
        $content = File::get($modelPath);

        // Add relationships if they don't exist
        $newRelationships = $this->generateRelationshipsCode($relationships, $tableName);

        // Check if relationships already exist
        if (! Str::contains($content, '// Relationships')) {
            // Add relationships section before the last closing brace
            $content = Str::beforeLast($content, '}')."\n\n    // Relationships\n".$newRelationships."\n}";
        }

        File::put($modelPath, $content);
        $this->info('📝 Updated existing model with relationships');
    }

    protected function generateModelContent($modelName, $relationships, $tableName)
    {
        $relationshipsCode = $this->generateRelationshipsCode($relationships, $tableName);

        return "<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class {$modelName} extends Model
{
    use HasFactory;

    protected \$table = '{$tableName}';

    protected \$fillable = [
        // Add your fillable fields here
    ];

    protected \$casts = [
        // Add your casts here
    ];

    // Relationships
{$relationshipsCode}
}";
    }

    protected function generateRelationshipsCode($relationships, $tableName)
    {
        $code = '';

        // Generate belongsTo relationships
        foreach ($relationships['belongsTo'] as $relation) {
            $relatedModel = $this->tableToModelName($relation['table']);
            $relationName = Str::camel(Str::beforeLast($relation['foreign_key'], '_id'));

            $code .= "    public function {$relationName}(): BelongsTo\n";
            $code .= "    {\n";
            $code .= "        return \$this->belongsTo({$relatedModel}::class, '{$relation['foreign_key']}');\n";
            $code .= "    }\n\n";
        }

        // Generate hasMany relationships (reverse of belongsTo)
        foreach ($this->getHasManyRelationships($tableName) as $relation) {
            $relatedModel = $this->tableToModelName($relation['table']);
            $relationName = Str::camel(Str::plural($relation['table']));

            $code .= "    public function {$relationName}(): HasMany\n";
            $code .= "    {\n";
            $code .= "        return \$this->hasMany({$relatedModel}::class, '{$relation['foreign_key']}');\n";
            $code .= "    }\n\n";
        }

        // Generate belongsToMany relationships
        foreach ($relationships['belongsToMany'] as $relation) {
            $model1 = $this->tableToModelName($relation['table1']);
            $model2 = $this->tableToModelName($relation['table2']);

            if ($tableName === $relation['table1']) {
                $relationName = Str::camel(Str::plural($relation['table2']));
                $relatedModel = $model2;
            } else {
                $relationName = Str::camel(Str::plural($relation['table1']));
                $relatedModel = $model1;
            }

            $code .= "    public function {$relationName}(): BelongsToMany\n";
            $code .= "    {\n";
            $code .= "        return \$this->belongsToMany({$relatedModel}::class, '{$relation['pivot_table']}');\n";
            $code .= "    }\n\n";
        }

        return $code;
    }

    protected function getHasManyRelationships($tableName)
    {
        $hasMany = [];

        foreach ($this->relationships as $relatedTable => $relations) {
            foreach ($relations['belongsTo'] as $relation) {
                if ($relation['table'] === $tableName) {
                    $hasMany[] = [
                        'table' => $relatedTable,
                        'foreign_key' => $relation['foreign_key'],
                    ];
                }
            }
        }

        return $hasMany;
    }

    protected function tableToModelName($tableName)
    {
        // Convert table name to model name (singular, PascalCase)
        $modelName = Str::singular($tableName);

        return Str::studly($modelName);
    }

    protected function modelToTableName($modelName)
    {
        // Convert model name to table name (plural, snake_case)
        $tableName = Str::snake($modelName);

        return Str::plural($tableName);
    }
}
