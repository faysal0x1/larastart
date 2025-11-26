import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown, Check, Search, X } from 'lucide-react';

const ModernSelect = ({
    name,
    value,
    onChange,
    data,
    setData,
    options = [],
    placeholder = "Select an option",
    label,
    error,
    success,
    required,
    disabled,
    searchable = false,
    multiple = false,
    clearable = false,
    className
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const selectRef = useRef(null);
    const searchInputRef = useRef(null);

    const currentValue = value !== undefined ? value : data && name ? data[name] : (multiple ? [] : '');

    const handleValueChange = useCallback((newValue) => {
        if (onChange) onChange({ target: { name, value: newValue } });
        else if (setData && name) setData(name, newValue);
    }, [onChange, setData, name]);

    const filteredOptions = searchable && searchQuery
        ? options.filter(opt => opt.label.toLowerCase().includes(searchQuery.toLowerCase()))
        : options;

    const hasValue = multiple ? currentValue?.length > 0 : !!currentValue;

    const getDisplayText = () => {
        if (multiple) {
            if (!currentValue || currentValue.length === 0) return placeholder;
            if (currentValue.length === 1) {
                const opt = options.find(o => o.value.toString() === currentValue[0].toString());
                return opt ? opt.label : placeholder;
            }
            return `${currentValue.length} selected`;
        }
        if (!currentValue) return placeholder;
        const opt = options.find(o => o.value.toString() === currentValue.toString());
        return opt ? opt.label : placeholder;
    };

    const handleOptionSelect = (val) => {
        if (multiple) {
            const arr = Array.isArray(currentValue) ? currentValue : [];
            const exists = arr.some(v => v.toString() === val.toString());
            handleValueChange(exists ? arr.filter(v => v.toString() !== val.toString()) : [...arr, val]);
        } else {
            handleValueChange(val);
            setIsOpen(false);
        }
        setSearchQuery('');
    };

    const handleClear = (e) => {
        e.stopPropagation();
        handleValueChange(multiple ? [] : '');
    };

    // Close when clicking outside
    useEffect(() => {
        const clickOutside = (e) => {
            if (selectRef.current && !selectRef.current.contains(e.target)) {
                setIsOpen(false);
                setSearchQuery('');
            }
        };
        document.addEventListener('mousedown', clickOutside);
        return () => document.removeEventListener('mousedown', clickOutside);
    }, []);

    // Auto-focus search box when opened
    useEffect(() => {
        if (isOpen && searchable && searchInputRef.current) searchInputRef.current.focus();
    }, [isOpen, searchable]);

    // Keyboard navigation
    const handleKeyDown = (e) => {
        if (!isOpen) {
            if (e.key === 'ArrowDown' || e.key === 'Enter') {
                setIsOpen(true);
                e.preventDefault();
            }
            return;
        }
        if (e.key === 'ArrowDown') {
            setHighlightedIndex((prev) => (prev + 1) % filteredOptions.length);
            e.preventDefault();
        } else if (e.key === 'ArrowUp') {
            setHighlightedIndex((prev) => (prev - 1 + filteredOptions.length) % filteredOptions.length);
            e.preventDefault();
        } else if (e.key === 'Enter') {
            const opt = filteredOptions[highlightedIndex];
            if (opt) handleOptionSelect(opt.value);
            e.preventDefault();
        } else if (e.key === 'Escape') {
            setIsOpen(false);
            e.preventDefault();
        }
    };

    const containerState = () => {
        let base = 'relative transition-all duration-200 ease-out cursor-pointer';
        if (error) base += ' bg-red-50 border-red-300';
        else if (success) base += ' bg-emerald-50 border-emerald-300';
        else base += ' bg-gray-50 border-gray-200 dark:bg-gray-900/50 dark:border-gray-700';
        if (isOpen || isFocused) base += ' ring-2 ring-blue-500/20 border-blue-400';
        if (disabled) base += ' opacity-60 cursor-not-allowed';
        return base;
    };

    const labelColor = error ? 'text-red-600'
        : success ? 'text-emerald-600'
            : (isOpen || isFocused) ? 'text-blue-600'
                : 'text-gray-600';

    return (
        <div className={`relative w-full ${className || ''}`} ref={selectRef} onKeyDown={handleKeyDown}>
            {label && (
                <label className={`block text-sm font-medium mb-2 transition-colors duration-200 ${labelColor}`}>
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            {/* Trigger */}
            <div
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg border ${containerState()}`}
                tabIndex={disabled ? -1 : 0}
                onClick={() => !disabled && setIsOpen(!isOpen)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            >
                <span className={`text-sm flex-1 ${hasValue ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400'}`}>
                    {getDisplayText()}
                </span>

                <div className="flex items-center space-x-2">
                    {clearable && hasValue && !disabled && (
                        <button
                            onClick={handleClear}
                            className="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </div>
            </div>

            {/* Dropdown */}
            {isOpen && !disabled && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md z-50 max-h-64 overflow-hidden">
                    {searchable && (
                        <div className="p-1.5 border-b border-gray-200 dark:border-gray-700">
                            <div className="relative">
                                ...
                                <input
                                    className="w-full pl-8 pr-2 py-1 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                                />
                            </div>
                        </div>
                    )}

                    <div className="max-h-48 overflow-y-auto">
                        {filteredOptions.map((opt, idx) => (
                            <div
                                key={opt.value}
                                onClick={() => handleOptionSelect(opt.value)}
                                className={`
            flex items-center px-2 py-1 cursor-pointer text-sm transition
            ${isHighlighted ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'}
            ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-gray-100'}
          `}
                            >
                                ...
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {/* Helper Text */}
            <div className="mt-2 min-h-[20px]">
                {error && (
                    <p className="text-sm font-medium text-red-600 dark:text-red-400 flex items-center">
                        <X className="w-4 h-4 mr-1" /> {error}
                    </p>
                )}
                {success && !error && (
                    <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 flex items-center">
                        <Check className="w-4 h-4 mr-1" /> {success}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ModernSelect;
