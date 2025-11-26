import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from 'lucide-react';
import RichTextEditor from "@/components/ui/RichTextEditor";

export default function ProductSeo({ data, setData }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    SEO Section
                    <Tooltip>
                        <TooltipTrigger>
                            <Info className="h-4 w-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Add meta titles descriptions and images for products, This will help more people to find them on search engines and see the right details while sharing on other social platforms</p>
                        </TooltipContent>
                    </Tooltip>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2 md:col-span-2">
                        <div className="flex items-center gap-2">
                            <Label>Meta Title</Label>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info className="h-4 w-4" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Add the products title name taglines etc here This title will be seen on Search Engine Results Pages and while sharing the products link on social platforms [ Character Limit : 100 ]</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                        <Input
                            placeholder="Enter Meta Title (Max 10 words)"
                            value={data?.meta_title}
                            onChange={(e) => setData('meta_title', e.target.value)}
                            maxLength="60"
                        />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <div className="flex items-center gap-2">
                            <Label>Meta Description</Label>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info className="h-4 w-4" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Write a short description of the product. This description will be seen on Search Engine Results Pages and while sharing the products link on social platforms [ Character Limit : 100 ]</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>


                        <RichTextEditor
                            id="meta_description"
                            value={data?.meta_description}
                            onChange={(content) => setData('meta_description', content)}
                            placeholder="Enter Meta Description"
                            height={120}
                        />

                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <div className="flex items-center gap-2">
                            <Label>Meta Keywords</Label>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info className="h-4 w-4" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Enter relevant keywords separated by commas. These keywords help search engines understand what your product is about [ Character Limit : 255 ]</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                        <Input
                            placeholder="Enter Meta Keywords (comma separated)"
                            value={data?.meta_keywords}
                            onChange={(e) => setData('meta_keywords', e.target.value)}
                            maxLength="255"
                        />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <div className="flex items-center gap-2">
                            <Label>Meta Tags</Label>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info className="h-4 w-4" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Enter additional meta tags for enhanced SEO. These can include Open Graph tags, Twitter cards, and other meta information [ Character Limit : 500 ]</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>

                        <RichTextEditor
                            id="meta_tags"
                            value={data?.meta_tags}
                            onChange={(content) => setData('meta_tags', content)}
                            placeholder="Enter Meta Tags (HTML format)"
                            height={120}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="hot_deals"
                            checked={data?.hot_deals}
                            onCheckedChange={(checked) => setData('hot_deals', checked)}
                        />
                        <Label htmlFor="hot_deals">Hot Deals</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="featured"
                            checked={data?.featured}
                            onCheckedChange={(checked) => setData('featured', checked)}
                        />
                        <Label htmlFor="featured">Featured</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="special_offer"
                            checked={data?.special_offer}
                            onCheckedChange={(checked) => setData('special_offer', checked)}
                        />
                        <Label htmlFor="special_offer">Special Offer</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="special_deals"
                            checked={data?.special_deals}
                            onCheckedChange={(checked) => setData('special_deals', checked)}
                        />
                        <Label htmlFor="special_deals">Special Deals</Label>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
