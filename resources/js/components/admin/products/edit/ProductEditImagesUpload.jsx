import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, Plus, Trash2 } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function ProductEditImagesUpload({
    data,
    setData,
    onDeleteImage,
    onDeleteColorImage,
    productId
}) {
    // Handle existing color images from the JSON data (support both snake_case and camelCase)
    const existingColorImages = (Array.isArray(data.color_images) && data.color_images.length > 0)
        ? data.color_images
        : (Array.isArray(data.colorImages) ? data.colorImages : []);
    // Handle existing multi images from Spatie Media Library: prefer normalized 'existing_images', fallback to server 'multi_images'
    const existingMultiImages = (data.existing_images && Array.isArray(data.existing_images) ? data.existing_images : (data.multi_images || []));

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
        // reset input so the same files can be selected again if needed
        e.target.value = '';
    };

    const handleColorImageChange = (colorId, file, index) => {
        const newColorImages = [...(data.new_color_images || [])];
        newColorImages[index] = { colorId, file };
        setData('new_color_images', newColorImages);
    };

    // Map for quick lookup of newly selected color images by key (id or code)
    const newColorMap = (() => {
        const map = new Map();
        (data.new_color_images || []).forEach(ci => {
            if (ci && ci.colorId) map.set(ci.colorId, ci.file);
        });
        return map;
    })();

    const handleAddMoreImages = () => {
        setData('images', [...(data.images || []), null]);
    };

    const [selectedExistingIds, setSelectedExistingIds] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);

    const toggleSelect = (id) => {
        setSelectedExistingIds((prev) => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    const deleteExisting = (ids) => {
        if (!ids?.length || !productId) {
            console.warn('Cannot delete: missing ids or productId', { ids, productId });
            return;
        }

        if (!confirm(`Are you sure you want to delete ${ids.length} image(s)?`)) {
            return;
        }

        setIsDeleting(true);

        // Use Inertia router with POST method spoofing for DELETE
        // This allows us to send data (ids array) with the request
        router.post(route('product.images.delete', productId), {
            ids,
            _method: 'DELETE'
        }, {
            preserveScroll: true,
            onSuccess: () => {
                // Update UI - remove deleted images from existing_images (works with media IDs)
                setData('existing_images', existingMultiImages.filter(img => !ids.includes(img.id)));
                setSelectedExistingIds([]);

                // Also update the parent's deletedImages state if using that
                ids.forEach(id => onDeleteImage?.(id));
                if (window?.toastr) {
                    window.toastr.success(`Deleted ${ids.length} image(s) successfully.`);
                }
                setIsDeleting(false);
            },
            onError: (errors) => {
                if (window?.toastr) {
                    window.toastr.error('Failed to delete images. Please try again.');
                }
                setIsDeleting(false);
            },
            onFinish: () => {
                setIsDeleting(false);
            }
        });
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

                            {(data.product_thumbnail || data.existing_thumbnail) && (
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    className="absolute top-2 right-2 z-10"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setData('product_thumbnail', null);
                                        setData('existing_thumbnail', null);
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
                                        src={(data.product_thumbnail)}
                                        alt="Preview"
                                        onLoad={(url) => URL.revokeObjectURL(url)}
                                    />
                                ) : data.existing_thumbnail ? (
                                    <img
                                        className="h-full w-full bg-white object-contain"
                                        src={`${data.existing_thumbnail}`}
                                        alt="Existing Thumbnail"
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
            {(existingColorImages.length > 0 || (data.colors_active && (data.colors || []).length > 0)) && (
                <Card className="md:col-span-3">
                    <CardHeader>
                        <CardTitle>Color Variant Images</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {(existingColorImages.length > 0
                                ? existingColorImages.map((colorImage, index) => {
                                    const colorCode = colorImage.color_attribute?.code;
                                    const colorName = colorImage.color_attribute?.name;

                                    return (
                                        <div key={colorImage.id} className="space-y-2">
                                            <Label>Color: {colorName} ({colorCode})</Label>
                                            <div className="relative h-48 rounded-lg border-2 border-dashed">
                                                <input
                                                    type="file"
                                                    id={`color-image-${index}`}
                                                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                                                    onChange={(e) => {
                                                        if (e.target.files?.[0]) {
                                                            handleColorImageChange(colorImage.color_attribute_id, e.target.files[0], index);
                                                        }
                                                    }}
                                                    accept="image/*"
                                                />

                                                {newColorMap.get(colorImage.color_attribute_id) && (
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <img
                                                            className="h-full w-full bg-white object-contain"
                                                            src={URL.createObjectURL(newColorMap.get(colorImage.color_attribute_id))}
                                                            alt={`Color ${colorName}`}
                                                            onLoad={(e) => URL.revokeObjectURL(e.currentTarget.src)}
                                                        />
                                                    </div>
                                                )}

                                                {!newColorMap.get(colorImage.color_attribute_id) && (colorImage.image || colorImage.url) && (
                                                    <>
                                                        <Button
                                                            type="button"
                                                            variant="destructive"
                                                            size="icon"
                                                            className="absolute top-2 right-2 z-10"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                onDeleteColorImage(colorImage.id);
                                                                document.getElementById(`color-image-${index}`).value = '';
                                                            }}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>

                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <img
                                                                className="h-full w-full bg-white object-contain"
                                                                src={((colorImage.url || colorImage.image)?.startsWith('http') ? (colorImage.url || colorImage.image) : `/${(colorImage.url || colorImage.image)}`)}
                                                                alt={`Color ${colorName}`}
                                                            />
                                                        </div>
                                                    </>
                                                )}

                                                {!colorImage.image && !colorImage.url && (
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
                                    );
                                })
                                : (data.colors || []).map((colorCode, index) => (
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

                                            {newColorMap.get(colorCode) ? (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <img
                                                        className="h-full w-full bg-white object-contain"
                                                        src={URL.createObjectURL(newColorMap.get(colorCode))}
                                                        alt={`Color ${colorCode}`}
                                                        onLoad={(e) => URL.revokeObjectURL(e.currentTarget.src)}
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
                                ))
                            )}
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
                        {/* Existing Multi Images from Spatie Media Library */}
                        {existingMultiImages.map((image) => {
                            // Handle both old format (photo) and new format (url) from media collection
                            const imageUrl = image.url || image.photo || '';
                            const imageId = image.id;

                            return (
                                <div key={imageId} className="space-y-2">
                                    <Label>Image {imageId}</Label>
                                    <div className="relative h-48 rounded-lg border-2 border-dashed">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <img
                                                className="h-full w-full bg-white object-contain"
                                                src={(imageUrl?.startsWith('http') ? imageUrl : `/${imageUrl}`)}
                                                alt={`Product Image ${imageId}`}
                                            />
                                        </div>
                                        {/* Select checkbox */}
                                        <input
                                            type="checkbox"
                                            className="absolute top-2 left-2 h-5 w-5 z-20 cursor-pointer"
                                            checked={selectedExistingIds.includes(imageId)}
                                            onChange={() => toggleSelect(imageId)}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            className="absolute top-2 right-2 z-10"
                                            onClick={() => deleteExisting([imageId])}
                                            disabled={isDeleting}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}

                        {/* New Image Uploads */}
                        {(data.images || []).map((image, index) => (
                            <div key={`new-${index}`} className="space-y-2">
                                <Label>New Image {index + 1}</Label>
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
                            id="additional-images-multi"
                            className="hidden"
                            multiple
                            accept="image/*"
                            onChange={handleMultipleAdd}
                        />

                        <div className="grid grid-cols-2 gap-4 sm:col-span-3">
                            <Button
                                type="button"
                                variant="outline"
                                className="h-48 w-full flex-col gap-2"
                                onClick={() => document.getElementById('additional-images-multi')?.click()}
                            >
                                <Plus className="h-6 w-6" />
                                <span>Select Multiple</span>
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="h-48 w-full flex-col gap-2"
                                onClick={handleAddMoreImages}
                            >
                                <Plus className="h-6 w-6" />
                                <span>Add One Slot</span>
                            </Button>
                            {selectedExistingIds.length > 0 && (
                                <div className="col-span-2 flex justify-end mt-2">
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        onClick={() => deleteExisting(selectedExistingIds)}
                                        disabled={isDeleting}
                                    >
                                        {isDeleting ? 'Deleting...' : `Delete Selected (${selectedExistingIds.length})`}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
