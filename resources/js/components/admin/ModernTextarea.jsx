import { useMemo } from 'react';

const ModernTextarea = ({
    name,
    value,
    onChange,
    data,
    setData,
    placeholder,
    rows = 3,
    required,
    disabled,
    className,
    error,
    success,
    id,
}) => {
    const currentValue = value !== undefined ? value : (data && name ? data[name] || '' : '');

    const borderClasses = useMemo(() => {
        if (error) return 'border-red-500 focus:border-red-500 focus:ring-red-500/20';
        if (success) return 'border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500/20';
        return 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 dark:border-gray-700';
    }, [error, success]);

    const handleChange = (e) => {
        if (onChange) return onChange(e);
        if (setData && name) setData(name, e.target.value);
    };

    return (
        <div className={`w-full ${className || ''}`}>
            <textarea
                id={id}
                rows={rows}
                value={currentValue}
                onChange={handleChange}
                required={required}
                disabled={disabled}
                placeholder={placeholder}
                className={`w-full rounded-md border bg-white px-3 py-2 text-[13px] leading-tight outline-none transition-colors dark:bg-gray-900 dark:text-gray-100 ${borderClasses}`}
            />

            <div className="mt-2 min-h-[18px]">
                {error && <p className="text-[12px] font-medium text-red-600">{error}</p>}
                {success && !error && <p className="text-[12px] font-medium text-emerald-600">{success}</p>}
            </div>
        </div>
    );
};

export default ModernTextarea;
