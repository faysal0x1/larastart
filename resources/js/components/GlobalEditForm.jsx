import QuillEditor from '@/components/QuillEditor.jsx';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { CalendarIcon, Check, ChevronsUpDown, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast, Toaster } from 'sonner';
import { IconPicker } from '../../../components/ui/icon-picker.jsx';

export default function GlobalEditForm({
                                           title = 'Edit Form',
                                           description = '',
                                           initialData = {},
                                           fields = [],
                                           submitUrl,
                                           submitLabel = 'Update',
                                           cancelUrl = null,
                                           cancelLabel = 'Cancel',
                                           onSuccess = null,
                                           successMessage = 'Updated successfully!',
                                           layout = 'default',
                                           gridCols = 1,
                                           sections = [],
                                       }) {
    const { data, setData, post, put,patch,processing, errors, reset, clearErrors } = useForm(initialData);
    const [imagePreviews, setImagePreviews] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [openCombobox, setOpenCombobox] = useState({});

    // Initialize image previews for existing images
    useEffect(() => {
        fields.forEach((field) => {
            if (field.type === 'image' && initialData[field.name] && typeof initialData[field.name] === 'string') {
                setImagePreviews((prev) => ({
                    ...prev,
                    [field.name]: initialData[field.name],
                }));
            }
        });
    }, [initialData, fields]);


    const handleSubmit = (e) => {
        e.preventDefault();
        clearErrors();
        setIsSubmitted(true);

        // If we have an image file, handle it separately
        if (Object.values(data).some(value => value instanceof File)) {
            // Create FormData for image upload
            const formData = new FormData();

            // Add all form data to FormData object
            Object.keys(data).forEach(key => {
                if (data[key] !== null) {
                    if (data[key] instanceof File) {
                        formData.append(key, data[key]);
                    } else {
                        formData.append(key, String(data[key]));
                    }
                }
            });

            // Use post with proper content type for file uploads
            patch(submitUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                forceFormData: true,
                onSuccess: () => {
                    toast.success(successMessage);
                    if (onSuccess) onSuccess();
                },
                onError: handleErrors
            });
        } else {
            // For regular data updates without files, use put
            put(submitUrl, data, {
                onSuccess: () => {
                    toast.success(successMessage);
                    if (onSuccess) onSuccess();
                },
                onError: handleErrors
            });
        }
    };
    // Add this function to handle image-only updates
    const handleImageUpdate = (fieldName) => {
        const imageFile = data[fieldName];

        if (!(imageFile instanceof File)) {
            toast.error("Please select an image first");
            return;
        }

        const formData = new FormData();
        formData.append(fieldName, imageFile);
        formData.append('_method', 'PATCH');

        // Use post with forced FormData for the image update
        put(submitUrl, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            forceFormData: true,
            onSuccess: () => {
                toast.success(`Image updated successfully!`);
                if (onSuccess) onSuccess();
            },
            onError: (errors) => {
                toast.error('Image update failed', {
                    description: errors[fieldName] || 'Please check the image format and size'
                });
            }
        });
    };

