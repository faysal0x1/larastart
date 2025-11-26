import RenderedContent from '@/components/RenderedContent.jsx';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx';
import { Link, usePage } from '@inertiajs/react';

export default function ProductShow() {
    const { product, productSpecs } = usePage().props;

    function safeParse(json) {
        try {
            return JSON.parse(json);
        } catch {
            return {};
        }
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-BD', {
            style: 'currency',
            currency: 'BDT',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const calculateFinalPrice = (unitPrice, discountType, discountPrice) => {
        let finalPrice = unitPrice;
        if (discountType === 'flat') {
            finalPrice -= discountPrice;
        } else if (discountType === 'percent') {
            finalPrice -= (finalPrice * discountPrice) / 100;
        }
        return Math.max(0, finalPrice);
    };

    const finalPrice = calculateFinalPrice(product?.unit_price || 0, product?.discount_type, product?.discount_price || 0);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4">
                    {/* Header Section */}
                    <Card className="mb-6">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{product?.name}</h1>
                                    <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">SKU: {product?.sku}</p>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {product?.brand && <Badge variant="secondary">{product.brand.name}</Badge>}
                                        {product?.category && <Badge variant="outline">{product.category.name}</Badge>}
                                        {product?.subcategory && <Badge variant="outline">{product.subcategory.name}</Badge>}
                                        {product?.childCategory && <Badge variant="outline">{product.childCategory.name}</Badge>}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">{formatPrice(finalPrice)}</div>
                                    {product?.discount_price > 0 && (
                                        <div className="text-sm text-gray-500 dark:text-gray-400 line-through">{formatPrice(product.unit_price)}</div>
                                    )}

                                    <Link href={route('web.slug', product?.slug)} prefetch className="text-2xl font-bold text-green-600 dark:text-green-400 pointer">
                                        View Product
                                    </Link>


                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {/* Thumbnail */}
                            {product?.image_url && (
                                <div className="mb-6">
                                    <img
                                        src={product.image_url}
                                        alt={product.name}
                                        className="max-h-80 w-auto rounded-lg border border-gray-200 shadow-sm"
                                    />
                                </div>
                            )}

                            {/* Key Features */}
                            {product?.key_features && (
                                <div className="mb-4">
                                    <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Key Features</h3>
                                    <RenderedContent html={product.key_features} className="text-gray-700 dark:text-gray-300" />
                                </div>
                            )}

                            {/* Short Description */}
                            {product?.short_descp && (
                                <div className="mb-4">
                                    <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Short Description</h3>
                                    <p className="text-gray-700 dark:text-gray-300">{product.short_descp}</p>
                                </div>
                            )}

                            {/* Product Status Badges */}
                            <div className="mt-4 flex flex-wrap gap-2">
                                {product?.hot_deals && <Badge variant="destructive">Hot Deals</Badge>}
                                {product?.featured && <Badge variant="default">Featured</Badge>}
                                {product?.special_offer && <Badge variant="secondary">Special Offer</Badge>}
                                {product?.special_deals && <Badge variant="outline">Special Deals</Badge>}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Product Details Grid */}
                    <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Pricing Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Pricing Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-300">Unit Price:</span>
                                    <span className="font-semibold dark:text-white">{formatPrice(product?.unit_price || 0)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-300">Quantity:</span>
                                    <span className="font-semibold dark:text-white">{product?.qty || 0} units</span>
                                </div>
                                {product?.discount_price > 0 && (
                                    <>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-300">Discount Type:</span>
                                            <span className="font-semibold capitalize dark:text-white">{product.discount_type}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-300">Discount Amount:</span>
                                            <span className="font-semibold text-red-600 dark:text-red-400">
                                                {product.discount_type === 'flat'
                                                    ? formatPrice(product.discount_price)
                                                    : `${product.discount_price}%`}
                                            </span>
                                        </div>
                                    </>
                                )}
                                <Separator />
                                <div className="flex justify-between text-lg">
                                    <span className="font-semibold dark:text-white">Final Price:</span>
                                    <span className="font-bold text-green-600 dark:text-green-400">{formatPrice(finalPrice)}</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Product Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Product Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-300">Status:</span>
                                    <Badge variant={product?.status ? 'default' : 'secondary'}>{product?.status ? 'Active' : 'Inactive'}</Badge>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-300">Stock Status:</span>
                                    <Badge variant={(product?.qty || 0) > 20 ? 'default' : (product?.qty || 0) > 10 ? 'secondary' : 'destructive'}>
                                        {(product?.qty || 0) > 20 ? 'In Stock' : (product?.qty || 0) > 10 ? 'Low Stock' : 'Out of Stock'}
                                    </Badge>
                                </div>
                                {product?.tags && (
                                    <div>
                                        <span className="mb-2 block text-gray-600 dark:text-gray-300">Tags:</span>
                                        <div className="flex flex-wrap gap-1">
                                            {product.tags.split(',').map((tag, index) => (
                                                <Badge key={index} variant="outline" className="text-xs">
                                                    {tag.trim()}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {product?.size && (
                                    <div>
                                        <span className="mb-2 block text-gray-600 dark:text-gray-300">Available Sizes:</span>
                                        <div className="flex flex-wrap gap-1">
                                            {product.size.split(',').map((size, index) => (
                                                <Badge key={index} variant="outline" className="text-xs">
                                                    {size.trim()}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* SEO Information */}
                    {product?.seo && (
                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle>SEO Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {product.seo.meta_title && (
                                    <div>
                                        <span className="mb-1 block text-gray-600 dark:text-gray-300">Meta Title:</span>
                                        <p className="text-sm text-gray-800 dark:text-gray-200">{product.seo.meta_title}</p>
                                    </div>
                                )}
                                {product.seo.meta_description && (
                                    <div>
                                        <span className="mb-1 block text-gray-600 dark:text-gray-300">Meta Description:</span>
                                        <p className="text-sm text-gray-800 dark:text-gray-200">{product.seo.meta_description}</p>
                                    </div>
                                )}
                                {product.seo.meta_keywords && (
                                    <div>
                                        <span className="mb-1 block text-gray-600 dark:text-gray-300">Meta Keywords:</span>
                                        <p className="text-sm text-gray-800 dark:text-gray-200">{product.seo.meta_keywords}</p>
                                    </div>
                                )}
                                {product.seo.meta_tags && (
                                    <div>
                                        <span className="mb-1 block text-gray-600 dark:text-gray-300">Meta Tags:</span>
                                        <div className="rounded bg-gray-50 dark:bg-gray-800 p-2 text-sm text-gray-800 dark:text-gray-200">
                                            <pre className="whitespace-pre-wrap">{product.seo.meta_tags}</pre>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {/* Product Specifications */}
                    {productSpecs && Object.keys(productSpecs).length > 0 && (
                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle>Product Specifications</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {Object.entries(productSpecs).map(([groupName, attributes]) => (
                                    <div key={groupName} className="mb-6">
                                        <h4 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">{groupName}</h4>
                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                            {Object.entries(attributes).map(([attrName, value]) => (
                                                <div key={attrName} className="flex justify-between border-b border-gray-100 dark:border-gray-700 py-2">
                                                    <span className="font-medium text-gray-600 dark:text-gray-300">{attrName}:</span>
                                                    <span className="text-gray-800 dark:text-gray-200">{value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    )}

                    {/* Color Images */}
                    {Array.isArray(product?.color_images) && product.color_images.length > 0 && (
                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle>Color Variations</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                    {product.color_images.map((colorImg) => (
                                        <div key={colorImg.id} className="text-center">
                                            <img
                                                src={colorImg.image}
                                                alt={`${colorImg.colorAttribute?.name || 'Color'} variation`}
                                                className="mb-2 h-32 w-full rounded-lg border border-gray-200 object-cover"
                                            />
                                            <p className="text-sm text-gray-600 dark:text-gray-300">{colorImg.colorAttribute?.name || 'Color Variation'}</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Gallery */}
                    {Array.isArray(product?.multi_images) && product.multi_images.length > 0 && (
                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle>Product Gallery</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                    {product.multi_images.map((img) => (
                                        <div key={img.id} className="group relative">
                                            <img
                                                src={img.photo}
                                                alt={`Gallery image ${img.id}`}
                                                className="h-32 w-full rounded-lg border border-gray-200 object-cover transition-transform hover:scale-105"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Product Variations */}
                    {Array.isArray(product?.variations) && product.variations.length > 0 && (
                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle>Available Models</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Model</TableHead>
                                            <TableHead>SKU</TableHead>
                                            <TableHead>Price (BDT)</TableHead>
                                            <TableHead>Stock</TableHead>
                                            <TableHead>Specifications</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {product.variations.map((v) => {
                                            const attrs = typeof v.attributes === 'string' ? safeParse(v.attributes) : v.attributes || {};
                                            return (
                                                <TableRow key={v.id}>
                                                    <TableCell className="font-medium">{v.name}</TableCell>
                                                    <TableCell>
                                                        <code className="rounded bg-gray-100 dark:bg-gray-800 px-2 py-1 text-sm dark:text-gray-200">{v.sku}</code>
                                                    </TableCell>
                                                    <TableCell>
                                                        <span className="font-semibold text-green-600 dark:text-green-400">{formatPrice(Number(v.price))}</span>
                                                    </TableCell>
                                                    <TableCell>
                                                        <span
                                                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${v.stock > 20
                                                                ? 'bg-green-100 text-green-800'
                                                                : v.stock > 10
                                                                    ? 'bg-yellow-100 text-yellow-800'
                                                                    : 'bg-red-100 text-red-800'
                                                                }`}
                                                        >
                                                            {v.stock} units
                                                        </span>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex flex-wrap gap-1">
                                                            {Object.entries(attrs).map(([k, val]) => (
                                                                <Badge key={k} variant="outline" className="text-xs">
                                                                    {k}: {String(val)}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    )}

                    {/* Long Description */}
                    {product?.long_descp && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Product Description</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="prose max-w-none dark:prose-invert">
                                    <RenderedContent html={product.long_descp} className="leading-relaxed text-gray-700 dark:text-gray-300" />
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
