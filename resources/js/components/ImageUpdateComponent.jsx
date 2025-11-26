import { useForm } from '@inertiajs/react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileText, RefreshCw, Trash2, Upload } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { useState } from 'react';

export default function ImageUpdateComponent({ title = 'Update Image', fieldName = 'image', initialImage = null, submitUrl, onSuccess = null }) {
    const { data, setData, post, processing, errors } = useForm({
        [fieldName]: null,
        _method: 'PATCH', // For Laravel route model binding
    });

    const [imagePreview, setImagePreview] = useState(initialImage);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData(fieldName, file);

            // Create image preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const clearImage = () => {
        setData(fieldName, null);
        setImagePreview(initialImage);
        const fileInput = document.getElementById(`${fieldName}-input`);
        if (fileInput) fileInput.value = '';
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!data[fieldName]) {
            toast.error('Please select an image first');
            return;
        }

        post(submitUrl, {
            forceFormData: true, // Important for file uploads
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Image updated successfully!');
                if (onSuccess) onSuccess(imagePreview);
            },
            onError: (errors) => {
                toast.error('Failed to update image', {
                    description: errors[fieldName] || 'Please try again',
                });
            },
        });
    };

    return (
        <>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <CardContent>
                        <div className="space-y-4">
                            {/* Enhanced Upload Area */}
                            <div
                                className={`relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed ${
                                    imagePreview ? 'bg-gray-50' : 'bg-gray-50 hover:bg-gray-100'
                                } p-6 transition-colors duration-200 ${imagePreview ? 'cursor-default' : 'cursor-pointer'}`}
                                onClick={() => {
                                    if (!imagePreview) {
                                        document.getElementById(`${fieldName}-input`).click();
                                    }
                                }}
                            >
                                {!imagePreview ? (
                                    <>
                                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-500">
                                            <Upload className="h-6 w-6" />
                                        </div>
                                        <p className="text-sm font-medium text-gray-700">Upload Image</p>
                                        <p className="mt-1 text-xs text-gray-500">Click to browse or drag and drop</p>
                                        <p className="mt-1 text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
                                    </>
                                ) : (
                                    <div className="relative w-full">
                                        <div className="flex items-center justify-center overflow-hidden rounded-md">
                                            <img src={imagePreview} alt="Preview" className="max-h-64 max-w-full object-contain" />
                                        </div>
                                        <div className="bg-opacity-0 hover:bg-opacity-30 absolute inset-0 flex items-center justify-center bg-black opacity-0 transition-opacity duration-200 hover:opacity-100">
                                            <div className="flex space-x-2">
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    variant="secondary"
                                                    className="bg-white text-gray-800 hover:bg-gray-100"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        document.getElementById(`${fieldName}-input`).click();
                                                    }}
                                                >
                                                    <RefreshCw className="mr-1 h-4 w-4" />
                                                    Replace
                                                </Button>
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        clearImage();
                                                    }}
                                                >
                                                    <Trash2 className="mr-1 h-4 w-4" />
                                                    Remove
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <Input
                                    id={`${fieldName}-input`}
                                    className="sr-only"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    required={!imagePreview}
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>

                            {/* File Info - Show when image is selected */}
                            {imagePreview && data[fieldName] && (
                                <div className="flex items-center justify-between rounded-md bg-blue-50 p-2 text-sm text-gray-700">
                                    <div className="flex items-center">
                                        <FileText className="mr-2 h-4 w-4 text-blue-500" />
                                        <span className="max-w-xs truncate">{data[fieldName].name || 'Image selected'}</span>
                                    </div>
                                    <span className="text-xs text-gray-500">
                                        {data[fieldName].size ? `${(data[fieldName].size / 1024).toFixed(1)} KB` : ''}
                                    </span>
                                </div>
                            )}

                            {/* Error Message */}
                            {errors && errors[fieldName] && <p className="mt-1 text-sm text-red-500">{errors[fieldName]}</p>}
                        </div>
                    </CardContent>

                    <CardFooter className="mt-2 flex justify-center">
                        <Button type="submit" disabled={processing || !data[fieldName]} className="px-6">
                            {processing ? (
                                <div className="flex items-center">
                                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                    Uploading...
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    <Upload className="mr-2 h-4 w-4" />
                                    Update Image
                                </div>
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
            <Toaster position="top-right" closeButton richColors />
        </>
    );
}