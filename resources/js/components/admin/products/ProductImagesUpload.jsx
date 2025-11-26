import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, Plus, Trash2 } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

export default function ProductImagesUpload({ data, setData, colorImages, setColorImages }) {
    const handleFileChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const newImages = [...(data.images || [])];
            newImages[index] = file;
            setData('images', newImages);
        }
    };

    const handleMultipleAdd = (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;
        const newImages = [...(data.images || []), ...files];
        setData('images', newImages);
        e.target.value = '';
    };

    const handleColorImageChange = (colorCode, file, index) => {
        const newColorImages = [...(data.color_images || [])];
        newColorImages[index] = { colorCode, file };
        setData('color_images', newColorImages);
    };

    const handleAddMoreImages = () => {
        setData('images', [...(data.images || []), null]);
    };

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {/* Thumbnail Upload */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Product Thumbnail</CardTitle>
                        <Tooltip>
                            <TooltipTrigger>
                                <Info className="h-4 w-4" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Add your product's thumbnail in JPG, PNG or JPEG Format within 2MB</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <Badge variant="secondary">Ratio 1:1 (500 x 500 px)</Badge>
                </CardHeader>
                <CardContent>
                    <div className="relative">
                        <div className="relative h-64 rounded-lg border-2 border-dashed">
                            <input
                                type="file"
                                id="product-thumbnail-upload"
                                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        setData('product_thumbnail', e.target.files[0]);
                                    }
                                }}
                                accept="image/*"
                            />

                            {data.product_thumbnail && (
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    className="absolute top-2 right-2 z-10"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setData('product_thumbnail', null);
                                        document.getElementById('product-thumbnail-upload').value = '';
                                    }}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            )}

                            <div className="absolute inset-0 z-0 flex items-center justify-center">
                                {data.product_thumbnail ? (
                                    <img
                                        className="h-full w-full bg-white object-contain"
                                        src={URL.createObjectURL(data.product_thumbnail)}
                                        alt="Preview"
                                        onLoad={(url) => URL.revokeObjectURL(url)}
                                    />
                                ) : (
                                    <label
                                        htmlFor="product-thumbnail-upload"
                                        className="flex h-full w-full cursor-pointer flex-col items-center justify-center p-4 text-center"
                                    >
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <div className="rounded-full bg-gray-100 p-4">
                                                <Plus className="h-8 w-8 text-gray-400" />
                                            </div>
                                            <h3 className="text-gray-500">Upload Image</h3>
                                        </div>
                                    </label>
                                )}
                            </div>
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                            Image format: Jpg, png, jpeg, webp
                            <br /> Max size: 2 MB
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Color Images */}
            {data.colors_active && data.colors.length > 0 && (
                <Card className="md:col-span-3">
                    <CardHeader>
                        <CardTitle>Color Variant Images</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            {data.colors.map((colorCode, index) => {
                                const colorImage = data.color_images?.find(img => img?.colorCode === colorCode);
                                return (
                                    <div key={colorCode} className="space-y-2">
                                        <Label>Color: {colorCode}</Label>
                                        <div className="relative h-48 rounded-lg border-2 border-dashed">
                                            <input
                                                type="file"
                                                id={`color-image-${index}`}
                                                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                                                onChange={(e) => {
                                                    if (e.target.files?.[0]) {
                                                        handleColorImageChange(colorCode, e.target.files[0], index);
                                                    }
                                                }}
                                                accept="image/*"
                                            />

                                            {colorImage?.file && (
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="icon"
                                                    className="absolute top-2 right-2 z-10"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleColorImageChange(colorCode, null, index);
                                                        document.getElementById(`color-image-${index}`).value = '';
                                                    }}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            )}

                                            <div className="absolute inset-0 flex items-center justify-center">
                                                {colorImage?.file ? (
                                                    <div className="relative h-full w-full">
                                                        <img
                                                            className="h-full w-full bg-white object-contain"
                                                            src={URL.createObjectURL(colorImage.file)}
                                                            alt={`Color ${colorCode}`}
                                                            onLoad={(url) => URL.revokeObjectURL(url)}
                                                        />
                                                    </div>
                                                ) : (
                                                    <label
                                                        htmlFor={`color-image-${index}`}
                                                        className="flex h-full w-full cursor-pointer flex-col items-center justify-center p-4 text-center"
                                                    >
                                                        <div className="flex flex-col items-center justify-center gap-2">
                                                            <div className="rounded-full bg-gray-100 p-4">
                                                                <Plus className="h-8 w-8 text-gray-400" />
                                                            </div>
                                                            <h3 className="text-gray-500">Upload Image</h3>
                                                        </div>
                                                    </label>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            )}
            {/* Additional Images */}
            <Card className="md:col-span-4">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Additional Images</CardTitle>
                        <Tooltip>
                            <TooltipTrigger>
                                <Info className="h-4 w-4" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Upload any additional images for this product from here.</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <Badge variant="secondary">Ratio 1:1 (500 x 500 px)</Badge>
                </CardHeader>
                <CardContent>
                    <p className="mb-4 text-gray-500">Upload additional product images</p>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {(data.images || []).map((image, index) => (
                            <div key={index} className="space-y-2">
                                <Label>Image {index + 1}</Label>
                                <div className="relative h-48 rounded-lg border-2 border-dashed">
                                    <input
                                        type="file"
                                        id={`additional-image-${index}`}
                                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                                        onChange={(e) => handleFileChange(e, index)}
                                        accept="image/*"
                                    />

                                    {image && (
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            className="absolute top-2 right-2 z-10"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                const newImages = [...data.images];
                                                newImages.splice(index, 1);
                                                setData('images', newImages);
                                                document.getElementById(`additional-image-${index}`).value = '';
                                            }}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}

                                    <div className="absolute inset-0 flex items-center justify-center">
                                        {image ? (
                                            <img
                                                className="h-full w-full bg-white object-contain"
                                                src={URL.createObjectURL(image)}
                                                alt={`Additional ${index}`}
                                                onLoad={(url) => URL.revokeObjectURL(url)}
                                            />
                                        ) : (
                                            <label
                                                htmlFor={`additional-image-${index}`}
                                                className="flex h-full w-full cursor-pointer flex-col items-center justify-center p-4 text-center"
                                            >
                                                <div className="flex flex-col items-center justify-center gap-2">
                                                    <div className="rounded-full bg-gray-100 p-4">
                                                        <Plus className="h-8 w-8 text-gray-400" />
                                                    </div>
                                                    <h3 className="text-gray-500">Upload Image</h3>
                                                </div>
                                            </label>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Hidden multiple input to add many images at once */}
                        <input
                            type="file"
                            id="additional-images-multi-create"
                            className="hidden"
                            multiple
                            accept="image/*"
                            onChange={handleMultipleAdd}
                        />

                        <div className="grid grid-cols-2 gap-4 sm:col-span-3">
                            <Button
                                type="button"
                                variant="outline"
                                className="h-14 w-full flex-col sm:flex-row sm:h-12 gap-2"
                                onClick={() => document.getElementById('additional-images-multi-create')?.click()}
                            >
                                <Plus className="h-6 w-6" />
                                <span>Select Multiple</span>
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="h-14 w-full flex-col sm:flex-row sm:h-12 gap-2"
                                onClick={handleAddMoreImages}
                            >
                                <Plus className="h-6 w-6" />
                                <span>Add One Slot</span>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
