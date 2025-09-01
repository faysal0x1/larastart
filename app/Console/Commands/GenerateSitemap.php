<?php
namespace App\Console\Commands;

use App\Models\Blog;
use App\Models\MicroTask;
use App\Models\MicroTaskCategory;
use App\Models\MicroTaskSubCategory;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;

class GenerateSitemap extends Command
{
    protected $signature   = 'sitemap:generate';
    protected $description = 'Generate sitemap.xml for the website';

    public function handle()
    {
        $this->info('Generating sitemap...');

        $urls    = $this->getUrls();
        $sitemap = $this->generateSitemap($urls);

        $path = public_path('sitemap.xml');
        File::put($path, $sitemap);

        $this->info("Sitemap generated successfully at: {$path}");
        $this->info("Total URLs: " . count($urls));

        return 0;
    }

    private function getUrls(): array
    {
        $urls    = [];
        $baseUrl = config('app.url');

        // Static pages
        $staticPages = [
            ''               => 'home',
            'about'          => 'about',
            'career'         => 'career',
            'terms'          => 'terms',
            'pp'             => 'policy.privacy',
            'cp'             => 'cookie.policy',
            'learn-more'     => 'learn.more',
            'contact'        => 'contact',
            'Faq'            => 'faqs',
            'blogs'          => 'blogs',
            'microtask-jobs' => 'micro.tasks',
            'micro-tasks'    => 'micro.tasks.listing',
        ];

        foreach ($staticPages as $path => $routeName) {
            if (Route::has($routeName)) {
                $urls[] = [
                    'loc'        => $baseUrl . '/' . $path,
                    'lastmod'    => Carbon::now()->toISOString(),
                    'changefreq' => 'weekly',
                    'priority'   => $path === '' ? '1.0' : '0.8',
                ];
            }
        }

        // Blog posts
        try {
            $blogs = Blog::where('status', 'published')->get();
            foreach ($blogs as $blog) {
                $urls[] = [
                    'loc'        => $baseUrl . '/blog/' . $blog->slug,
                    'lastmod'    => $blog->updated_at ? $blog->updated_at->toISOString() : Carbon::now()->toISOString(),
                    'changefreq' => 'monthly',
                    'priority'   => '0.6',
                ];
            }
        } catch (\Exception $e) {
            $this->warn('Could not fetch blogs: ' . $e->getMessage());
        }

        // Micro tasks
        try {
            $microTasks = MicroTask::where('status', 'active')->get();
            foreach ($microTasks as $task) {
                $urls[] = [
                    'loc'        => $baseUrl . '/task/' . $task->slug,
                    'lastmod'    => $task->updated_at ? $task->updated_at->toISOString() : Carbon::now()->toISOString(),
                    'changefreq' => 'daily',
                    'priority'   => '0.7',
                ];
            }
        } catch (\Exception $e) {
            $this->warn('Could not fetch micro tasks: ' . $e->getMessage());
        }

        // Categories
        try {
            $categories = MicroTaskCategory::all();
            foreach ($categories as $category) {
                $urls[] = [
                    'loc'        => $baseUrl . '/category/' . $category->id,
                    'lastmod'    => $category->updated_at ? $category->updated_at->toISOString() : Carbon::now()->toISOString(),
                    'changefreq' => 'weekly',
                    'priority'   => '0.6',
                ];
            }
        } catch (\Exception $e) {
            $this->warn('Could not fetch categories: ' . $e->getMessage());
        }

        // Subcategories
        try {
            $subcategories = MicroTaskSubCategory::all();
            foreach ($subcategories as $subcategory) {
                $urls[] = [
                    'loc'        => $baseUrl . '/micro-tasks/category/' . $subcategory->id,
                    'lastmod'    => $subcategory->updated_at ? $subcategory->updated_at->toISOString() : Carbon::now()->toISOString(),
                    'changefreq' => 'weekly',
                    'priority'   => '0.5',
                ];
            }
        } catch (\Exception $e) {
            $this->warn('Could not fetch subcategories: ' . $e->getMessage());
        }

        return $urls;
    }

    private function generateSitemap(array $urls): string
    {
        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"' . "\n";
        $xml .= ' xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"' . "\n";
        $xml .= ' xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">' . "\n\n";

        foreach ($urls as $url) {
            $xml .= " <url>\n";
            $xml .= " <loc>{$url['loc']}</loc>\n";
            $xml .= " <lastmod>{$url['lastmod']}</lastmod>\n";
            $xml .= " <changefreq>{$url['changefreq']}</changefreq>\n";
            $xml .= " <priority>{$url['priority']}</priority>\n";
            $xml .= " </url>\n\n";
        }

        $xml .= '</urlset>';

        return $xml;
    }
}
