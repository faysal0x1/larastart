import AppLayout from '@/layouts/app-layout.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Head, Form, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useEffect, useRef, useState } from 'react';

export default function edit() {
    const { siteseo, permissions, auth, flash, errors } = usePage().props;

    const initialMedia = {
        og_image: siteseo?.og_image_url || siteseo?.og_image || '',
        twitter_image: siteseo?.twitter_image_url || siteseo?.twitter_image || '',
        favicon: siteseo?.favicon_url || siteseo?.favicon || '',
        apple_touch_icon: siteseo?.apple_touch_icon_url || siteseo?.apple_touch_icon || '',
        manifest_icon: siteseo?.manifest_icon_url || siteseo?.manifest_icon || '',
    };

    const [mediaPreviews, setMediaPreviews] = useState(initialMedia);
    const initialMediaRef = useRef(initialMedia);
    const mediaObjectUrlsRef = useRef({});

    // Show toast notifications for flash messages
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    useEffect(() => {
        const nextMedia = {
            og_image: siteseo?.og_image_url || siteseo?.og_image || '',
            twitter_image: siteseo?.twitter_image_url || siteseo?.twitter_image || '',
            favicon: siteseo?.favicon_url || siteseo?.favicon || '',
            apple_touch_icon: siteseo?.apple_touch_icon_url || siteseo?.apple_touch_icon || '',
            manifest_icon: siteseo?.manifest_icon_url || siteseo?.manifest_icon || '',
        };

        initialMediaRef.current = nextMedia;
        setMediaPreviews(nextMedia);
    }, [
        siteseo?.og_image_url,
        siteseo?.twitter_image_url,
        siteseo?.favicon_url,
        siteseo?.apple_touch_icon_url,
        siteseo?.manifest_icon_url,
    ]);

    useEffect(() => {
        return () => {
            Object.values(mediaObjectUrlsRef.current).forEach((url) => {
                if (url) {
                    URL.revokeObjectURL(url);
                }
            });
        };
    }, []);

    const handleMediaChange = (field) => (event) => {
        const file = event.target.files?.[0] || null;

        if (mediaObjectUrlsRef.current[field]) {
            URL.revokeObjectURL(mediaObjectUrlsRef.current[field]);
            mediaObjectUrlsRef.current[field] = null;
        }

        if (file) {
            const objectUrl = URL.createObjectURL(file);
            mediaObjectUrlsRef.current[field] = objectUrl;
            setMediaPreviews((prev) => ({
                ...prev,
                [field]: objectUrl,
            }));
        } else {
            setMediaPreviews((prev) => ({
                ...prev,
                [field]: initialMediaRef.current[field] || '',
            }));
        }
    };

    const breadcrumbs = [
        {
            title: 'Edit SiteSeo',
            href: '/siteseo',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit SiteSeo" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Edit SiteSeo</CardTitle>
                            <CardDescription>Update comprehensive SEO settings including meta tags, OG tags, Twitter cards, and tracking scripts</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form
                                action={route('site-seo.update', siteseo.id)}
                                method="post"
                                encType="multipart/form-data"
                                className="space-y-8"
                            >
                                <input type="hidden" name="_method" value="PUT" />
                                {/* Basic Meta Tags Section */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold border-b pb-2">Basic Meta Tags</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="meta_title">Meta Title</Label>
                                            <Input
                                                id="meta_title"
                                                name="meta_title"
                                                defaultValue={siteseo?.meta_title || ''}
                                                placeholder="Page title (50-60 characters)"
                                                className={errors?.meta_title ? 'border-red-500' : ''}
                                            />
                                            {errors?.meta_title && <p className="text-sm text-red-500">{errors.meta_title}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="meta_author">Meta Author</Label>
                                            <Input
                                                id="meta_author"
                                                name="meta_author"
                                                defaultValue={siteseo?.meta_author || ''}
                                                placeholder="Author name"
                                                className={errors?.meta_author ? 'border-red-500' : ''}
                                            />
                                            {errors?.meta_author && <p className="text-sm text-red-500">{errors.meta_author}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="meta_keyword">Meta Keywords</Label>
                                            <Input
                                                id="meta_keyword"
                                                name="meta_keyword"
                                                defaultValue={siteseo?.meta_keyword || ''}
                                                placeholder="keyword1, keyword2, keyword3"
                                                className={errors?.meta_keyword ? 'border-red-500' : ''}
                                            />
                                            {errors?.meta_keyword && <p className="text-sm text-red-500">{errors.meta_keyword}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="meta_robots">Meta Robots</Label>
                                            <Input
                                                id="meta_robots"
                                                name="meta_robots"
                                                defaultValue={siteseo?.meta_robots || 'index, follow'}
                                                placeholder="index, follow"
                                                className={errors?.meta_robots ? 'border-red-500' : ''}
                                            />
                                            {errors?.meta_robots && <p className="text-sm text-red-500">{errors.meta_robots}</p>}
                                        </div>

                                        <div className="space-y-2 md:col-span-2">
                                            <Label htmlFor="meta_description">Meta Description</Label>
                                            <Textarea
                                                id="meta_description"
                                                name="meta_description"
                                                defaultValue={siteseo?.meta_description || ''}
                                                placeholder="Page description (150-160 characters)"
                                                rows={3}
                                                className={errors?.meta_description ? 'border-red-500' : ''}
                                            />
                                            {errors?.meta_description && <p className="text-sm text-red-500">{errors.meta_description}</p>}
                                        </div>

                                        <div className="space-y-2 md:col-span-2">
                                            <Label htmlFor="canonical_url">Canonical URL</Label>
                                            <Input
                                                id="canonical_url"
                                                name="canonical_url"
                                                type="url"
                                                defaultValue={siteseo?.canonical_url || ''}
                                                placeholder="https://example.com/page"
                                                className={errors?.canonical_url ? 'border-red-500' : ''}
                                            />
                                            {errors?.canonical_url && <p className="text-sm text-red-500">{errors.canonical_url}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="author">Author</Label>
                                            <Input
                                                id="author"
                                                name="author"
                                                defaultValue={siteseo?.author || ''}
                                                placeholder="Author name"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="copyright">Copyright</Label>
                                            <Input
                                                id="copyright"
                                                name="copyright"
                                                defaultValue={siteseo?.copyright || ''}
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
                                        </div> */}

                                        {/* <div className="space-y-2">
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
                                                name="og_title"
                                                defaultValue={siteseo?.og_title || ''}
                                                placeholder="Open Graph title"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="og_type">OG Type</Label>
                                            <Input
                                                id="og_type"
                                                name="og_type"
                                                defaultValue={siteseo?.og_type || 'website'}
                                                placeholder="website"
                                            />
                                        </div>

                                        <div className="space-y-2 md:col-span-2">
                                            <Label htmlFor="og_description">OG Description</Label>
                                            <Textarea
                                                id="og_description"
                                                name="og_description"
                                                defaultValue={siteseo?.og_description || ''}
                                                placeholder="Open Graph description"
                                                rows={3}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="og_url">OG URL</Label>
                                            <Input
                                                id="og_url"
                                                name="og_url"
                                                type="url"
                                                defaultValue={siteseo?.og_url || ''}
                                                placeholder="https://example.com"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="og_image">OG Image</Label>
                                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                                <div className="w-32 h-32 rounded-xl border border-dashed border-slate-300/50 dark:border-slate-700/50 bg-slate-100/40 dark:bg-slate-800/40 flex items-center justify-center overflow-hidden">
                                                    {mediaPreviews.og_image ? (
                                                        <img src={mediaPreviews.og_image} alt="OG preview" className="object-contain w-full h-full" />
                                                    ) : (
                                                        <span className="text-xs text-slate-500 text-center px-2">No OG image</span>
                                                    )}
                                                </div>
                                                <div className="flex-1 space-y-2">
                                                    <Input
                                                        id="og_image"
                                                        name="og_image"
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleMediaChange('og_image')}
                                                        className={errors?.og_image ? 'border-red-500' : ''}
                                                    />
                                                    <p className="text-xs text-slate-500">Recommended 1200x630 (JPG/PNG/WebP).</p>
                                                    {errors?.og_image && <p className="text-sm text-red-500">{errors.og_image}</p>}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="og_image_alt">OG Image Alt</Label>
                                            <Input
                                                id="og_image_alt"
                                                name="og_image_alt"
                                                defaultValue={siteseo?.og_image_alt || ''}
                                                placeholder="Image description"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="og_site_name">OG Site Name</Label>
                                            <Input
                                                id="og_site_name"
                                                name="og_site_name"
                                                defaultValue={siteseo?.og_site_name || ''}
                                                placeholder="Site name"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="og_locale">OG Locale</Label>
                                            <Input
                                                id="og_locale"
                                                name="og_locale"
                                                defaultValue={siteseo?.og_locale || 'en_US'}
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
                                                name="twitter_card"
                                                defaultValue={siteseo?.twitter_card || 'summary_large_image'}
                                                placeholder="summary_large_image"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="twitter_title">Twitter Title</Label>
                                            <Input
                                                id="twitter_title"
                                                name="twitter_title"
                                                defaultValue={siteseo?.twitter_title || ''}
                                                placeholder="Twitter card title"
                                            />
                                        </div>

                                        <div className="space-y-2 md:col-span-2">
                                            <Label htmlFor="twitter_description">Twitter Description</Label>
                                            <Textarea
                                                id="twitter_description"
                                                name="twitter_description"
                                                defaultValue={siteseo?.twitter_description || ''}
                                                placeholder="Twitter card description"
                                                rows={3}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="twitter_image">Twitter Image</Label>
                                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                                <div className="w-32 h-32 rounded-xl border border-dashed border-slate-300/50 dark:border-slate-700/50 bg-slate-100/40 dark:bg-slate-800/40 flex items-center justify-center overflow-hidden">
                                                    {mediaPreviews.twitter_image ? (
                                                        <img src={mediaPreviews.twitter_image} alt="Twitter preview" className="object-contain w-full h-full" />
                                                    ) : (
                                                        <span className="text-xs text-slate-500 text-center px-2">No Twitter image</span>
                                                    )}
                                                </div>
                                                <div className="flex-1 space-y-2">
                                                    <Input
                                                        id="twitter_image"
                                                        name="twitter_image"
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleMediaChange('twitter_image')}
                                                        className={errors?.twitter_image ? 'border-red-500' : ''}
                                                    />
                                                    <p className="text-xs text-slate-500">Recommended 1200x600 (JPG/PNG/WebP).</p>
                                                    {errors?.twitter_image && <p className="text-sm text-red-500">{errors.twitter_image}</p>}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="twitter_site">Twitter Site</Label>
                                            <Input
                                                id="twitter_site"
                                                name="twitter_site"
                                                defaultValue={siteseo?.twitter_site || ''}
                                                placeholder="@username"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="twitter_creator">Twitter Creator</Label>
                                            <Input
                                                id="twitter_creator"
                                                name="twitter_creator"
                                                defaultValue={siteseo?.twitter_creator || ''}
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
                                            <Label htmlFor="favicon">Favicon</Label>
                                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                                <div className="w-20 h-20 rounded-lg border border-dashed border-slate-300/50 dark:border-slate-700/50 bg-slate-100/40 dark:bg-slate-800/40 flex items-center justify-center overflow-hidden">
                                                    {mediaPreviews.favicon ? (
                                                        <img src={mediaPreviews.favicon} alt="Favicon preview" className="object-contain w-full h-full" />
                                                    ) : (
                                                        <span className="text-[10px] text-slate-500 text-center px-2">No favicon</span>
                                                    )}
                                                </div>
                                                <div className="flex-1 space-y-2">
                                                    <Input
                                                        id="favicon"
                                                        name="favicon"
                                                        type="file"
                                                        accept="image/*,.ico"
                                                        onChange={handleMediaChange('favicon')}
                                                        className={errors?.favicon ? 'border-red-500' : ''}
                                                    />
                                                    <p className="text-xs text-slate-500">Ideal square icon up to 512×512 (PNG/ICO/SVG).</p>
                                                    {errors?.favicon && <p className="text-sm text-red-500">{errors.favicon}</p>}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="apple_touch_icon">Apple Touch Icon</Label>
                                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                                <div className="w-24 h-24 rounded-lg border border-dashed border-slate-300/50 dark:border-slate-700/50 bg-slate-100/40 dark:bg-slate-800/40 flex items-center justify-center overflow-hidden">
                                                    {mediaPreviews.apple_touch_icon ? (
                                                        <img src={mediaPreviews.apple_touch_icon} alt="Apple touch icon" className="object-contain w-full h-full" />
                                                    ) : (
                                                        <span className="text-[10px] text-slate-500 text-center px-2">No icon</span>
                                                    )}
                                                </div>
                                                <div className="flex-1 space-y-2">
                                                    <Input
                                                        id="apple_touch_icon"
                                                        name="apple_touch_icon"
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleMediaChange('apple_touch_icon')}
                                                        className={errors?.apple_touch_icon ? 'border-red-500' : ''}
                                                    />
                                                    <p className="text-xs text-slate-500">PNG/SVG, preferably 180×180.</p>
                                                    {errors?.apple_touch_icon && <p className="text-sm text-red-500">{errors.apple_touch_icon}</p>}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2 md:col-span-2">
                                            <Label htmlFor="manifest_icon">Manifest Icon</Label>
                                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                                <div className="w-28 h-28 rounded-lg border border-dashed border-slate-300/50 dark:border-slate-700/50 bg-slate-100/40 dark:bg-slate-800/40 flex items-center justify-center overflow-hidden">
                                                    {mediaPreviews.manifest_icon ? (
                                                        <img src={mediaPreviews.manifest_icon} alt="Manifest icon" className="object-contain w-full h-full" />
                                                    ) : (
                                                        <span className="text-[10px] text-slate-500 text-center px-2">No manifest icon</span>
                                                    )}
                                                </div>
                                                <div className="flex-1 space-y-2">
                                                    <Input
                                                        id="manifest_icon"
                                                        name="manifest_icon"
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleMediaChange('manifest_icon')}
                                                        className={errors?.manifest_icon ? 'border-red-500' : ''}
                                                    />
                                                    <p className="text-xs text-slate-500">Used for PWA manifest (PNG/WebP up to 512×512).</p>
                                                    {errors?.manifest_icon && <p className="text-sm text-red-500">{errors.manifest_icon}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Tracking Scripts Section */}
                                <div className="space-y-4 pt-6 border-t">
                                    <h3 className="text-lg font-semibold border-b pb-2">Tracking Scripts & Structured Data</h3>
                                    <div className="space-y-4">
                                        {/* <div className="space-y-2">
                                            <Label htmlFor="google_analytics">Google Analytics Script</Label>
                                            <Textarea
                                                id="google_analytics"
                                                name="google_analytics"
                                                defaultValue={siteseo?.google_analytics || ''}
                                                placeholder="Paste Google Analytics tracking code here"
                                                rows={5}
                                                className="font-mono text-sm"
                                            />
                                        </div> */}

                                        {/* <div className="space-y-2">
                                            <Label htmlFor="fb_pixel_id">Facebook Pixel ID / Script</Label>
                                            <Textarea
                                                id="fb_pixel_id"
                                                name="fb_pixel_id"
                                                defaultValue={siteseo?.fb_pixel_id || ''}
                                                placeholder="Paste Facebook Pixel code or ID here"
                                                rows={5}
                                                className="font-mono text-sm"
                                            />
                                        </div> */}

                                        <div className="space-y-2">
                                            <Label htmlFor="schema_markup">Schema.org / Structured Data (JSON-LD)</Label>
                                            <Textarea
                                                id="schema_markup"
                                                name="schema_markup"
                                                defaultValue={siteseo?.schema_markup || ''}
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
                                    <Button type="submit">
                                        Update SiteSeo
                                    </Button>
                                </div>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
