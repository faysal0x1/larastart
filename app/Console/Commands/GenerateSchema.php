<?php
namespace App\Console\Commands;

use App\Models\Blog;
use App\Models\MicroTask;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class GenerateSchema extends Command
{
    protected $signature   = 'schema:generate {--type=all : Type of schema to generate (all, organization, website, blog, microtask)}';
    protected $description = 'Generate structured data schemas for the website';

    public function handle()
    {
        $type = $this->option('type');
        $this->info("Generating {$type} schema...");

        switch ($type) {
            case 'organization':
                $this->generateOrganizationSchema();
                break;
            case 'website':
                $this->generateWebsiteSchema();
                break;
            case 'blog':
                $this->generateBlogSchema();
                break;
            case 'microtask':
                $this->generateMicroTaskSchema();
                break;
            case 'all':
            default:
                $this->generateAllSchemas();
                break;
        }

        $this->info('Schema generation completed!');
    }

    private function generateAllSchemas()
    {
        $this->generateOrganizationSchema();
        $this->generateWebsiteSchema();
        $this->generateBlogSchema();
        $this->generateMicroTaskSchema();
        $this->generateBreadcrumbSchema();
        $this->generateSearchBoxSchema();
    }

    private function generateOrganizationSchema()
    {
        $schema = [
            '@context'     => 'https://schema.org',
            '@type'        => 'Organization',
            'name'         => 'TaskPortals',
            'url'          => config('app.url'),
            'logo'         => config('app.url') . '/assets/logo.png',
            'description'  => 'A comprehensive micro-job platform connecting freelancers with employers for various tasks and projects.',
            'foundingDate' => '2024',
            'sameAs'       => [
                'https://facebook.com/taskportals',
                'https://twitter.com/taskportals',
                'https://linkedin.com/company/taskportals',
            ],
            'contactPoint' => [
                '@type'             => 'ContactPoint',
                'contactType'       => 'customer service',
                'email'             => 'support@taskportals.com',
                'availableLanguage' => 'English',
            ],
            'address'      => [
                '@type'           => 'PostalAddress',
                'addressCountry'  => 'US',
                'addressLocality' => 'New York',
                'addressRegion'   => 'NY',
            ],
        ];

        $this->saveSchema('organization-schema.json', $schema);
        $this->info('Organization schema generated');
    }

    private function generateWebsiteSchema()
    {
        $schema = [
            '@context'        => 'https://schema.org',
            '@type'           => 'WebSite',
            'name'            => 'TaskPortals',
            'url'             => config('app.url'),
            'description'     => 'Find and complete micro-jobs, freelance tasks, and short-term projects on our platform.',
            'publisher'       => [
                '@type' => 'Organization',
                'name'  => 'TaskPortals',
            ],
            'potentialAction' => [
                '@type'       => 'SearchAction',
                'target'      => [
                    '@type'       => 'EntryPoint',
                    'urlTemplate' => config('app.url') . '/search?q={search_term_string}',
                ],
                'query-input' => 'required name=search_term_string',
            ],
        ];

        $this->saveSchema('website-schema.json', $schema);
        $this->info('Website schema generated');
    }

    private function generateBlogSchema()
    {
        try {
            $blogs       = Blog::with('user')->latest()->take(50)->get();
            $blogSchemas = [];

            foreach ($blogs as $blog) {
                $blogSchema = [
                    '@context'         => 'https://schema.org',
                    '@type'            => 'BlogPosting',
                    'headline'         => $blog->title,
                    'description'      => $blog->description ?? substr($blog->content, 0, 200),
                    'author'           => [
                        '@type' => 'Person',
                        'name'  => $blog->user->name ?? 'Anonymous',
                    ],
                    'datePublished'    => $blog->created_at->toISOString(),
                    'dateModified'     => $blog->updated_at->toISOString(),
                    'publisher'        => [
                        '@type' => 'Organization',
                        'name'  => 'TaskPortals',
                        'logo'  => [
                            '@type' => 'ImageObject',
                            'url'   => config('app.url') . '/assets/logo.png',
                        ],
                    ],
                    'mainEntityOfPage' => [
                        '@type' => 'WebPage',
                        '@id'   => config('app.url') . '/blog/' . $blog->id,
                    ],
                ];

                if ($blog->image) {
                    $blogSchema['image'] = [
                        '@type' => 'ImageObject',
                        'url'   => $blog->image,
                    ];
                }

                $blogSchemas[] = $blogSchema;
            }

            $this->saveSchema('blog-schemas.json', $blogSchemas);
            $this->info('Blog schemas generated: ' . count($blogSchemas));
        } catch (\Exception $e) {
            $this->warn('Could not generate blog schemas: ' . $e->getMessage());
        }
    }

    private function generateMicroTaskSchema()
    {
        try {
            $tasks = MicroTask::with(['category', 'subcategory', 'user'])
                ->where('status', 'active')
                ->latest()
                ->take(100)
                ->get();

            $taskSchemas = [];

            foreach ($tasks as $task) {
                $taskSchema = [
                    '@context'                      => 'https://schema.org',
                    '@type'                         => 'JobPosting',
                    'title'                         => $task->title,
                    'description'                   => $task->description,
                    'datePosted'                    => $task->created_at->toISOString(),
                    'validThrough'                  => $task->deadline ? $task->deadline->toISOString() : null,
                    'employmentType'                => 'CONTRACTOR',
                    'jobLocationType'               => 'TELECOMMUTE',
                    'applicantLocationRequirements' => [
                        '@type' => 'Country',
                        'name'  => 'Worldwide',
                    ],
                    'hiringOrganization'            => [
                        '@type'  => 'Organization',
                        'name'   => 'TaskPortals',
                        'sameAs' => config('app.url'),
                    ],
                    'baseSalary'                    => [
                        '@type'    => 'MonetaryAmount',
                        'currency' => 'USD',
                        'value'    => [
                            '@type'    => 'QuantitativeValue',
                            'value'    => $task->budget,
                            'unitText' => 'HOUR',
                        ],
                    ],
                ];

                if ($task->category) {
                    $taskSchema['industry'] = $task->category->name;
                }

                $taskSchemas[] = $taskSchema;
            }

            $this->saveSchema('microtask-schemas.json', $taskSchemas);
            $this->info('MicroTask schemas generated: ' . count($taskSchemas));
        } catch (\Exception $e) {
            $this->warn('Could not generate microtask schemas: ' . $e->getMessage());
        }
    }

    private function generateBreadcrumbSchema()
    {
        $breadcrumbSchema = [
            '@context'        => 'https://schema.org',
            '@type'           => 'BreadcrumbList',
            'itemListElement' => [
                [
                    '@type'    => 'ListItem',
                    'position' => 1,
                    'name'     => 'Home',
                    'item'     => config('app.url'),
                ],
                [
                    '@type'    => 'ListItem',
                    'position' => 2,
                    'name'     => 'Micro Tasks',
                    'item'     => config('app.url') . '/micro-tasks',
                ],
                [
                    '@type'    => 'ListItem',
                    'position' => 3,
                    'name'     => 'Blog',
                    'item'     => config('app.url') . '/blog',
                ],
            ],
        ];

        $this->saveSchema('breadcrumb-schema.json', $breadcrumbSchema);
        $this->info('Breadcrumb schema generated');
    }

    private function generateSearchBoxSchema()
    {
        $searchSchema = [
            '@context'        => 'https://schema.org',
            '@type'           => 'WebSite',
            'url'             => config('app.url'),
            'potentialAction' => [
                '@type'       => 'SearchAction',
                'target'      => [
                    '@type'       => 'EntryPoint',
                    'urlTemplate' => config('app.url') . '/search?q={search_term_string}',
                ],
                'query-input' => 'required name=search_term_string',
            ],
        ];

        $this->saveSchema('search-schema.json', $searchSchema);
        $this->info('Search box schema generated');
    }

    private function saveSchema($filename, $data)
    {
        $path      = public_path('schemas/' . $filename);
        $directory = dirname($path);

        if (! File::exists($directory)) {
            File::makeDirectory($directory, 0755, true);
        }

        File::put($path, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
    }
}
