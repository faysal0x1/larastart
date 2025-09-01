<?php
namespace App\Console\Commands;

use App\Models\Blog;
use App\Models\MicroTask;
use App\Models\MicroTaskCategory;
use App\Models\User;
use App\Services\SchemaService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class GenerateAllSchemas extends Command
{
    protected $signature   = 'schema:generate-all {--output=public/schemas : Output directory for schemas}';
    protected $description = 'Generate all structured data schemas for the website';

    protected $schemaService;

    public function __construct(SchemaService $schemaService)
    {
        parent::__construct();
        $this->schemaService = $schemaService;
    }

    public function handle()
    {
        $outputDir = $this->option('output');
        $this->info("Generating all schemas to: {$outputDir}");

        // Create output directory
        if (! File::exists($outputDir)) {
            File::makeDirectory($outputDir, 0755, true);
        }

        // Generate individual schemas
        $this->generateOrganizationSchema($outputDir);
        $this->generateWebsiteSchema($outputDir);
        $this->generateBlogSchemas($outputDir);
        $this->generateMicroTaskSchemas($outputDir);
        $this->generateCategorySchemas($outputDir);
        $this->generateUserSchemas($outputDir);
        $this->generateFaqSchemas($outputDir);
        $this->generateLocalBusinessSchema($outputDir);
        $this->generateBreadcrumbSchemas($outputDir);
        $this->generateSearchSchemas($outputDir);
        $this->generateSitemapIndex($outputDir);

        $this->info('All schemas generated successfully!');
        $this->info("Check the {$outputDir} directory for generated files.");
    }

    private function generateOrganizationSchema($outputDir)
    {
        $schema = [
            '@context'      => 'https://schema.org',
            '@type'         => 'Organization',
            'name'          => 'TaskPortals',
            'alternateName' => ['TaskPortals', 'Micro-Job Platform'],
            'url'           => config('app.url'),
            'logo'          => [
                '@type'  => 'ImageObject',
                'url'    => config('app.url') . '/assets/logo.png',
                'width'  => 512,
                'height' => 512,
            ],
            'description'   => 'A comprehensive micro-job platform connecting freelancers with employers for various tasks and projects.',
            'foundingDate'  => '2024',
            'sameAs'        => [
                'https://facebook.com/taskportals',
                'https://twitter.com/taskportals',
                'https://linkedin.com/company/taskportals',
                'https://instagram.com/taskportals',
            ],
            'contactPoint'  => [
                [
                    '@type'             => 'ContactPoint',
                    'contactType'       => 'customer service',
                    'email'             => 'support@taskportals.com',
                    'availableLanguage' => 'English',
                    'hoursAvailable'    => [
                        '@type'     => 'OpeningHoursSpecification',
                        'dayOfWeek' => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                        'opens'     => '09:00',
                        'closes'    => '18:00',
                    ],
                ],
                [
                    '@type'             => 'ContactPoint',
                    'contactType'       => 'technical support',
                    'email'             => 'tech@taskportals.com',
                    'availableLanguage' => 'English',
                ],
            ],
            'address'       => [
                '@type'           => 'PostalAddress',
                'addressCountry'  => 'US',
                'addressLocality' => 'New York',
                'addressRegion'   => 'NY',
                'postalCode'      => '10001',
            ],
            'areaServed'    => [
                '@type' => 'Country',
                'name'  => 'Worldwide',
            ],
            'serviceType'   => [
                'Micro-Job Platform',
                'Freelance Marketplace',
                'Task Management',
                'Payment Processing',
            ],
        ];

        $this->saveSchema($outputDir . '/organization.json', $schema);
        $this->info('✓ Organization schema generated');
    }

    private function generateWebsiteSchema($outputDir)
    {
        $schema = [
            '@context'            => 'https://schema.org',
            '@type'               => 'WebSite',
            'name'                => 'TaskPortals',
            'url'                 => config('app.url'),
            'description'         => 'Find and complete micro-jobs, freelance tasks, and short-term projects on our platform.',
            'publisher'           => [
                '@type' => 'Organization',
                'name'  => 'TaskPortals',
            ],
            'potentialAction'     => [
                [
                    '@type'       => 'SearchAction',
                    'target'      => [
                        '@type'       => 'EntryPoint',
                        'urlTemplate' => config('app.url') . '/search?q={search_term_string}',
                    ],
                    'query-input' => 'required name=search_term_string',
                ],
                [
                    '@type'  => 'RegisterAction',
                    'target' => [
                        '@type'       => 'EntryPoint',
                        'urlTemplate' => config('app.url') . '/register',
                    ],
                ],
            ],
            'inLanguage'          => 'en-US',
            'isAccessibleForFree' => true,
        ];

        $this->saveSchema($outputDir . '/website.json', $schema);
        $this->info('✓ Website schema generated');
    }

    private function generateBlogSchemas($outputDir)
    {
        try {
            $blogs       = Blog::with('user')->latest()->take(100)->get();
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
                    'articleSection'   => $blog->category ?? 'General',
                    'keywords'         => $blog->tags ?? ['micro-jobs', 'freelance', 'tasks'],
                    'wordCount'        => str_word_count($blog->content ?? ''),
                    'timeRequired'     => 'PT5M',
                ];

                if ($blog->image) {
                    $blogSchema['image'] = [
                        '@type'  => 'ImageObject',
                        'url'    => $blog->image,
                        'width'  => 1200,
                        'height' => 630,
                    ];
                }

                $blogSchemas[] = $blogSchema;
            }

            // Save individual blog schemas
            foreach ($blogSchemas as $index => $schema) {
                $this->saveSchema($outputDir . '/blogs/blog-' . ($index + 1) . '.json', $schema);
            }

            // Save blog list schema
            $blogListSchema = [
                '@context'        => 'https://schema.org',
                '@type'           => 'ItemList',
                'name'            => 'Blog Posts',
                'description'     => 'Latest blog posts and articles from TaskPortals',
                'url'             => config('app.url') . '/blog',
                'itemListElement' => array_map(function ($blog, $index) {
                    return [
                        '@type'    => 'ListItem',
                        'position' => $index + 1,
                        'item'     => [
                            '@type'    => 'BlogPosting',
                            'headline' => $blog['headline'],
                            'url'      => $blog['mainEntityOfPage']['@id'],
                        ],
                    ];
                }, $blogSchemas, array_keys($blogSchemas)),
            ];

            $this->saveSchema($outputDir . '/blog-list.json', $blogListSchema);
            $this->info('✓ Blog schemas generated: ' . count($blogSchemas));
        } catch (\Exception $e) {
            $this->warn('Could not generate blog schemas: ' . $e->getMessage());
        }
    }

    private function generateMicroTaskSchemas($outputDir)
    {
        try {
            $tasks = MicroTask::with(['category', 'subcategory', 'user'])
                ->where('status', 'active')
                ->latest()
                ->take(200)
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
                    'jobBenefits'                   => [
                        'Flexible working hours',
                        'Remote work',
                        'Competitive pay',
                        'Skill development',
                    ],
                    'qualifications'                => 'Skills relevant to the task',
                    'responsibilities'              => $task->description,
                    'url'                           => config('app.url') . '/micro-task/' . $task->id,
                ];

                if ($task->category) {
                    $taskSchema['industry'] = $task->category->name;
                }

                $taskSchemas[] = $taskSchema;
            }

            // Save individual task schemas
            foreach ($taskSchemas as $index => $schema) {
                $this->saveSchema($outputDir . '/microtasks/task-' . ($index + 1) . '.json', $schema);
            }

            // Save task list schema
            $taskListSchema = [
                '@context'        => 'https://schema.org',
                '@type'           => 'ItemList',
                'name'            => 'Micro Tasks',
                'description'     => 'Available micro-jobs and freelance tasks on TaskPortals',
                'url'             => config('app.url') . '/micro-tasks',
                'itemListElement' => array_map(function ($task, $index) {
                    return [
                        '@type'    => 'ListItem',
                        'position' => $index + 1,
                        'item'     => [
                            '@type' => 'JobPosting',
                            'title' => $task['title'],
                            'url'   => $task['url'],
                        ],
                    ];
                }, $taskSchemas, array_keys($taskSchemas)),
            ];

            $this->saveSchema($outputDir . '/microtask-list.json', $taskListSchema);
            $this->info('✓ MicroTask schemas generated: ' . count($taskSchemas));
        } catch (\Exception $e) {
            $this->warn('Could not generate microtask schemas: ' . $e->getMessage());
        }
    }

    private function generateCategorySchemas($outputDir)
    {
        try {
            $categories      = MicroTaskCategory::with('subcategories')->get();
            $categorySchemas = [];

            foreach ($categories as $category) {
                $categorySchema = [
                    '@context'    => 'https://schema.org',
                    '@type'       => 'CollectionPage',
                    'name'        => $category->name . ' - Micro Tasks',
                    'description' => 'Browse micro tasks in the ' . $category->name . ' category',
                    'url'         => config('app.url') . '/category/' . $category->id,
                    'mainEntity'  => [
                        '@type'       => 'ItemList',
                        'name'        => $category->name . ' Tasks',
                        'description' => 'Micro tasks in ' . $category->name . ' category',
                    ],
                ];

                if ($category->subcategories->count() > 0) {
                    $subcategoryList = [];
                    foreach ($category->subcategories as $subcategory) {
                        $subcategoryList[] = [
                            '@type' => 'ListItem',
                            'name'  => $subcategory->name,
                            'url'   => config('app.url') . '/micro-tasks/category/' . $subcategory->id,
                        ];
                    }
                    $categorySchema['hasPart'] = $subcategoryList;
                }

                $categorySchemas[] = $categorySchema;
            }

            $this->saveSchema($outputDir . '/categories.json', $categorySchemas);
            $this->info('✓ Category schemas generated: ' . count($categorySchemas));
        } catch (\Exception $e) {
            $this->warn('Could not generate category schemas: ' . $e->getMessage());
        }
    }

    private function generateUserSchemas($outputDir)
    {
        try {
            $users       = User::with(['profile'])->take(50)->get();
            $userSchemas = [];

            foreach ($users as $user) {
                $userSchema = [
                    '@context' => 'https://schema.org',
                    '@type'    => 'Person',
                    'name'     => $user->name,
                    'email'    => $user->email,
                    'url'      => config('app.url') . '/profile/' . $user->id,
                    'memberOf' => [
                        '@type' => 'Organization',
                        'name'  => 'TaskPortals',
                    ],
                ];

                if ($user->profile) {
                    $userSchema['description'] = $user->profile->bio ?? 'TaskPortals user';
                    $userSchema['knowsAbout']  = $user->profile->skills ?? [];
                }

                $userSchemas[] = $userSchema;
            }

            $this->saveSchema($outputDir . '/users.json', $userSchemas);
            $this->info('✓ User schemas generated: ' . count($userSchemas));
        } catch (\Exception $e) {
            $this->warn('Could not generate user schemas: ' . $e->getMessage());
        }
    }

    private function generateFaqSchemas($outputDir)
    {
        // This would typically come from a FAQ model
        $faqSchema = [
            '@context'   => 'https://schema.org',
            '@type'      => 'FAQPage',
            'mainEntity' => [
                [
                    '@type'          => 'Question',
                    'name'           => 'What is TaskPortals?',
                    'acceptedAnswer' => [
                        '@type' => 'Answer',
                        'text'  => 'TaskPortals is a micro-job platform that connects freelancers with employers for various tasks and projects.',
                    ],
                ],
                [
                    '@type'          => 'Question',
                    'name'           => 'How do I get paid?',
                    'acceptedAnswer' => [
                        '@type' => 'Answer',
                        'text'  => 'Payments are processed through our secure payment system after task completion and approval.',
                    ],
                ],
                [
                    '@type'          => 'Question',
                    'name'           => 'What types of tasks are available?',
                    'acceptedAnswer' => [
                        '@type' => 'Answer',
                        'text'  => 'We offer a wide variety of micro-tasks including writing, design, programming, data entry, and more.',
                    ],
                ],
            ],
        ];

        $this->saveSchema($outputDir . '/faq.json', $faqSchema);
        $this->info('✓ FAQ schema generated');
    }

    private function generateLocalBusinessSchema($outputDir)
    {
        $schema = [
            '@context'     => 'https://schema.org',
            '@type'        => 'LocalBusiness',
            'name'         => 'TaskPortals',
            'description'  => 'Online micro-job platform and freelance marketplace',
            'url'          => config('app.url'),
            'telephone'    => '+1-555-0123',
            'email'        => 'contact@taskportals.com',
            'address'      => [
                '@type'           => 'PostalAddress',
                'addressCountry'  => 'US',
                'addressLocality' => 'New York',
                'addressRegion'   => 'NY',
                'postalCode'      => '10001',
            ],
            'geo'          => [
                '@type'     => 'GeoCoordinates',
                'latitude'  => 40.7128,
                'longitude' => -74.0060,
            ],
            'openingHours' => 'Mo-Su 00:00-23:59',
            'sameAs'       => [
                'https://facebook.com/taskportals',
                'https://twitter.com/taskportals',
            ],
            'serviceArea'  => [
                '@type' => 'Country',
                'name'  => 'Worldwide',
            ],
        ];

        $this->saveSchema($outputDir . '/local-business.json', $schema);
        $this->info('✓ Local Business schema generated');
    }

    private function generateBreadcrumbSchemas($outputDir)
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
                [
                    '@type'    => 'ListItem',
                    'position' => 4,
                    'About',
                    'item'     => config('app.url') . '/about',
                ],
            ],
        ];

        $this->saveSchema($outputDir . '/breadcrumbs.json', $breadcrumbSchema);
        $this->info('✓ Breadcrumb schema generated');
    }

    private function generateSearchSchemas($outputDir)
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

        $this->saveSchema($outputDir . '/search.json', $searchSchema);
        $this->info('✓ Search schema generated');
    }

    private function generateSitemapIndex($outputDir)
    {
        $sitemapIndex = [
            '@context'        => 'https://schema.org',
            '@type'           => 'ItemList',
            'name'            => 'Schema Sitemap Index',
            'description'     => 'Index of all structured data schemas',
            'url'             => config('app.url') . '/schemas',
            'itemListElement' => [
                [
                    '@type'    => 'ListItem',
                    'position' => 1,
                    'name'     => 'Organization Schema',
                    'item'     => config('app.url') . '/schemas/organization.json',
                ],
                [
                    '@type'    => 'ListItem',
                    'position' => 2,
                    'name'     => 'Website Schema',
                    'item'     => config('app.url') . '/schemas/website.json',
                ],
                [
                    '@type'    => 'ListItem',
                    'position' => 3,
                    'name'     => 'Blog List Schema',
                    'item'     => config('app.url') . '/schemas/blog-list.json',
                ],
                [
                    '@type'    => 'ListItem',
                    'position' => 4,
                    'name'     => 'MicroTask List Schema',
                    'item'     => config('app.url') . '/schemas/microtask-list.json',
                ],
                [
                    '@type'    => 'ListItem',
                    'position' => 5,
                    'name'     => 'Categories Schema',
                    'item'     => config('app.url') . '/schemas/categories.json',
                ],
            ],
        ];

        $this->saveSchema($outputDir . '/schema-index.json', $sitemapIndex);
        $this->info('✓ Schema index generated');
    }

    private function saveSchema($path, $data)
    {
        $directory = dirname($path);

        if (! File::exists($directory)) {
            File::makeDirectory($directory, 0755, true);
        }

        File::put($path, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
    }
}
