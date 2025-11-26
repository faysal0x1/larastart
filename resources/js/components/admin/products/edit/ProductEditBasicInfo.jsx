import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import RichTextEditor from '../../../ui/RichTextEditor.jsx';

export default function ProductEditBasicInfo({ data, setData, errors }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="product_name">Product name</Label>
                    <Input id="product_name" placeholder="New Product" value={data.name} onChange={(e) => setData('name', e.target.value)} required />
                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="product_slug">Product Slug</Label>
                    <Input
                        id="product_slug"
                        placeholder="product-slug"
                        value={data.slug || ''}
                        onChange={(e) => setData('slug', e.target.value)}
                    />
                    {errors.slug && <p className="text-sm text-red-500">{errors.slug}</p>}
                    <p className="text-xs text-gray-500">Leave empty to auto-generate from product name</p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="short_descp">Short Description</Label>
                    <RichTextEditor
                        id="short_descp"
                        className="min-h-[120px]"
                        value={data.short_descp}
                        onChange={(content) => setData('short_descp', content)}
                        required
                    />
                    {errors.short_descp && <p className="text-sm text-red-500">{errors.short_descp}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="long_descp">Long Description</Label>
                    <RichTextEditor
                        id="long_descp"
                        className="min-h-[240px]"
                        value={data.long_descp}
                        onChange={(content) => setData('long_descp', content)}
                        required
                    />
                    {errors.long_descp && <p className="text-sm text-red-500">{errors.long_descp}</p>}
                </div>


                <div className="space-y-2">
                    <Label htmlFor="key_features"> Key Features</Label>
                    <RichTextEditor
                        id="key_features"
                        value={data.key_features}
                        onChange={(content) => setData('key_features', content)}
                        placeholder="Enter long description..."
                        height={240}
                    />
                    {errors.key_features && <p className="text-sm text-red-500">{errors.key_features}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="product_specs_data">Product Specification</Label>
                    <RichTextEditor
                        id="product_specs_data"
                        value={data.product_specs_data}
                        onChange={(content) => setData('product_specs_data', content)}
                        placeholder="Enter Product Specification..."
                        height={240}
                    />
                    {errors.product_specs_data && <p className="text-sm text-red-500">{errors.product_specs_data}</p>}
                </div>
            </CardContent>
        </Card>
    );
}
