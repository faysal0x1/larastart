import QuillEditor from '@/components/QuillEditor.jsx';
import RichTextEditor from '@/components/ui/RichTextEditor';
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
import SingleColumnFormLayout from '@/components/form-layouts/SingleColumnFormLayout.jsx';
import TwoColumnFormLayout from '@/components/form-layouts/TwoColumnFormLayout.jsx';
import SectionedFormLayout from '@/components/form-layouts/SectionedFormLayout.jsx';

export default function GlobalForm({
    title = 'Form',
    description = '',
    initialData = {},
    fields = [],
    sections = [],
    layoutType = 'single', // 'single' | 'two-column' | 'sectioned'
    submitUrl,
    method = 'post',
    submitLabel = 'Submit',
    cancelUrl = null,
    cancelLabel = 'Cancel',
    onSuccess = null,
    successMessage = 'Form submitted successfully!',
}) {
    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm(initialData);

    const handleFieldChange = (field, value) => {
        const nextData = { ...data, [field.name]: value };
        setData(field.name, value);

        if (typeof field.onChange === 'function') {
            field.onChange({
                value,
                field,
                data: nextData,
                setData,
            });
        }
    };

    // State for image previews
    const [imagePreviews, setImagePreviews] = useState({});

    // State for combobox/searchable select open status
    const [openCombobox, setOpenCombobox] = useState({});

    const isEditing = method.toLowerCase() === 'put';

    const handleSubmit = (e) => {
        e.preventDefault();
        clearErrors();

        const formData = new FormData();

        // Add _method field for PUT/PATCH requests (Laravel requirement)
        if (isEditing) {
            formData.append('_method', 'PUT');
        }

        // Append all form values to FormData
        Object.keys(data).forEach((key) => {
            if (data[key] !== null && data[key] !== undefined) {
                // Handle arrays for multiselect
                if (Array.isArray(data[key])) {
                    data[key].forEach((value, index) => {
                        formData.append(`${key}[${index}]`, value);
                    });
                } else {
                    formData.append(key, data[key]);
                }
            }
        });

        // Debug: Log form data being sent
        console.log('Form data being sent:', data);
        console.log('Is editing:', isEditing);
        console.log('Submit URL:', submitUrl);
        console.log('Method:', method);

        // Debug: Log FormData contents
        console.log('FormData contents:');
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        const options = {
            onSuccess: (page) => {
                console.log('Form submission successful:', page);
                // Show success toast with Sonner
                toast.success(successMessage, {
                    description: successMessage,
                });

                // Reset form for new submissions
                if (!isEditing) {
                    reset();
                    setImagePreviews({});
                }

                // Execute custom success callback if provided
                if (onSuccess) onSuccess();
            },
            onError: (errors) => {
                // Show error toast if there are non-field errors
                if (errors.hasOwnProperty('_error')) {
                    toast.error('Error', {
                        description: errors._error,
                    });
                } else {
                    // Generic error if no specific message
                    toast.error('Form Submission Failed', {
                        description: 'There was an error submitting the form. Please check the highlighted fields.',
                    });
                }

                // Scroll to the first error
                setTimeout(() => {
                    const firstErrorField = document.querySelector('.error-field');
                    if (firstErrorField) {
                        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 100);
            },
        };

        if (isEditing) {
            // Use POST with _method=PUT for Laravel compatibility
            post(submitUrl, formData, options);
        } else {
            post(submitUrl, formData, options);
        }
    };

    const handleCancel = () => {
        if (cancelUrl) {
            window.location.href = cancelUrl;
        } else {
            window.history.back();
        }
    };

    // Handle image file selection
    const handleImageChange = (e, field) => {
        const file = e.target.files[0];
        if (file) {
            handleFieldChange(field, file);

            // Create image preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreviews((prev) => ({
                    ...prev,
                    [field.name]: e.target.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Clear image and preview
    const clearImage = (field) => {
        handleFieldChange(field, null);
        setImagePreviews((prev) => {
            const newPreviews = { ...prev };
            delete newPreviews[field.name];
            return newPreviews;
        });

        // Reset the file input
        const fileInput = document.getElementById(field.name);
        if (fileInput) fileInput.value = '';
    };

    // Handle multiselect item selection
    const handleMultiselectToggle = (field, value) => {
        const currentValues = Array.isArray(data[field.name]) ? [...data[field.name]] : [];

        if (currentValues.includes(value)) {
            handleFieldChange(
                field,
                currentValues.filter((item) => item !== value),
            );
        } else {
            handleFieldChange(field, [...currentValues, value]);
        }
    };

    // Remove item from multiselect
    const removeMultiselectItem = (field, value) => {
        if (Array.isArray(data[field.name])) {
            handleFieldChange(
                field,
                data[field.name].filter((item) => item !== value),
            );
        }
    };

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

    // Normalize multiselect values to strings to ensure consistent toggling and checked states
    useEffect(() => {
        let didChange = false;
        const normalized = {};

        fields.forEach((field) => {
            if (field.type === 'multiselect') {
                const current = data[field.name];
                if (Array.isArray(current)) {
                    const normalizedValues = current.map((v) => (v != null ? v.toString() : v)).filter((v) => v != null);
                    // Compare shallowly
                    if (JSON.stringify(normalizedValues) !== JSON.stringify(current)) {
                        normalized[field.name] = normalizedValues;
                        didChange = true;
                    }
                }
            }
        });

        if (didChange) {
            Object.entries(normalized).forEach(([key, value]) => setData(key, value));
        }
    }, [fields, data, setData]);

    const renderField = (field) => {
        // Add safety check for undefined field
        if (!field || !field.name) {
            return null;
        }

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
            readOnly = false,
            accept,
            searchable = false,
        } = field;

        const hasError = !!errors?.[name];
        const errorClass = hasError ? 'border-red-500 focus:ring-red-500' : '';
        const containerClass = hasError ? 'error-field' : '';

        const commonProps = {
            id: name,
            disabled,
            readOnly,
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
                        onChange={(e) => handleFieldChange(field, e.target.value)}
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
                        onChange={(e) => handleFieldChange(field, e.target.value)}
                        placeholder={placeholder}
                        rows={rows}
                        required={required}
                    />
                );
            case 'richtext':
                return (
                    <div className={cn('mb-4', errorClass)}>
                        <RichTextEditor
                            id={name}
                            value={data[name] || ''}
                            onChange={(content) => handleFieldChange(field, content)}
                            placeholder={placeholder}
                            height={300}
                            className={className}
                        />
                    </div>
                );
            case 'select':
                if (searchable) {
                    return (
                        <Popover open={openCombobox[name]} onOpenChange={(open) => setOpenCombobox({ ...openCombobox, [name]: open })}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={openCombobox[name]}
                                    className={`w-full justify-between ${errorClass}`}
                                >
                                    {data[name]
                                        ? options.find((option) => option.value.toString() === data[name]?.toString())?.label
                                        : placeholder || 'Select an option'}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                                <Command>
                                    <CommandInput placeholder={`Search ${label}...`} />
                                    <CommandEmpty>No option found.</CommandEmpty>
                                    <CommandGroup className="max-h-64 overflow-y-auto">
                                        {options.map((option) => (
                                            <CommandItem
                                                key={option.value}
                                                value={option.label}
                                                onSelect={() => {
                                                    handleFieldChange(field, option.value);
                                                    setOpenCombobox({ ...openCombobox, [name]: false });
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        'mr-2 h-4 w-4',
                                                        data[name]?.toString() === option.value.toString() ? 'opacity-100' : 'opacity-0',
                                                    )}
                                                />
                                                {option.label}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    );
                }
                else {
                    return (
                        <Select value={data[name]?.toString() || ''} onValueChange={(value) => handleFieldChange(field, value)} required={required}>
                            <SelectTrigger {...commonProps}>
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                            <SelectContent className="max-h-64">
                                {options.map((option) => (
                                    <SelectItem key={option.value} value={option.value.toString()}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    );
                }

            case 'multiselect':
                return (
                    <div className="space-y-2">
                        <Popover open={openCombobox[name]} onOpenChange={(open) => setOpenCombobox({ ...openCombobox, [name]: open })}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={openCombobox[name]}
                                    className={`w-full justify-between ${errorClass}`}
                                >
                                    {Array.isArray(data[name]) && data[name].length > 0
                                        ? `${data[name].length} selected`
                                        : placeholder || 'Select options'}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                                <Command>
                                    <CommandInput placeholder={`Search ${label}...`} />
                                    <CommandEmpty>No option found.</CommandEmpty>
                                    <CommandGroup>
                                        {options.map((option) => (
                                            <CommandItem
                                                key={option.value}
                                                value={option.value.toString()}
                                                onSelect={() => handleMultiselectToggle(field, option.value.toString())}
                                            >
                                                <div className="flex items-center">
                                                    <Checkbox
                                                        checked={Array.isArray(data[name]) && data[name].includes(option.value.toString())}
                                                        className="mr-2 h-4 w-4"
                                                        onCheckedChange={() => handleMultiselectToggle(field, option.value.toString())}
                                                    />
                                                    {option.label}
                                                </div>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>

                        {/* Selected items display */}
                        {Array.isArray(data[name]) && data[name].length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                                {data[name].map((value) => {
                                    const option = options.find((opt) => opt.value.toString() === value);
                                    return (
                                        <Badge key={value} variant="secondary" className="flex items-center gap-1">
                                            {option?.label || value}
                                            <X className="h-3 w-3 cursor-pointer" onClick={() => removeMultiselectItem(field, value)} />
                                        </Badge>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );

            case 'switch':
                return (
                    <div className="flex items-center space-x-2">
                        <Switch {...commonProps} checked={!!data[name]} onCheckedChange={(checked) => handleFieldChange(field, checked)} required={required} />
                    </div>
                );

            case 'iconPicker':
                return (
                    <div className="flex items-center space-x-2">
                        <IconPicker
                            {...commonProps}
                            value={data[name]?.toString() || ''}
                            onValueChange={(value) => handleFieldChange(field, value)}
                            required={required}
                        />
                    </div>
                );

            case 'checkbox':
                return (
                    <div className="flex items-center space-x-2">
                        <Checkbox {...commonProps} checked={!!data[name]} onCheckedChange={(checked) => handleFieldChange(field, checked)} required={required} />
                    </div>
                );

            case 'radio':
                return (
                    <RadioGroup
                        {...commonProps}
                        value={data[name]?.toString() || ''}
                        onValueChange={(value) => handleFieldChange(field, value)}
                        required={required}
                    >
                        <div className="space-y-2">
                            {options.map((option) => (
                                <div key={option.value} className="flex items-center space-x-2">
                                    <RadioGroupItem value={option.value.toString()} id={`${name}-${option.value}`} />
                                    <Label htmlFor={`${name}-${option.value}`}>{option.label}</Label>
                                </div>
                            ))}
                        </div>
                    </RadioGroup>
                );

            case 'date':
                return (
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className={`w-full justify-start text-left font-normal ${!data[name] ? 'text-muted-foreground' : ''} ${errorClass}`}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {data[name] ? format(new Date(data[name]), 'PPP') : placeholder || 'Select a date'}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={data[name] ? new Date(data[name]) : undefined}
                                onSelect={(date) => handleFieldChange(field, date ? format(date, 'yyyy-MM-dd') : null)}
                                disabled={disabled}
                                required={required}
                            />
                        </PopoverContent>
                    </Popover>
                );

            case 'image':
                return (
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <Input
                                {...commonProps}
                                type="file"
                                accept={accept || 'image/*'}
                                onChange={(e) => handleImageChange(e, field)}
                                required={required && !data[name]}
                            />
                            {imagePreviews[name] && (
                                <Button type="button" variant="outline" size="icon" onClick={() => clearImage(field)}>
                                    <X className="h-4 w-4" />
                                </Button>
                            )}
                        </div>

                        {/* Image Preview */}
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
                        onChange={(e) => handleFieldChange(field, e.target.value)}
                        placeholder={placeholder}
                        required={required}
                    />
                );
        }
    };

    const renderFieldBlock = (field) => (
        <div className={`space-y-2 ${errors[field.name] ? 'error-field' : ''}`}>
            {field.type !== 'checkbox' && field.type !== 'switch' && (
                <Label htmlFor={field.name} className={errors[field.name] ? 'text-red-500' : ''}>
                    {field.label}
                    {field.required && <span className="ml-1 text-red-500">*</span>}
                </Label>
            )}

            {renderField(field)}

            {field.type === 'checkbox' || field.type === 'switch' ? (
                <Label htmlFor={field.name} className={`ml-2 ${errors[field.name] ? 'text-red-500' : ''}`}>
                    {field.label}
                    {field.required && <span className="ml-1 text-red-500">*</span>}
                </Label>
            ) : null}

            {field.helpText && <p className="text-sm text-gray-500">{field.helpText}</p>}

            {errors[field.name] && <p className="text-sm text-red-500">{errors[field.name]}</p>}
        </div>
    );

    return (
        <>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    {description && <CardDescription>{description}</CardDescription>}
                </CardHeader>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <CardContent className="space-y-4">
                        {layoutType === 'sectioned' ? (
                            <SectionedFormLayout sections={sections} fields={fields} renderFieldBlock={renderFieldBlock} />
                        ) : layoutType === 'two-column' ? (
                            <TwoColumnFormLayout fields={fields} renderFieldBlock={renderFieldBlock} />
                        ) : (
                            <SingleColumnFormLayout fields={fields} renderFieldBlock={renderFieldBlock} />
                        )}

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
                    </CardContent>
                </form>
            </Card>

            {/* Include Sonner Toaster component */}
            <Toaster position="top-right" closeButton richColors />
        </>
    );
}
