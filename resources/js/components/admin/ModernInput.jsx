import { Eye, EyeOff, Globe, Lock, Mail, Phone, User } from 'lucide-react';
import { useRef, useState } from 'react';

// Determine the leading icon based on input type
const getIconByType = (inputType) => {
    switch (inputType) {
        case 'email':
            return Mail;
        case 'password':
            return Lock;
        case 'text':
            return User;
        case 'tel':
            return Phone;
        case 'url':
            return Globe;
        default:
            return null;
    }
};


const ModernInput = ({
                         type,
                         name,
                         value = '',
                         onChange,
                         data,
                         setData,
                         placeholder,
                         min,
                         max,
                         step,
                         required,
                         label,
                         error,
                         success,
                         id,
                         disabled,
                         className,
                     }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const inputRef = useRef(null);

    // Support both value/onChange and data/setData patterns
    const inputValue = value !== undefined ? value : data && name ? data[name] || '' : '';
    const valueString = typeof inputValue === 'string' ? inputValue : String(inputValue ?? '');
    const hasValue = valueString.length > 0;

    const handleInputChange = (e) => {
        if (onChange) {
            onChange(e);
        } else if (setData && name) {
            setData(name, e.target.value);
        }
    };

    const Icon = getIconByType(type);
    const actualType = type === 'password' && showPassword ? 'text' : type;

    const getContainerClasses = () => {
        let classes = 'relative group transition-all duration-200 ease-out';

        if (error) {
            classes += ' bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800/30';
        } else if (success) {
            classes += ' bg-emerald-50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-800/30';
        } else {
            classes += ' bg-gray-50 border-gray-200 hover:border-gray-300 dark:bg-gray-900/50 dark:border-gray-700 dark:hover:border-gray-600';
        }

        if (isFocused) {
            if (error) {
                classes += ' ring-2 ring-red-500/20 border-red-400';
            } else if (success) {
                classes += ' ring-2 ring-emerald-500/20 border-emerald-400';
            } else {
                classes += ' ring-2 ring-blue-500/20 border-blue-400 bg-white dark:bg-gray-900';
            }
        }

        if (disabled) {
            classes += ' opacity-60 cursor-not-allowed';
        }

        return classes;
    };

    const getIconColor = () => {
        if (error) return 'text-red-500';
        if (success) return 'text-emerald-500';
        if (isFocused) return 'text-blue-500';
        return 'text-gray-400';
    };

    const getLabelColor = () => {
        if (error) return 'text-red-600 dark:text-red-400';
        if (success) return 'text-emerald-600 dark:text-emerald-400';
        if (isFocused) return 'text-blue-600 dark:text-blue-400';
        return 'text-gray-600 dark:text-gray-300';
    };

    return (
        <div className={`w-full ${className || ''}`}>
            {/* Label */}
            {label && (
                <label
                    htmlFor={id}
                    className={`block text-sm font-medium mb-2 transition-colors duration-200 ${getLabelColor()}`}
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            {/* Input Container */}
            <div className={`
                flex items-center px-4 py-3 rounded-xl border
                ${getContainerClasses()}
            `}>
                {/* Leading Icon */}
                {Icon && (
                    <Icon className={`w-5 h-5 mr-3 transition-colors duration-200 ${getIconColor()}`} />
                )}

                {/* Input Field */}
                <input
                    ref={inputRef}
                    id={id}
                    type={actualType}
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    min={min}
                    max={max}
                    step={step}
                    required={required}
                    disabled={disabled}
                    placeholder={placeholder}
                    className="
                        flex-1 bg-transparent border-none outline-none
                        text-gray-900 dark:text-gray-100
                        placeholder-gray-500 dark:placeholder-gray-400
                        text-base font-medium
                        disabled:cursor-not-allowed
                    "
                />

                {/* Trailing Icons */}
                <div className="flex items-center space-x-2">
                    {/* Status Icon */}
                    {success && type !== 'password' && (
                        <div className="p-1 rounded-full bg-emerald-500">
                            <Check className="w-3 h-3 text-white" strokeWidth={3} />
                        </div>
                    )}

                    {error && type !== 'password' && (
                        <div className="p-1 rounded-full bg-red-500">
                            <X className="w-3 h-3 text-white" strokeWidth={3} />
                        </div>
                    )}

                    {/* Password Toggle */}
                    {type === 'password' && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                            tabIndex={-1}
                        >
                            {showPassword ? (
                                <EyeOff className="w-5 h-5" />
                            ) : (
                                <Eye className="w-5 h-5" />
                            )}
                        </button>
                    )}
                </div>
            </div>

            {/* Helper Text */}
            <div className="mt-2 min-h-[20px]">
                {error && (
                    <p className="text-sm font-medium text-red-600 dark:text-red-400 flex items-center">
                        <X className="w-4 h-4 mr-1" />
                        {error}
                    </p>
                )}

                {success && !error && (
                    <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 flex items-center">
                        <Check className="w-4 h-4 mr-1" />
                        {success}
                    </p>
                )}
            </div>

            {/* Character Count */}
            {type === 'text' && max && (
                <div className="mt-1 text-right">
                    <span className={`text-xs ${valueString.length > max * 0.9 ? 'text-amber-600 dark:text-amber-400' : 'text-gray-500 dark:text-gray-400'}`}>
                        {valueString.length}/{max}
                    </span>
                </div>
            )}
        </div>
    );
};


export default ModernInput;
