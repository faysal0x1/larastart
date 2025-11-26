import AppLayout from '@/layouts/app-layout.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function create() {
    const { permissions, auth } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        // Basic Meta Tags
        meta_title: '',
        meta_author: '',
        meta_keyword: '',
        meta_description: '',
        meta_robots: 'index, follow',
        canonical_url: '',

        // Open Graph Tags
        og_title: '',
        og_description: '',
        og_type: 'website',
        og_url: '',
        og_image: '',
        og_image_alt: '',
        og_site_name: '',
        og_locale: 'en_US',

        // Twitter Card Tags
        twitter_card: 'summary_large_image',
        twitter_title: '',
        twitter_description: '',
        twitter_image: '',
        twitter_site: '',
        twitter_creator: '',

        // Favicon and Icons
        favicon: '',
        apple_touch_icon: '',
        manifest_icon: '',

        // Additional Meta
        // theme_color: '',
        author: '',
        copyright: '',
        // language: 'en',

        // Structured Data
        schema_markup: '',

        // Tracking Scripts
        google_analytics: '',
        fb_pixel_id: '',
        // additional_tracking_scripts: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('site-seo.store'), {
            data,
            onSuccess: () => {
                toast.success('SiteSeo created successfully!');
            },
            onError: (errors) => {
                toast.error('Failed to create SiteSeo. Please check the form for errors.');
            },
        });
    };

    const breadcrumbs = [
        {
            title: 'Create SiteSeo',
            href: '/siteseo',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create SiteSeo" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Create New SiteSeo</CardTitle>
                            <CardDescription>Add comprehensive SEO settings including meta tags, OG tags, Twitter cards, and tracking scripts</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Basic Meta Tags Section */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold border-b pb-2">Basic Meta Tags</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="meta_title">Meta Title</Label>
                                            <Input
                                                id="meta_title"
                                                value={data.meta_title}
                                                onChange={(e) => setData('meta_title', e.target.value)}
                                                placeholder="Page title (50-60 characters)"
                                                className={errors.meta_title ? 'border-red-500' : ''}
                                            />
                                            {errors.meta_title && <p className="text-sm text-red-500">{errors.meta_title}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="meta_author">Meta Author</Label>
                                            <Input
                                                id="meta_author"
                                                value={data.meta_author}
                                                onChange={(e) => setData('meta_author', e.target.value)}
                                                placeholder="Author name"
                                                className={errors.meta_author ? 'border-red-500' : ''}
                                            />
                                            {errors.meta_author && <p className="text-sm text-red-500">{errors.meta_author}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="meta_keyword">Meta Keywords</Label>
                                            <Input
                                                id="meta_keyword"
                                                value={data.meta_keyword}
                                                onChange={(e) => setData('meta_keyword', e.target.value)}
                                                placeholder="keyword1, keyword2, keyword3"
                                                className={errors.meta_keyword ? 'border-red-500' : ''}
                                            />
                                            {errors.meta_keyword && <p className="text-sm text-red-500">{errors.meta_keyword}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="meta_robots">Meta Robots</Label>
                                            <Input
                                                id="meta_robots"
                                                value={data.meta_robots}
                                                onChange={(e) => setData('meta_robots', e.target.value)}
                                                placeholder="index, follow"
                                                className={errors.meta_robots ? 'border-red-500' : ''}
                                            />
                                            {errors.meta_robots && <p className="text-sm text-red-500">{errors.meta_robots}</p>}
                                        </div>

                                        <div className="space-y-2 md:col-span-2">
                                            <Label htmlFor="meta_description">Meta Description</Label>
                                            <Textarea
                                                id="meta_description"
                                                value={data.meta_description}
                                                onChange={(e) => setData('meta_description', e.target.value)}
                                                placeholder="Page description (150-160 characters)"
                                                rows={3}
                                                className={errors.meta_description ? 'border-red-500' : ''}
                                            />
                                            {errors.meta_description && <p className="text-sm text-red-500">{errors.meta_description}</p>}
                                        </div>

                                        <div className="space-y-2 md:col-span-2">
                                            <Label htmlFor="canonical_url">Canonical URL</Label>
                                            <Input
                                                id="canonical_url"
                                                type="url"
                                                value={data.canonical_url}
                                                onChange={(e) => setData('canonical_url', e.target.value)}
                                                placeholder="https://example.com/page"
                                                className={errors.canonical_url ? 'border-red-500' : ''}
                                            />
                                            {errors.canonical_url && <p className="text-sm text-red-500">{errors.canonical_url}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="author">Author</Label>
                                            <Input
                                                id="author"
                                                value={data.author}
                                                onChange={(e) => setData('author', e.target.value)}
                                                placeholder="Author name"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="copyright">Copyright</Label>
                                            <Input
                                                id="copyright"
                                                value={data.copyright}
                                                onChange={(e) => setData('copyright', e.target.value)}
                                                placeholder="© 2025 Company Name"
                                            />
                                        </div>

                                        {/* <div className="space-y-2">
                                            <Label htmlFor="language">Language</Label>
                                            <Input
                                                id="language"
                                                value={data.language}
                                                onChange={(e) => setData('language', e.target.value)}
                                                placeholder="en"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="theme_color">Theme Color</Label>
                                            <Input
                                                id="theme_color"
                                                type="color"
                                                value={data.theme_color || '#000000'}
                                                onChange={(e) => setData('theme_color', e.target.value)}
                                            />
                                        </div> */}
                                    </div>
                                </div>

                                {/* Open Graph Tags Section */}
                                <div className="space-y-4 pt-6 border-t">
                                    <h3 className="text-lg font-semibold border-b pb-2">Open Graph Tags</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="og_title">OG Title</Label>
                                            <Input
                                                id="og_title"
                                                value={data.og_title}
                                                onChange={(e) => setData('og_title', e.target.value)}
                                                placeholder="Open Graph title"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="og_type">OG Type</Label>
                                            <Input
                                                id="og_type"
                                                value={data.og_type}
                                                onChange={(e) => setData('og_type', e.target.value)}
                                                placeholder="website"
                                            />
                                        </div>

                                        <div className="space-y-2 md:col-span-2">
                                            <Label htmlFor="og_description">OG Description</Label>
                                            <Textarea
                                                id="og_description"
                                                value={data.og_description}
                                                onChange={(e) => setData('og_description', e.target.value)}
                                                placeholder="Open Graph description"
                                                rows={3}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="og_url">OG URL</Label>
                                            <Input
                                                id="og_url"
                                                type="url"
                                                value={data.og_url}
                                                onChange={(e) => setData('og_url', e.target.value)}
                                                placeholder="https://example.com"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="og_image">OG Image</Label>
                                            <Input
                                                id="og_image"
                                                type="url"
                                                value={data.og_image}
                                                onChange={(e) => setData('og_image', e.target.value)}
                                                placeholder="https://example.com/image.jpg"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="og_image_alt">OG Image Alt</Label>
                                            <Input
                                                id="og_image_alt"
                                                value={data.og_image_alt}
                                                onChange={(e) => setData('og_image_alt', e.target.value)}
                                                placeholder="Image description"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="og_site_name">OG Site Name</Label>
                                            <Input
                                                id="og_site_name"
                                                value={data.og_site_name}
                                                onChange={(e) => setData('og_site_name', e.target.value)}
                                                placeholder="Site name"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="og_locale">OG Locale</Label>
                                            <Input
                                                id="og_locale"
                                                value={data.og_locale}
                                                onChange={(e) => setData('og_locale', e.target.value)}
                                                placeholder="en_US"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Twitter Card Tags Section */}
                                <div className="space-y-4 pt-6 border-t">
                                    <h3 className="text-lg font-semibold border-b pb-2">Twitter Card Tags</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="twitter_card">Twitter Card Type</Label>
                                            <Input
                                                id="twitter_card"
                                                value={data.twitter_card}
                                                onChange={(e) => setData('twitter_card', e.target.value)}
                                                placeholder="summary_large_image"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="twitter_title">Twitter Title</Label>
                                            <Input
                                                id="twitter_title"
                                                value={data.twitter_title}
                                                onChange={(e) => setData('twitter_title', e.target.value)}
                                                placeholder="Twitter card title"
                                            />
                                        </div>

                                        <div className="space-y-2 md:col-span-2">
                                            <Label htmlFor="twitter_description">Twitter Description</Label>
                                            <Textarea
                                                id="twitter_description"
                                                value={data.twitter_description}
                                                onChange={(e) => setData('twitter_description', e.target.value)}
                                                placeholder="Twitter card description"
                                                rows={3}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="twitter_image">Twitter Image</Label>
                                            <Input
                                                id="twitter_image"
                                                type="url"
                                                value={data.twitter_image}
                                                onChange={(e) => setData('twitter_image', e.target.value)}
                                                placeholder="https://example.com/image.jpg"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="twitter_site">Twitter Site</Label>
                                            <Input
                                                id="twitter_site"
                                                value={data.twitter_site}
                                                onChange={(e) => setData('twitter_site', e.target.value)}
                                                placeholder="@username"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="twitter_creator">Twitter Creator</Label>
                                            <Input
                                                id="twitter_creator"
                                                value={data.twitter_creator}
                                                onChange={(e) => setData('twitter_creator', e.target.value)}
                                                placeholder="@username"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Icons Section */}
                                <div className="space-y-4 pt-6 border-t">
                                    <h3 className="text-lg font-semibold border-b pb-2">Favicon & Icons</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="favicon">Favicon URL</Label>
                                            <Input
                                                id="favicon"
                                                type="url"
                                                value={data.favicon}
                                                onChange={(e) => setData('favicon', e.target.value)}
                                                placeholder="https://example.com/favicon.ico"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="apple_touch_icon">Apple Touch Icon</Label>
                                            <Input
                                                id="apple_touch_icon"
                                                type="url"
                                                value={data.apple_touch_icon}
                                                onChange={(e) => setData('apple_touch_icon', e.target.value)}
                                                placeholder="https://example.com/apple-touch-icon.png"
                                            />
                                        </div>

                                        <div className="space-y-2 md:col-span-2">
                                            <Label htmlFor="manifest_icon">Manifest Icon</Label>
                                            <Input
                                                id="manifest_icon"
                                                type="url"
                                                value={data.manifest_icon}
                                                onChange={(e) => setData('manifest_icon', e.target.value)}
                                                placeholder="https://example.com/manifest-icon.png"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Tracking Scripts Section */}
                                <div className="space-y-4 pt-6 border-t">
                                    <h3 className="text-lg font-semibold border-b pb-2">Tracking Scripts & Structured Data</h3>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="google_analytics">Google Analytics Script</Label>
                                            <Textarea
                                                id="google_analytics"
                                                value={data.google_analytics}
                                                onChange={(e) => setData('google_analytics', e.target.value)}
                                                placeholder="Paste Google Analytics tracking code here"
                                                rows={5}
                                                className="font-mono text-sm"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="fb_pixel_id">Facebook Pixel ID / Script</Label>
                                            <Textarea
                                                id="fb_pixel_id"
                                                value={data.fb_pixel_id}
                                                onChange={(e) => setData('fb_pixel_id', e.target.value)}
                                                placeholder="Paste Facebook Pixel code or ID here"
                                                rows={5}
                                                className="font-mono text-sm"
                                            />
                                        </div>

                                        {/* <div className="space-y-2">
                                            <Label htmlFor="additional_tracking_scripts">Additional Tracking Scripts</Label>
                                            <Textarea
                                                id="additional_tracking_scripts"
                                                value={data.additional_tracking_scripts}
                                                onChange={(e) => setData('additional_tracking_scripts', e.target.value)}
                                                placeholder="Paste any additional tracking scripts here"
                                                rows={5}
                                                className="font-mono text-sm"
                                            />
                                        </div> */}

                                        <div className="space-y-2">
                                            <Label htmlFor="schema_markup">Schema.org / Structured Data (JSON-LD)</Label>
                                            <Textarea
                                                id="schema_markup"
                                                value={data.schema_markup}
                                                onChange={(e) => setData('schema_markup', e.target.value)}
                                                placeholder='{"@context": "https://schema.org", ...}'
                                                rows={8}
                                                className="font-mono text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4 pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => window.history.back()}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Creating...' : 'Create SiteSeo'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
