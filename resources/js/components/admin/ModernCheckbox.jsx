import { Checkbox } from '@/components/ui/checkbox';

const ModernCheckbox = ({
    name,
    checked,
    onCheckedChange,
    data,
    setData,
    required,
    disabled,
    className,
    error,
    success,
    id,
    label,
}) => {
    const currentChecked = checked !== undefined ? checked : !!(data && name ? data[name] : false);

    const handleChange = (val) => {
        if (onCheckedChange) return onCheckedChange(val);
        if (setData && name) setData(name, val);
    };

    return (
        <div className={`flex items-center gap-2 ${className || ''}`}>
            <Checkbox id={id} checked={currentChecked} onCheckedChange={handleChange} required={required} disabled={disabled} />
            {label && <label htmlFor={id} className="text-sm">{label}</label>}
            <div className="ml-2 min-h-[18px]">
                {error && <span className="text-[12px] text-red-600">{error}</span>}
                {success && !error && <span className="text-[12px] text-emerald-600">{success}</span>}
            </div>
        </div>
    );
};

export default ModernCheckbox;
