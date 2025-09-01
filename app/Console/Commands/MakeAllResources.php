<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class MakeAllResources extends Command
{
    protected $signature = 'make:all-resources {--path=Admin : The path for the controller (e.g., Admin)} {--generate-pages : Generate React pages for the resource} {--generate-routes : Generate routes for the resource} {--skip-existing : Skip existing models/controllers}';

    protected $description = 'Generate resources for all migration files';

    public function handle()
    {
        $path = $this->option('path');
        $generatePages = $this->option('generate-pages');
        $generateRoutes = $this->option('generate-routes');
        $skipExisting = $this->option('skip-existing');

        $this->info('🔍 Scanning migration files...');

        $migrationFiles = File::glob(database_path('migrations/*.php'));
        $processedTables = [];
        $skippedTables = [];
        $errorTables = [];
        $allResourceNames = [];

        foreach ($migrationFiles as $migrationFile) {
            $tableName = $this->extractTableNameFromMigration($migrationFile);

            if (! $tableName) {
                continue;
            }

            // Skip certain tables that don't need resources
            if ($this->shouldSkipTable($tableName)) {
                $skippedTables[] = $tableName;

                continue;
            }

            $resourceName = $this->getResourceNameFromTable($tableName);

            // Check if model already exists and skip if requested
            $modelPath = app_path("Models/{$resourceName}.php");
            if ($skipExisting && File::exists($modelPath)) {
                $skippedTables[] = $tableName;

                continue;
            }

            $this->info("\n📦 Processing table: {$tableName} -> Resource: {$resourceName}");

            try {
                // Create the controller
                $this->createController($resourceName, $path);

                // Create request files
                $this->createRequestFiles($resourceName, $tableName);

                // Create the repository interface
                $this->createRepositoryInterface($resourceName);

                // Create the repository implementation
                $this->createRepository($resourceName, $tableName);

                // Create model if it doesn't exist
                $this->createModel($resourceName, $tableName);

                // Generate React pages if requested
                if ($generatePages) {
                    $this->generateReactPages($resourceName, $tableName);
                }

                // Generate routes if requested
                if ($generateRoutes) {
                    $this->generateRoutes($resourceName, $path);
                }

                // Register in service provider
                $this->registerInServiceProvider($resourceName);

                $processedTables[] = $tableName;
                $allResourceNames[] = $resourceName;
                $this->info("✅ Successfully created resources for: {$resourceName}");

            } catch (\Exception $e) {
                $this->error("❌ Error processing {$resourceName}: ".$e->getMessage());
                $errorTables[] = $tableName;
            }
        }

        // Summary
        $this->info("\n".str_repeat('=', 50));
        $this->info('📊 GENERATION SUMMARY');
        $this->info(str_repeat('=', 50));
        $this->info('✅ Successfully processed: '.count($processedTables));
        $this->info('⏭️  Skipped: '.count($skippedTables));
        $this->info('❌ Errors: '.count($errorTables));

        if (! empty($processedTables)) {
            $this->info("\n📋 Processed tables:");
            foreach ($processedTables as $table) {
                $this->line("  • {$table}");
            }
        }

        if (! empty($skippedTables)) {
            $this->info("\n⏭️  Skipped tables:");
            foreach ($skippedTables as $table) {
                $this->line("  • {$table}");
            }
        }

        if (! empty($errorTables)) {
            $this->error("\n❌ Failed tables:");
            foreach ($errorTables as $table) {
                $this->line("  • {$table}");
            }
        }
        $this->writeGeneratedRoutesFile($allResourceNames);

        return count($errorTables) > 0 ? Command::FAILURE : Command::SUCCESS;
    }

    protected function writeGeneratedRoutesFile(array $resourceNames)
    {
        $routeFile = base_path('routes/generated_resources_route.php');
        $lines = [];
        $lines[] = "<?php\n";
        $lines[] = 'use Illuminate\\Support\\Facades\\Route;';

        // Add use statements
        foreach ($resourceNames as $resource) {
            $lines[] = "use App\\Http\\Controllers\\Admin\\{$resource}Controller;";
        }
        $lines[] = '';

        // Add Route::resource lines
        foreach ($resourceNames as $resource) {
            $routeName = \Illuminate\Support\Str::kebab($resource);
            $lines[] = "Route::resource('{$routeName}', {$resource}Controller::class);";
        }

        file_put_contents($routeFile, implode(PHP_EOL, $lines));
    }

    /**
     * Extract table name from migration file.
     */
    protected function extractTableNameFromMigration(string $migrationFile): ?string
    {
        $content = File::get($migrationFile);

        // Look for Schema::create('table_name')
        if (preg_match('/Schema::create\(\'([^\']+)\'/', $content, $matches)) {
            return $matches[1];
        }

        // Look for Schema::create("table_name")
        if (preg_match('/Schema::create\("([^"]+)"\)/', $content, $matches)) {
            return $matches[1];
        }

        return null;
    }

    /**
     * Get resource name from table name.
     */
    protected function getResourceNameFromTable(string $tableName): string
    {
        // Convert table name to singular, then to PascalCase
        $singular = Str::singular($tableName);

        return Str::studly($singular);
    }

    /**
     * Check if table should be skipped.
     */
    protected function shouldSkipTable(string $tableName): bool
    {
        $skipTables = [
            'users',
            'user_profiles',
            'user_verifications',
            'user_locations',
            'user_login_histories',
            'user_securities', 'notification_settings',
            'password_reset_tokens', 'personal_access_tokens',
            'failed_jobs',
            'cache', 'jobs', 'sessions', 'migrations', 'password_resets',
            'permissions', 'roles', 'role_has_permissions', 'model_has_roles',
            'model_has_permissions',
            'post_tag', 'blog_tag',
            'flash_deal_products',
            'coupon_users',
            'order_items', 'participants', 'messages',
            'blog_comments', 'blog_likes', 'product_reviews', 'product_seos',
            'color_images',
            'multi_images',
            // 'site_settings',
            // 'site_seos',
            // 'business_infos',
            // 'faq_questions',
            //  'announcements',
            'subscribers',
            'marketing_credentials',
            'tracking_scripts',
            'shopping_cart',
        ];

        return in_array($tableName, $skipTables);
    }

    /**
     * Create a controller file.
     */
    protected function createController(string $name, string $path): void
    {
        $controllerDir = app_path("Http/Controllers/{$path}");
        if (! File::isDirectory($controllerDir)) {
            File::makeDirectory($controllerDir, 0755, true);
        }

        $controllerPath = "{$controllerDir}/{$name}Controller.php";
        $lowercaseName = Str::lower($name);
        $resourceName = Str::kebab($lowercaseName);

        $content = <<<EOT
<?php
// app/Http/Controllers/{$path}/{$name}Controller.php

namespace App\Http\Controllers\\{$path};

use App\Helpers\QueryBuilderHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\\{$name}StoreRequest;
use App\Http\Requests\\{$name}UpdateRequest;
use App\Repositories\\{$name}Repository;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class {$name}Controller extends Controller
{
    public function __construct(
       private readonly {$name}Repository \${$lowercaseName}Repository
    ) {
    }

    /**
     * Display a listing of {$lowercaseName}s.
     */
    public function index(Request \$request): Response {
       \${$lowercaseName}s = \$this->{$lowercaseName}Repository->paginate(\$request);

       return Inertia::render('{$lowercaseName}/index', [
          '{$lowercaseName}s' => \${$lowercaseName}s,
          'filters' => QueryBuilderHelper::filters(\$request),
       ]);
    }

    /**
     * Show the form for creating a new {$lowercaseName}.
     */
    public function create(): Response {
       return Inertia::render('{$lowercaseName}/create');
    }

    /**
     * Store a newly created {$lowercaseName} in storage.
     */
    public function store({$name}StoreRequest \$request): RedirectResponse {
       try {
          \$this->{$lowercaseName}Repository->create(\$request->validated());
          return success_route('{$resourceName}.index', '{$name} created successfully.');
       } catch (\Exception \$e) {
          return error_route('{$resourceName}.index', 'Failed to create {$lowercaseName}: ' . \$e->getMessage());
       }
    }

    /**
     * Display the specified {$lowercaseName}.
     */
    public function show(int \$id): Response {
       \${$lowercaseName} = \$this->{$lowercaseName}Repository->find(\$id);

       if (!\${$lowercaseName}) {
          error_response('{$name} not found', 404);
       }

       return Inertia::render('{$lowercaseName}/show', [
          '{$lowercaseName}' => \${$lowercaseName},
       ]);
    }

    /**
     * Show the form for editing the specified {$lowercaseName}.
     */
    public function edit(int \$id): Response {
       \${$lowercaseName} = \$this->{$lowercaseName}Repository->find(\$id);

       if (!\${$lowercaseName}) {
          error_response('{$name} not found', 404);
       }
       return Inertia::render('{$lowercaseName}/edit', [
          '{$lowercaseName}' => \${$lowercaseName},
       ]);
    }

    /**
     * Update the specified {$lowercaseName} in storage.
     */
    public function update({$name}UpdateRequest \$request, int \$id): RedirectResponse {
       try {
          \$this->{$lowercaseName}Repository->update(\$request->validated(), \$id);
          return success_route('{$resourceName}.index', '{$name} updated successfully.');

       } catch (\Exception \$e) {
          return error_route('{$resourceName}.index', 'Failed to update {$lowercaseName}: ' . \$e->getMessage());
       }
    }

    /**
     * Remove the specified {$lowercaseName} from storage.
     */
    public function destroy(int \$id): RedirectResponse {
       try {
          \$this->{$lowercaseName}Repository->delete(\$id);

          return success_route('{$resourceName}.index', '{$name} deleted successfully.');
       } catch (\Exception \$e) {
          return error_route('{$resourceName}.index', 'Failed to delete {$lowercaseName}: ' . \$e->getMessage());
       }
    }
}
EOT;

        File::put($controllerPath, $content);
        $this->info("Controller created: {$controllerPath}");
    }

    /**
     * Create request files with validations based on migration columns.
     */
    protected function createRequestFiles(string $name, string $table): void
    {
        $requestDir = app_path('Http/Requests');
        if (! File::isDirectory($requestDir)) {
            File::makeDirectory($requestDir, 0755, true);
        }

        // Generate validation rules based on table columns
        $validationRules = $this->generateValidationRules($table);

        // Create Store Request
        $storeRequestPath = "{$requestDir}/{$name}StoreRequest.php";
        $storeContent = $this->generateRequestContent($name, 'Store', $validationRules);
        File::put($storeRequestPath, $storeContent);
        $this->info("Store Request created: {$storeRequestPath}");

        // Create Update Request (typically may have different rules like making some fields optional)
        $updateRequestPath = "{$requestDir}/{$name}UpdateRequest.php";
        $updateValidationRules = $this->adjustValidationRulesForUpdate($validationRules);
        $updateContent = $this->generateRequestContent($name, 'Update', $updateValidationRules);
        File::put($updateRequestPath, $updateContent);
        $this->info("Update Request created: {$updateRequestPath}");
    }

    /**
     * Generate validation rules based on table columns.
     */
    protected function generateValidationRules(string $table): array
    {
        $rules = [];

        // Check if the table exists
        if (! Schema::hasTable($table)) {
            $this->warn("Table '{$table}' not found. Using default validation rules.");

            return ['name' => 'required|string|max:255'];
        }

        // Get columns from the table
        $columns = Schema::getColumnListing($table);

        foreach ($columns as $column) {
            // Skip certain columns
            if (in_array($column, ['id', 'created_at', 'updated_at', 'deleted_at'])) {
                continue;
            }

            $columnType = Schema::getColumnType($table, $column);
            $rules[$column] = $this->generateRuleForColumn($column, $columnType, $table);
        }

        return $rules;
    }

    /**
     * Generate validation rule for a specific column.
     */
    protected function generateRuleForColumn(string $column, string $columnType, string $table): string
    {
        $rule = ['required']; // Default to required

        // Add type-specific rules
        switch ($columnType) {
            case 'string':
                $rule[] = 'string';
                $rule[] = 'max:255';
                break;
            case 'integer':
            case 'bigint':
                $rule[] = 'integer';
                break;
            case 'boolean':
                $rule[] = 'boolean';
                break;
            case 'date':
                $rule[] = 'date';
                break;
            case 'datetime':
                $rule[] = 'date_format:Y-m-d H:i:s';
                break;
            case 'decimal':
            case 'float':
            case 'double':
                $rule[] = 'numeric';
                break;
            case 'text':
                $rule[] = 'string';
                break;
            case 'json':
                $rule[] = 'json';
                break;
            default:
                $rule[] = 'string';
        }

        // Special handling for common column names
        if (Str::endsWith($column, '_id')) {
            $relatedTable = Str::plural(Str::beforeLast($column, '_id'));
            $rule[] = "exists:{$relatedTable},id";
        } elseif ($column === 'email') {
            $rule[] = 'email';
        } elseif ($column === 'password') {
            $rule[] = 'min:8';
        } elseif (Str::contains($column, 'image') || Str::contains($column, 'photo')) {
            $rule = ['nullable', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'];
        } elseif (Str::contains($column, 'url')) {
            $rule[] = 'url';
        } elseif (Str::contains($column, 'phone')) {
            $rule[] = 'regex:/^[0-9+\-\s()]+$/';
        } elseif (Str::contains($column, 'status')) {
            // Handle enum status fields
            $rule[] = 'in:active,inactive';
        } elseif (Str::contains($column, 'gender')) {
            $rule[] = 'in:male,female,other';
        }

        return implode('|', $rule);
    }

    /**
     * Adjust validation rules for update requests (making fields nullable).
     */
    protected function adjustValidationRulesForUpdate(array $rules): array
    {
        $updateRules = [];

        foreach ($rules as $field => $rule) {
            // For update requests, fields are often optional
            $updateRules[$field] = str_replace('required', 'sometimes', $rule);
        }

        return $updateRules;
    }

    /**
     * Generate content for request files.
     */
    protected function generateRequestContent(string $name, string $type, array $rules): string
    {
        $rulesContent = '';

        foreach ($rules as $field => $rule) {
            $rulesContent .= "            '{$field}' => '{$rule}',\n";
        }

        // Remove the trailing comma and newline
        $rulesContent = rtrim($rulesContent, ",\n")."\n        ";

        $content = <<<EOT
<?php
// app/Http/Requests/{$name}{$type}Request.php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class {$name}{$type}Request extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
{$rulesContent}];
    }
}
EOT;

        return $content;
    }

    /**
     * Create a repository interface file.
     */
    protected function createRepositoryInterface(string $name): void
    {
        $interfaceDir = app_path('Repositories/Interfaces');
        if (! File::isDirectory($interfaceDir)) {
            File::makeDirectory($interfaceDir, 0755, true);
        }

        $interfacePath = "{$interfaceDir}/{$name}RepositoryInterface.php";

        $content = <<<EOT
<?php
// app/Repositories/Interfaces/{$name}RepositoryInterface.php

namespace App\Repositories\Interfaces;

interface {$name}RepositoryInterface extends BaseRepositoryInterface
{
    // Add any {$name}-specific methods here
}
EOT;

        File::put($interfacePath, $content);
        $this->info("Repository interface created: {$interfacePath}");
    }

    /**
     * Create a repository implementation file.
     */
    protected function createRepository(string $name, string $table): void
    {
        $repositoryDir = app_path('Repositories');
        if (! File::isDirectory($repositoryDir)) {
            File::makeDirectory($repositoryDir, 0755, true);
        }

        $repositoryPath = "{$repositoryDir}/{$name}Repository.php";
        $lowercaseName = Str::lower($name);

        // Get searchable fields from table
        $searchableFields = $this->getSearchableFields($table);
        $sortableFields = $this->getSortableFields($table);

        $content = <<<EOT
<?php
// app/Repositories/{$name}Repository.php

namespace App\Repositories;

use App\Models\\{$name};
use App\Repositories\Interfaces\\{$name}RepositoryInterface;

class {$name}Repository extends BaseRepository implements {$name}RepositoryInterface
{
    public function __construct({$name} \$model)
    {
        parent::__construct(\$model);
    }

    protected function getSearchableFields(): array
    {
        return [{$searchableFields}];
    }

    protected function getSortableFields(): array
    {
        return [{$sortableFields}];
    }
}
EOT;

        File::put($repositoryPath, $content);
        $this->info("Repository implementation created: {$repositoryPath}");
    }

    /**
     * Get searchable fields from table.
     */
    protected function getSearchableFields(string $table): string
    {
        if (! Schema::hasTable($table)) {
            return "'name', 'created_at'";
        }

        $columns = Schema::getColumnListing($table);
        $searchableFields = [];

        foreach ($columns as $column) {
            if (in_array($column, ['id', 'created_at', 'updated_at', 'deleted_at'])) {
                continue;
            }

            $columnType = Schema::getColumnType($table, $column);
            if (in_array($columnType, ['string', 'text'])) {
                $searchableFields[] = "'{$column}'";
            }
        }

        return implode(', ', $searchableFields ?: ["'name'", "'created_at'"]);
    }

    /**
     * Get sortable fields from table.
     */
    protected function getSortableFields(string $table): string
    {
        if (! Schema::hasTable($table)) {
            return "'name', 'created_at'";
        }

        $columns = Schema::getColumnListing($table);
        $sortableFields = [];

        foreach ($columns as $column) {
            if (in_array($column, ['id', 'created_at', 'updated_at', 'deleted_at'])) {
                continue;
            }

            $sortableFields[] = "'{$column}'";
        }

        return implode(', ', $sortableFields ?: ["'name'", "'created_at'"]);
    }

    /**
     * Create model if it doesn't exist.
     */
    protected function createModel(string $name, string $table): void
    {
        $modelPath = app_path("Models/{$name}.php");

        if (File::exists($modelPath)) {
            $this->info("Model already exists: {$modelPath}");

            return;
        }

        $content = <<<EOT
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class {$name} extends Model
{
    use HasFactory, SoftDeletes;

    protected \$fillable = [
        // Add fillable fields here
    ];

    protected \$casts = [
        // Add casts here
    ];

    // Add relationships here
}
EOT;

        File::put($modelPath, $content);
        $this->info("Model created: {$modelPath}");
    }

    /**
     * Generate React pages for the resource.
     */
    protected function generateReactPages(string $name, string $table): void
    {
        $lowercaseName = Str::lower($name);
        $resourceName = Str::kebab($lowercaseName);
        $modelNameCapitalized = Str::studly($name);

        // Get table fields for form generation
        $fields = $this->getTableFields($table);

        $pagesDir = resource_path("js/pages/{$lowercaseName}");
        if (! File::isDirectory($pagesDir)) {
            File::makeDirectory($pagesDir, 0755, true);
        }

        // Generate index page
        $this->generateIndexPage($name, $resourceName, $fields, $pagesDir);

        // Generate create page
        $this->generateCreatePage($name, $resourceName, $fields, $pagesDir);

        // Generate edit page
        $this->generateEditPage($name, $resourceName, $fields, $pagesDir);

        // Generate show page
        $this->generateShowPage($name, $fields, $pagesDir);

        $this->info("React pages generated in: {$pagesDir}");
    }

    /**
     * Get table fields for form generation.
     */
    protected function getTableFields(string $table): array
    {
        if (! Schema::hasTable($table)) {
            return [
                ['name' => 'name', 'label' => 'Name', 'type' => 'text', 'required' => true],
                ['name' => 'description', 'label' => 'Description', 'type' => 'textarea', 'required' => false],
            ];
        }

        $columns = Schema::getColumnListing($table);
        $fields = [];

        foreach ($columns as $column) {
            if (in_array($column, ['id', 'created_at', 'updated_at', 'deleted_at'])) {
                continue;
            }

            $columnType = Schema::getColumnType($table, $column);
            $fieldType = $this->getFieldType($column, $columnType);
            $label = Str::title(str_replace('_', ' ', $column));

            $fields[] = [
                'name' => $column,
                'label' => $label,
                'type' => $fieldType,
                'required' => ! Str::contains($column, ['_id', 'photo', 'image']) && $column !== 'status',
            ];
        }

        return $fields;
    }

    /**
     * Get field type for form generation.
     */
    protected function getFieldType(string $column, string $columnType): string
    {
        if (Str::endsWith($column, '_id')) {
            return 'select';
        } elseif (Str::contains($column, ['photo', 'image'])) {
            return 'file';
        } elseif (Str::contains($column, ['email'])) {
            return 'email';
        } elseif (Str::contains($column, ['phone'])) {
            return 'tel';
        } elseif (Str::contains($column, ['date'])) {
            return 'date';
        } elseif (Str::contains($column, ['status'])) {
            return 'select';
        } elseif (Str::contains($column, ['gender'])) {
            return 'select';
        } elseif ($columnType === 'text') {
            return 'textarea';
        } elseif ($columnType === 'boolean') {
            return 'checkbox';
        } else {
            return 'text';
        }
    }

    /**
     * Generate index page.
     */
    protected function generateIndexPage(string $name, string $resourceName, array $fields, string $pagesDir): void
    {
        $modelNameCapitalized = Str::studly($name);
        $lowercaseName = Str::lower($name);

        $columns = [];
        foreach ($fields as $field) {
            if ($field['name'] === 'actions') {
                continue;
            }

            $columns[] = "        column('{$field['name']}', '{$field['label']}', (item) => <div className=\"font-medium\">{item.{$field['name']}}</div>)";
        }

        $columnsContent = implode(",\n", $columns);

        $content = <<<EOT
// resources/js/Pages/{$lowercaseName}/index.jsx
import ListingPage from '@/components/ListingPage';
import { column, createSerialColumn } from '@/utils/tableUtils';
import { usePage } from '@inertiajs/react';
import ActionsDropdown from '@/components/ActionsDropdown';

export default function {$modelNameCapitalized}() {
    const { {$lowercaseName}s, filters = {}, auth } = usePage().props;

    const breadcrumbs = [
        {
            title: '{$modelNameCapitalized}',
            href: '/{$resourceName}',
        },
    ];

    const columns = [
        createSerialColumn('Serial'),
{$columnsContent},
        column('actions', 'Actions', (item) => (
            <ActionsDropdown
                item={item}
                routes={{
                    view: (id) => route('{$resourceName}.show', id),
                    edit: (id) => route('{$resourceName}.edit', id),
                    delete: (id) => route('{$resourceName}.destroy', id),
                }}
            />
        )),
    ];

    return (
        <ListingPage
            title="{$modelNameCapitalized}"
            data={{$lowercaseName}s}
            filters={filters}
            currentUser={auth.user}
            resourceName="{$resourceName}"
            breadcrumbs={breadcrumbs}
            columns={columns}
            createButtonText="New {$modelNameCapitalized}"
        />
    );
}
EOT;

        File::put("{$pagesDir}/index.jsx", $content);
    }

    /**
     * Generate create page.
     */
    protected function generateCreatePage(string $name, string $resourceName, array $fields, string $pagesDir): void
    {
        $modelNameCapitalized = Str::studly($name);
        $lowercaseName = Str::lower($name);

        $formFields = [];
        foreach ($fields as $field) {
            $formFields[] = '        '.json_encode($field, JSON_PRETTY_PRINT);
        }
        $formFieldsContent = implode(",\n", $formFields);

        $initialData = [];
        foreach ($fields as $field) {
            $initialData[] = "            {$field['name']}: ''";
        }
        $initialDataContent = implode(",\n", $initialData);

        $content = <<<EOT
import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function create() {
    const { permissions, auth } = usePage().props;

    const fields = [
{$formFieldsContent}
    ];

    const breadcrumbs = [
        {
            title: 'Create {$modelNameCapitalized}',
            href: '/{$resourceName}'
        }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create {$modelNameCapitalized}" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Create New {$modelNameCapitalized}"
                        description="Add a new {$lowercaseName}"
                        initialData={{
{$initialDataContent}
                        }}
                        fields={fields}
                        submitUrl="{$resourceName}"
                        submitLabel="Create New {$modelNameCapitalized}"
                        successMessage="{$modelNameCapitalized} created successfully!"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
EOT;

        File::put("{$pagesDir}/create.jsx", $content);
    }

    /**
     * Generate edit page.
     */
    protected function generateEditPage(string $name, string $resourceName, array $fields, string $pagesDir): void
    {
        $modelNameCapitalized = Str::studly($name);
        $lowercaseName = Str::lower($name);

        $formFields = [];
        foreach ($fields as $field) {
            $formFields[] = '        '.json_encode($field, JSON_PRETTY_PRINT);
        }
        $formFieldsContent = implode(",\n", $formFields);

        $content = <<<EOT
import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function edit() {
    const { {$lowercaseName}, permissions, auth } = usePage().props;

    const fields = [
{$formFieldsContent}
    ];

    const breadcrumbs = [
        {
            title: 'Edit {$modelNameCapitalized}',
            href: '/{$resourceName}',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit {$modelNameCapitalized}" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Edit {$modelNameCapitalized}"
                        description="Update {$lowercaseName} information"
                        initialData={{$lowercaseName}}
                        fields={fields}
                        submitUrl={\`{$resourceName}/\${{$lowercaseName}.id}\`}
                        submitLabel="Update {$modelNameCapitalized}"
                        successMessage="{$modelNameCapitalized} updated successfully!"
                        method="PUT"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
EOT;

        File::put("{$pagesDir}/edit.jsx", $content);
    }

    /**
     * Generate show page.
     */
    protected function generateShowPage(string $name, array $fields, string $pagesDir): void
    {
        $modelNameCapitalized = Str::studly($name);
        $lowercaseName = Str::lower($name);

        $content = <<<EOT
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function show() {
    const { {$lowercaseName} } = usePage().props;

    return (
        <AppLayout>
            <Head title="{$modelNameCapitalized} Details" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Add your show page content here */}
                </div>
            </div>
        </AppLayout>
    );
}
EOT;

        File::put("{$pagesDir}/show.jsx", $content);
    }

    /**
     * Generate routes for the resource.
     */
    protected function generateRoutes(string $name, string $path): void
    {
        $lowercaseName = Str::lower($name);
        $resourceName = Str::kebab($lowercaseName);

        $routeContent = "        Route::resource('{$resourceName}', {$name}Controller::class);\n";

        $this->info('Add this route to your routes file:');
        $this->line($routeContent);
    }

    /**
     * Register in service provider.
     */
    protected function registerInServiceProvider(string $name): void
    {
        $lowercaseName = Str::lower($name);
        $interfaceName = "{$name}RepositoryInterface";
        $repositoryName = "{$name}Repository";

        $bindingContent = "\$this->app->bind({$interfaceName}::class, {$repositoryName}::class);\n";

        $this->info('Add this binding to your AppServiceProvider:');
        $this->line($bindingContent);
    }
}
