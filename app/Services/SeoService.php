<?php
namespace App\Services;

use App\Models\Blog;
use App\Models\MicroTask;
use App\Models\MicroTaskCategory;
use App\Models\MicroTaskSubCategory;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class SeoService
{
    public function generateSitemap(): array
    {
        $urls    = [];
        $baseUrl = config('app.url');

        // Static pages with SEO priorities
        $staticPages = [
            ''               => ['priority' => '1.0', 'changefreq' => 'daily'],
            'about'          => ['priority' => '0.8', 'changefreq' => 'monthly'],
            'career'         => ['priority' => '0.7', 'changefreq' => 'monthly'],
            'terms'          => ['priority' => '0.5', 'changefreq' => 'yearly'],
            'pp'             => ['priority' => '0.5', 'changefreq' => 'yearly'],
            'cp'             => ['priority' => '0.5', 'changefreq' => 'yearly'],
            'learn-more'     => ['priority' => '0.7', 'changefreq' => 'monthly'],
            'contact'        => ['priority' => '0.6', 'changefreq' => 'monthly'],
            'Faq'            => ['priority' => '0.7', 'changefreq' => 'weekly'],
            'blogs'          => ['priority' => '0.8', 'changefreq' => 'daily'],
            'microtask-jobs' => ['priority' => '0.9', 'changefreq' => 'daily'],
            'micro-tasks'    => ['priority' => '0.9', 'changefreq' => 'daily'],
        ];

        foreach ($staticPages as $path => $seo) {
            $urls[] = [
                'loc'        => $baseUrl . '/' . $path,
                'lastmod'    => Carbon::now()->toISOString(),
                'changefreq' => $seo['changefreq'],
                'priority'   => $seo['priority'],
            ];
        }

        // Dynamic content
        $this->addBlogUrls($urls, $baseUrl);
        $this->addMicroTaskUrls($urls, $baseUrl);
        $this->addCategoryUrls($urls, $baseUrl);

        return $urls;
    }

    private function addBlogUrls(array &$urls, string $baseUrl): void
    {
        try {
            $blogs = Blog::where('status', 'published')
                ->whereNotNull('slug')
                ->get();

            foreach ($blogs as $blog) {
                $urls[] = [
                    'loc'        => $baseUrl . '/blog/' . $blog->slug,
                    'lastmod'    => $blog->updated_at->toISOString(),
                    'changefreq' => 'monthly',
                    'priority'   => '0.6',
                ];
            }
        } catch (\Exception $e) {
            // Log error but continue
            Log::warning('Could not fetch blogs for sitemap: ' . $e->getMessage());
        }
    }

    private function addMicroTaskUrls(array &$urls, string $baseUrl): void
    {
        try {
            $microTasks = MicroTask::where('status', 'active')
                ->whereNotNull('slug')
                ->get();

            foreach ($microTasks as $task) {
                $urls[] = [
                    'loc'        => $baseUrl . '/task/' . $task->slug,
                    'lastmod'    => $task->updated_at->toISOString(),
                    'changefreq' => 'daily',
                    'priority'   => '0.7',
                ];
            }
        } catch (\Exception $e) {
            Log::warning('Could not fetch micro tasks for sitemap: ' . $e->getMessage());
        }
    }

    private function addCategoryUrls(array &$urls, string $baseUrl): void
    {
        try {
            // Main categories
            $categories = MicroTaskCategory::all();
            foreach ($categories as $category) {
                $urls[] = [
                    'loc'        => $baseUrl . '/category/' . $category->id,
                    'lastmod'    => $category->updated_at->toISOString(),
                    'changefreq' => 'weekly',
                    'priority'   => '0.6',
                ];
            }

            // Subcategories
            $subcategories = MicroTaskSubCategory::all();
            foreach ($subcategories as $subcategory) {
                $urls[] = [
                    'loc'        => $baseUrl . '/micro-tasks/category/' . $subcategory->id,
                    'lastmod'    => $subcategory->updated_at->toISOString(),
                    'changefreq' => 'weekly',
                    'priority'   => '0.5',
                ];
            }
        } catch (\Exception $e) {
            Log::warning('Could not fetch categories for sitemap: ' . $e->getMessage());
        }
    }

    public function generateStructuredData(string $type, array $data = []): array
    {
        $baseData = [
            '@context' => 'https://schema.org',
            '@type'    => $type,
        ];

        switch ($type) {
            case 'Organization':
                return array_merge($baseData, [
                    'name'         => 'TaskPortals',
                    'url'          => config('app.url'),
                    'logo'         => config('app.url') . '/assets/logo.png',
                    'description'  => 'Premier platform for microtasks, freelance opportunities, and secure earnings management.',
                    'foundingDate' => '2024',
                    'contactPoint' => [
                        '@type'             => 'ContactPoint',
                        'contactType'       => 'customer service',
                        'availableLanguage' => 'English',
                    ],
                ]);

            case 'WebSite':
                return array_merge($baseData, [
                    'name'            => 'TaskPortals',
                    'url'             => config('app.url'),
                    'potentialAction' => [
                        '@type'       => 'SearchAction',
                        'target'      => config('app.url') . '/search?q={search_term_string}',
                        'query-input' => 'required name=search_term_string',
                    ],
                ]);

            case 'BlogPosting':
                return array_merge($baseData, $data);

            case 'JobPosting':
                return array_merge($baseData, $data);

            default:
                return $baseData;
        }
    }

    public function getMetaTags(string $page, array $data = []): array
    {
        $baseTags = [
            'viewport'                              => 'width=device-width, initial-scale=1.0',
            'charset'                               => 'UTF-8',
            'generator'                             => 'TaskPortals Platform',
            'application-name'                      => 'TaskPortals',
            'apple-mobile-web-app-capable'          => 'yes',
            'apple-mobile-web-app-status-bar-style' => 'default',
            'apple-mobile-web-app-title'            => 'TaskPortals',
            'format-detection'                      => 'telephone=no',
        ];

        $pageSpecificTags = $this->getPageSpecificTags($page, $data);

        return array_merge($baseTags, $pageSpecificTags);
    }

    private function getPageSpecificTags(string $page, array $data): array
    {
        switch ($page) {
            case 'home':
                return [
                    'title'          => 'TaskPortals - Premier Microtask & Freelance Platform',
                    'description'    => 'Find microtasks, freelance opportunities, and manage your earnings securely on TaskPortals.',
                    'keywords'       => 'microtasks, freelance, online jobs, remote work, task management',
                    'og:title'       => 'TaskPortals - Premier Microtask & Freelance Platform',
                    'og:description' => 'Find microtasks, freelance opportunities, and manage your earnings securely.',
                    'og:type'        => 'website',
                    'twitter:card'   => 'summary_large_image',
                ];

            case 'blog':
                return [
                    'title'          => 'Blog - TaskPortals',
                    'description'    => 'Latest insights, tips, and updates from the TaskPortals community.',
                    'og:title'       => 'Blog - TaskPortals',
                    'og:description' => 'Latest insights and updates from TaskPortals.',
                    'og:type'        => 'website',
                ];

            case 'microtasks':
                return [
                    'title'          => 'Microtasks - TaskPortals',
                    'description'    => 'Browse and complete microtasks to earn money online.',
                    'og:title'       => 'Microtasks - TaskPortals',
                    'og:description' => 'Browse and complete microtasks to earn money online.',
                    'og:type'        => 'website',
                ];

            default:
                return [
                    'title'       => 'TaskPortals',
                    'description' => 'Premier platform for microtasks and freelance opportunities.',
                ];
        }
    }
}
