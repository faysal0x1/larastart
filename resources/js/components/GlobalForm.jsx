import { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { Toaster } from "sonner";
import { toast } from "sonner";
import { IconPicker } from '../../../components/ui/icon-picker.jsx';

export default function GlobalForm({
                                       title = "Form",
                                       description = "",
                                       initialData = {},
                                       fields = [],
                                       submitUrl,
                                       method = "post",
                                       submitLabel = "Submit",
                                       cancelUrl = null,
                                       cancelLabel = "Cancel",
                                       onSuccess = null,
                                       successMessage = "Form submitted successfully!",
                                   }) {
    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm(initialData);

    // State for image previews
    const [imagePreviews, setImagePreviews] = useState({});

    // State to track if form was submitted
    const [isSubmitted, setIsSubmitted] = useState(false);

    const isEditing = method.toLowerCase() === "put";

    const handleSubmit = (e) => {
        e.preventDefault();
        clearErrors();
        setIsSubmitted(true);

        const formData = new FormData();

        // Append all form values to FormData
        Object.keys(data).forEach(key => {
            if (data[key] !== null && data[key] !== undefined) {
                formData.append(key, data[key]);
            }
        });

        const options = {
            onSuccess: () => {
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
                    toast.error("Error", {
                        description: errors._error,
                    });
                } else {
                    // Generic error if no specific message
                    toast.error("Form Submission Failed", {
                        description: "There was an error submitting the form. Please check the highlighted fields.",
                    });
                }

                // Scroll to the first error
                setTimeout(() => {
                    const firstErrorField = document.querySelector('.error-field');
                    if (firstErrorField) {
                        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 100);
            }
        };

        if (isEditing) {
            put(submitUrl, formData, options);
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
    const handleImageChange = (e, name) => {
        const file = e.target.files[0];
        if (file) {
            setData(name, file);

            // Create image preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreviews(prev => ({
                    ...prev,
                    [name]: e.target.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Clear image and preview
    const clearImage = (name) => {
        setData(name, null);
        setImagePreviews(prev => {
            const newPreviews = { ...prev };
            delete newPreviews[name];
            return newPreviews;
        });

        // Reset the file input
        const fileInput = document.getElementById(name);
        if (fileInput) fileInput.value = '';
    };

    // Initialize image previews for existing images
    useEffect(() => {
        fields.forEach(field => {
            if (field.type === "image" && initialData[field.name] && typeof initialData[field.name] === 'string') {
                setImagePreviews(prev => ({
                    ...prev,
                    [field.name]: initialData[field.name]
                }));
            }
        });
    }, [initialData, fields]);

    const renderField = (field) => {
        const {
            name,
            label,
            type = "text",
            placeholder = "",
            required = false,
            options = [],
            rows = 3,
            min,
            max,
            step,
            helpText,
            className = "",
            disabled = false,
            accept,
        } = field;

        const hasError = !!errors[name];
        const errorClass = hasError ? "border-red-500 focus:ring-red-500" : "";
        const containerClass = hasError ? "error-field" : "";

        const commonProps = {
            id: name,
            disabled,
            className: `${className} ${errorClass}`,
        };

        switch (type) {
            case "text":
            case "email":
            case "password":
            case "number":
            case "tel":
            case "url":
                return (
                    <Input
                        {...commonProps}
                        type={type}
                        value={data[name] || ""}
                        onChange={(e) => setData(name, e.target.value)}
                        placeholder={placeholder}
                        min={min}
                        max={max}
                        step={step}
                        required={required}
                    />
                );

            case "textarea":
                return (
                    <Textarea
                        {...commonProps}
                        value={data[name] || ""}
                        onChange={(e) => setData(name, e.target.value)}
                        placeholder={placeholder}
                        rows={rows}
                        required={required}
                    />
                );

            case "select":
                return (
                    <Select
                        value={data[name]?.toString() || ""}
                        onValueChange={(value) => setData(name, value)}
                        required={required}
                    >
                        <SelectTrigger {...commonProps}>
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {options.map((option) => (
                                <SelectItem
                                    key={option.value}
                                    value={option.value.toString()}
                                >
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );

            case "switch":
                return (
                    <div className="flex items-center space-x-2">
                        <Switch
                            {...commonProps}
                            checked={!!data[name]}
                            onCheckedChange={(checked) => setData(name, checked)}
                            required={required}
                        />
                    </div>
                );

             case "iconPicker":
                return (
                    <div className="flex items-center space-x-2">
                        <IconPicker
                            {...commonProps}
                            value={data[name]?.toString() || ""}
                            onValueChange={(value) => setData(name, value)}
                            required={required}
                        />
                    </div>
             )

            case "checkbox":
                return (
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            {...commonProps}
                            checked={!!data[name]}
                            onCheckedChange={(checked) => setData(name, checked)}
                            required={required}
                        />
                    </div>
                );

            case "radio":
                return (
                    <RadioGroup
                        {...commonProps}
                        value={data[name]?.toString() || ""}
                        onValueChange={(value) => setData(name, value)}
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

            case "date":
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
                                onSelect={(date) => setData(name, date ? format(date, 'yyyy-MM-dd') : null)}
                                disabled={disabled}
                                required={required}
                            />
                        </PopoverContent>
                    </Popover>
                );

            case "image":
                return (
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <Input
                                {...commonProps}
                                type="file"
                                accept={accept || "image/*"}
                                onChange={(e) => handleImageChange(e, name)}
                                required={required && !data[name]}
                            />
                            {imagePreviews[name] && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => clearImage(name)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            )}
                        </div>

                        {/* Image Preview */}
                        {imagePreviews[name] && (
                            <div className="mt-2">
                                <div className="border rounded-md overflow-hidden w-40 h-40 flex items-center justify-center bg-gray-50">
                                    <img
                                        src={imagePreviews[name]}
                                        alt={`Preview for ${label}`}
                                        className="max-w-full max-h-full object-contain"
                                    />
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
                        value={data[name] || ""}
                        onChange={(e) => setData(name, e.target.value)}
                        placeholder={placeholder}
                        required={required}
                    />
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
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <CardContent className="space-y-4">
                        {fields.map((field) => (
                            <div key={field.name} className={`space-y-2 ${errors[field.name] ? 'error-field' : ''}`}>
                                {field.type !== "checkbox" && field.type !== "switch" && (
                                    <Label htmlFor={field.name} className={errors[field.name] ? "text-red-500" : ""}>
                                        {field.label}
                                        {field.required && <span className="text-red-500 ml-1">*</span>}
                                    </Label>
                                )}

                                {renderField(field)}

                                {field.type === "checkbox" || field.type === "switch" ? (
                                    <Label htmlFor={field.name} className={`ml-2 ${errors[field.name] ? "text-red-500" : ""}`}>
                                        {field.label}
                                        {field.required && <span className="text-red-500 ml-1">*</span>}
                                    </Label>
                                ) : null}

                                {field.helpText && (
                                    <p className="text-sm text-gray-500">{field.helpText}</p>
                                )}

                                {errors[field.name] && (
                                    <p className="text-sm text-red-500">{errors[field.name]}</p>
                                )}
                            </div>
                        ))}
                    </CardContent>

                    <CardFooter className="flex justify-end space-x-2">
                        {cancelUrl || cancelLabel !== "Cancel" ? (
                            <Button type="button" variant="outline" onClick={handleCancel}>
                                {cancelLabel}
                            </Button>
                        ) : null}
                        <Button type="submit" disabled={processing}>
                            {processing ? "Processing..." : submitLabel}
                        </Button>
                    </CardFooter>
                </form>
            </Card>

            {/* Include Sonner Toaster component */}
            <Toaster position="top-right" closeButton richColors />
        </>
    );
}