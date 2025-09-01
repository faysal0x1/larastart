<?php
namespace App\Services;

use App\Models\Blog;
use Illuminate\Support\Facades\URL;

class SchemaService
{
    public function generatePageSchema($page, $data = [])
    {
        switch ($page) {
            case 'home':
                return $this->generateHomeSchema();
            case 'blog':
                return $this->generateBlogListSchema();
            case 'blog-detail':
                return $this->generateBlogDetailSchema($data);
            case 'microtasks':
                return $this->generateMicroTaskListSchema();
            case 'microtask-detail':
                return $this->generateMicroTaskDetailSchema($data);
            case 'category':
                return $this->generateCategorySchema($data);
            case 'search':
                return $this->generateSearchSchema($data);
            default:
                return $this->generateDefaultSchema();
        }
    }

    public function generateHomeSchema()
    {
        return [
            '@context'    => 'https://schema.org',
            '@type'       => 'WebPage',
            'name'        => 'TaskPortals - Micro-Job Platform',
            'description' => 'Find and complete micro-jobs, freelance tasks, and short-term projects. Connect with employers and freelancers worldwide.',
            'url'         => URL::current(),
            'mainEntity'  => [
                '@type'       => 'Organization',
                'name'        => 'TaskPortals',
                'description' => 'A comprehensive micro-job platform connecting freelancers with employers for various tasks and projects.',
                'url'         => config('app.url'),
                'logo'        => config('app.url') . '/assets/logo.png',
                'sameAs'      => [
                    'https://facebook.com/taskportals',
                    'https://twitter.com/taskportals',
                    'https://linkedin.com/company/taskportals',
                ],
            ],
            'breadcrumb'  => [
                '@type'           => 'BreadcrumbList',
                'itemListElement' => [
                    [
                        '@type'    => 'ListItem',
                        'position' => 1,
                        'name'     => 'Home',
                        'item'     => config('app.url'),
                    ],
                ],
            ],
        ];
    }

    public function generateBlogListSchema()
    {
        try {
            $blogs    = Blog::with('user')->latest()->take(10)->get();
            $blogList = [];

            foreach ($blogs as $blog) {
                $blogList[] = [
                    '@type'         => 'BlogPosting',
                    'headline'      => $blog->title,
                    'description'   => $blog->description ?? substr($blog->content, 0, 150),
                    'author'        => [
                        '@type' => 'Person',
                        'name'  => $blog->user->name ?? 'Anonymous',
                    ],
                    'datePublished' => $blog->created_at->toISOString(),
                    'url'           => URL::to('/blog/' . $blog->id),
                ];
            }

            return [
                '@context'        => 'https://schema.org',
                '@type'           => 'ItemList',
                'name'            => 'Blog Posts',
                'description'     => 'Latest blog posts and articles from TaskPortals',
                'url'             => URL::current(),
                'itemListElement' => $blogList,
                'breadcrumb'      => [
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
                            'name'     => 'Blog',
                            'item'     => URL::current(),
                        ],
                    ],
                ],
            ];
        } catch (\Exception $e) {
            return $this->generateDefaultSchema();
        }
    }

    public function generateBlogDetailSchema($blog)
    {
        if (! $blog) {
            return $this->generateDefaultSchema();
        }

        $schema = [
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
                '@id'   => URL::current(),
            ],
            'breadcrumb'       => [
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
                        'name'     => 'Blog',
                        'item'     => URL::to('/blog'),
                    ],
                    [
                        '@type'    => 'ListItem',
                        'position' => 3,
                        'name'     => $blog->title,
                        'item'     => URL::current(),
                    ],
                ],
            ],
        ];

        if ($blog->image) {
            $schema['image'] = [
                '@type'  => 'ImageObject',
                'url'    => $blog->image,
                'width'  => 1200,
                'height' => 630,
            ];
        }

        return $schema;
    }

    public function generateMicroTaskListSchema()
    {
        try {
            $tasks = MicroTask::with(['category', 'subcategory'])
                ->where('status', 'active')
                ->latest()
                ->take(20)
                ->get();

            $taskList = [];

            foreach ($tasks as $task) {
                $taskList[] = [
                    '@type'           => 'JobPosting',
                    'title'           => $task->title,
                    'description'     => substr($task->description, 0, 150),
                    'datePosted'      => $task->created_at->toISOString(),
                    'employmentType'  => 'CONTRACTOR',
                    'jobLocationType' => 'TELECOMMUTE',
                    'url'             => URL::to('/micro-task/' . $task->id),
                ];
            }

            return [
                '@context'        => 'https://schema.org',
                '@type'           => 'ItemList',
                'name'            => 'Micro Tasks',
                'description'     => 'Available micro-jobs and freelance tasks on TaskPortals',
                'url'             => URL::current(),
                'itemListElement' => $taskList,
                'breadcrumb'      => [
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
                            'item'     => URL::current(),
                        ],
                    ],
                ],
            ];
        } catch (\Exception $e) {
            return $this->generateDefaultSchema();
        }
    }

    public function generateMicroTaskDetailSchema($task)
    {
        if (! $task) {
            return $this->generateDefaultSchema();
        }

        $schema = [
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
            'breadcrumb'                    => [
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
                        'item'     => URL::to('/micro-tasks'),
                    ],
                    [
                        '@type'    => 'ListItem',
                        'position' => 3,
                        'name'     => $task->title,
                        'item'     => URL::current(),
                    ],
                ],
            ],
        ];

        if ($task->category) {
            $schema['industry'] = $task->category->name;
        }

        return $schema;
    }

    public function generateCategorySchema($category)
    {
        if (! $category) {
            return $this->generateDefaultSchema();
        }

        return [
            '@context'    => 'https://schema.org',
            '@type'       => 'CollectionPage',
            'name'        => $category->name . ' - Micro Tasks',
            'description' => 'Browse micro tasks in the ' . $category->name . ' category',
            'url'         => URL::current(),
            'breadcrumb'  => [
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
                        'item'     => URL::to('/micro-tasks'),
                    ],
                    [
                        '@type'    => 'ListItem',
                        'position' => 3,
                        'name'     => $category->name,
                        'item'     => URL::current(),
                    ],
                ],
            ],
        ];
    }

    public function generateSearchSchema($query)
    {
        return [
            '@context'    => 'https://schema.org',
            '@type'       => 'SearchResultsPage',
            'name'        => 'Search Results',
            'description' => 'Search results for: ' . ($query ?? ''),
            'url'         => URL::current(),
            'breadcrumb'  => [
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
                        'name'     => 'Search',
                        'item'     => URL::current(),
                    ],
                ],
            ],
        ];
    }

    public function generateDefaultSchema()
    {
        return [
            '@context'    => 'https://schema.org',
            '@type'       => 'WebPage',
            'name'        => 'TaskPortals',
            'description' => 'A comprehensive micro-job platform connecting freelancers with employers',
            'url'         => URL::current(),
        ];
    }

    public function generateFaqSchema($faqs)
    {
        if (empty($faqs)) {
            return null;
        }

        $faqList = [];
        foreach ($faqs as $faq) {
            $faqList[] = [
                '@type'          => 'Question',
                'name'           => $faq->question,
                'acceptedAnswer' => [
                    '@type' => 'Answer',
                    'text'  => $faq->answer,
                ],
            ];
        }

        return [
            '@context'   => 'https://schema.org',
            '@type'      => 'FAQPage',
            'mainEntity' => $faqList,
        ];
    }

    public function generateLocalBusinessSchema()
    {
        return [
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
        ];
    }
}
