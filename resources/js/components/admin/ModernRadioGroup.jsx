import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const ModernRadioGroup = ({
    name,
    value,
    onValueChange,
    data,
    setData,
    options = [],
    required,
    disabled,
    className,
    error,
    success,
    idPrefix,
}) => {
    const currentValue = value !== undefined ? value : (data && name ? data[name] ?? '' : '');

    const handleChange = (val) => {
        if (onValueChange) return onValueChange(val);
        if (setData && name) setData(name, val);
    };

    return (
        <div className={`w-full ${className || ''}`}>
            <RadioGroup value={currentValue?.toString() || ''} onValueChange={handleChange} required={required} disabled={disabled}>
                <div className="space-y-2">
                    {options.map((option) => {
                        const id = `${idPrefix || name}-${option.value}`;
                        return (
                            <div key={option.value} className="flex items-center space-x-2">
                                <RadioGroupItem value={option.value.toString()} id={id} />
                                <label htmlFor={id}>{option.label}</label>
                            </div>
                        );
                    })}
                </div>
            </RadioGroup>

            <div className="mt-2 min-h-[18px]">
                {error && <p className="text-[12px] font-medium text-red-600">{error}</p>}
                {success && !error && <p className="text-[12px] font-medium text-emerald-600">{success}</p>}
            </div>
        </div>
    );
};

export default ModernRadioGroup;
