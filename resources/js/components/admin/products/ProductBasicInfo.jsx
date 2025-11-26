import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/ui/RichTextEditor";

export default function ProductBasicInfo({ data, setData, errors }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="product_name">Product name</Label>
                    <Input
                        id="product_name"
                        placeholder="New Product"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="short_descp">Short Description</Label>
                    <RichTextEditor
                        id="short_descp"
                        value={data.short_descp}
                        onChange={(content) => setData('short_descp', content)}
                        placeholder="Enter short description..."
                        height={120}
                    />
                    {errors.short_descp && <p className="text-sm text-red-500">{errors.short_descp}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="long_descp">Long Description</Label>
                    <RichTextEditor
                        id="long_descp"
                        value={data.long_descp}
                        onChange={(content) => setData('long_descp', content)}
                        placeholder="Enter long description..."
                        height={240}
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