// Extract error handling to avoid duplication
    const handleErrors = (errors) => {
        if (errors.hasOwnProperty('_error')) {
            toast.error('Error', {
                description: errors._error,
            });
        } else {
            toast.error('Update Failed', {
                description: 'There was an error updating. Please check the highlighted fields.',
            });
        }

        setTimeout(() => {
            const firstErrorField = document.querySelector('.error-field');
            if (firstErrorField) {
                firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);
    };
    const handleCancel = () => {
        if (cancelUrl) {
            window.location.href = cancelUrl;
        } else {
            window.history.back();
        }
    };

    const handleImageChange = (e, name) => {
        const file = e.target.files[0];
        if (file) {
            setData(name, file);

            // Create image preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreviews((prev) => ({
                    ...prev,
                    [name]: e.target.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const clearImage = (name) => {
        setData(name, null);
        setImagePreviews((prev) => {
            const newPreviews = { ...prev };
            delete newPreviews[name];
            return newPreviews;
        });

        const fileInput = document.getElementById(name);
        if (fileInput) fileInput.value = '';
    };

    const renderField = (field) => {
        const {
            name,
            label,
            type = 'text',
            placeholder = '',
            required = false,
            options = [],
            rows = 3,
            min,
            max,
            step,
            helpText,
            className = '',
            disabled = false,
            accept,
        } = field;

        const hasError = !!errors[name];
        const errorClass = hasError ? 'border-red-500 focus:ring-red-500' : '';
        const containerClass = hasError ? 'error-field' : '';

        const commonProps = {
            id: name,
            disabled,
            className: `${className} ${errorClass}`,
        };

        switch (type) {
            case 'text':
            case 'email':
            case 'password':
            case 'number':
            case 'tel':
            case 'url':
                return (
                    <Input
                        {...commonProps}
                        type={type}
                        value={data[name] || ''}
                        onChange={(e) => setData(name, e.target.value)}
                        placeholder={placeholder}
                        min={min}
                        max={max}
                        step={step}
                        required={required}
                    />
                );

            case 'textarea':
                return (
                    <Textarea
                        {...commonProps}
                        value={data[name] || ''}
                        onChange={(e) => setData(name, e.target.value)}
                        placeholder={placeholder}
                        rows={rows}
                        required={required}
                    />
                );
            case 'image':
                return (
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <Input
                                {...commonProps}
                                type="file"
                                accept={accept || 'image/*'}
                                onChange={(e) => handleImageChange(e, name)}
                                required={required && !data[name]}
                            />
                            {imagePreviews[name] && (
                                <Button type="button" variant="outline" size="icon" onClick={() => clearImage(name)}>
                                    <X className="h-4 w-4" />
                                </Button>
                            )}
                            {/* Add this image update button */}
                            {data[name] instanceof File && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => handleImageUpdate(name)}
                                    className="text-xs"
                                >
                                    Update Image Only
                                </Button>
                            )}
                        </div>

                        {imagePreviews[name] && (
                            <div className="mt-2">
                                <div className="flex h-40 w-40 items-center justify-center overflow-hidden rounded-md border bg-gray-50">
                                    <img src={imagePreviews[name]} alt={`Preview for ${label}`} className="max-h-full max-w-full object-contain" />
                                </div>
                            </div>
                        )}
                    </div>
                );

            default:
                return (
                    <Input
                        {...commonProps}
                        type="text"
                        value={data[name] || ''}
                        onChange={(e) => setData(name, e.target.value)}
                        placeholder={placeholder}
                        required={required}
                    />
                );
        }
    };

    const renderFieldWithLabel = (field) => {
        const hasError = !!errors[field.name];

        return (
            <div key={field.name} className={`space-y-2 ${hasError ? 'error-field' : ''}`}>
                {field.type !== 'checkbox' && field.type !== 'switch' && (
                    <Label htmlFor={field.name} className={hasError ? 'text-red-500' : ''}>
                        {field.label}
                        {field.required && <span className="ml-1 text-red-500">*</span>}
                    </Label>
                )}

                {renderField(field)}

                {field.type === 'checkbox' || field.type === 'switch' ? (
                    <Label htmlFor={field.name} className={`ml-2 ${hasError ? 'text-red-500' : ''}`}>
                        {field.label}
                        {field.required && <span className="ml-1 text-red-500">*</span>}
                    </Label>
                ) : null}

                {field.helpText && <p className="text-sm text-gray-500">{field.helpText}</p>}

                {hasError && <p className="text-sm text-red-500">{errors[field.name]}</p>}
            </div>
        );
    };

    const renderFieldsLayout = (fieldsToRender, layoutType = 'default', cols = 1) => {
        switch (layoutType) {
            case 'grid':
                const gridColsClass = {
                    1: 'grid-cols-1',
                    2: 'grid-cols-1 md:grid-cols-2',
                    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
                    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
                }[cols] || 'grid-cols-1';

                return (
                    <div className={`grid ${gridColsClass} gap-4`}>
                        {fieldsToRender.map(field => renderFieldWithLabel(field))}
                    </div>
                );

            default:
                return (
                    <div className="space-y-4">
                        {fieldsToRender.map(field => renderFieldWithLabel(field))}
                    </div>
                );
        }
    };

    return (
        <>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    {description && <CardDescription>{description}</CardDescription>}
                </CardHeader>
                <form onSubmit={handleSubmit} encType="multipart/form-data" >
                    <CardContent>
                        {sections && sections.length > 0 ? (
                            sections.map((section) => (
                                <div key={section.title || Math.random()} className="mb-8">
                                    {section.title && (
                                        <div className="mb-4">
                                            <h3 className="text-lg font-medium">{section.title}</h3>
                                            {section.description && <p className="text-sm text-gray-500">{section.description}</p>}
                                        </div>
                                    )}
                                    {renderFieldsLayout(
                                        fields.filter(field => section.fields.includes(field.name)),
                                        section.layout || layout,
                                        section.gridCols || gridCols
                                    )}
                                </div>
                            ))
                        ) : (
                            renderFieldsLayout(fields, layout, gridCols)
                        )}
                    </CardContent>

                    <CardFooter className="mt-2 flex justify-center space-x-2">
                        {cancelUrl || cancelLabel !== 'Cancel' ? (
                            <Button type="button" variant="outline" onClick={handleCancel}>
                                {cancelLabel}
                            </Button>
                        ) : null}
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Processing...' : submitLabel}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
            <Toaster position="top-right" closeButton richColors />
        </>
    );
}