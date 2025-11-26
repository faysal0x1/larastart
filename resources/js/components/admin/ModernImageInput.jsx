import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

const ModernImageInput = ({
    name,
    value,
    onChange,
    data,
    setData,
    required,
    disabled,
    accept = 'image/*',
    className,
    id,
    label,
}) => {
    const currentValue = value !== undefined ? value : (data && name ? data[name] : null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (typeof currentValue === 'string') {
            setPreview(currentValue);
        } else if (currentValue instanceof File) {
            const reader = new FileReader();
            reader.onload = (e) => setPreview(e.target.result);
            reader.readAsDataURL(currentValue);
        } else {
            setPreview(null);
        }
    }, [currentValue]);

    const handleChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (onChange) return onChange(e);
        if (setData && name) setData(name, file);
    };

    const handleClear = () => {
        if (setData && name) setData(name, null);
        setPreview(null);
        const input = document.getElementById(id || name);
        if (input) input.value = '';
    };

    return (
        <div className={`space-y-2 ${className || ''}`}>
            <div className="flex items-center gap-2">
                <Input id={id || name} type="file" accept={accept} onChange={handleChange} required={required && !currentValue} disabled={disabled} />
                {preview && (
                    <Button type="button" variant="outline" size="icon" onClick={handleClear}>
                        <X className="h-4 w-4" />
                    </Button>
                )}
            </div>

            {preview && (
                <div className="mt-1">
                    <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-md border bg-gray-50">
                        <img src={preview} alt={label || name} className="max-h-full max-w-full object-contain" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModernImageInput;
