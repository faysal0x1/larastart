import { useEffect, useMemo, useState } from 'react';
import CreatableSelect from 'react-select/creatable';

export const GlobalSelect = ({
    label,
    isMulti = false,
    options = [],
    value,
    onChange,
    onCreateNew,
    placeholder = 'Select or create...',
    createdOptions = [],
    onCreatedOptionsChange,
    formatOptionLabel,
    isSearchable = true,
    isClearable: clearableProp,
}) => {
    const [localCreatedOptions, setLocalCreatedOptions] = useState([]);

    const currentCreatedOptions = createdOptions.length > 0 ? createdOptions : localCreatedOptions;

    const allOptions = useMemo(() => {
        const existingValues = new Set(options.map((opt) => opt.value));
        const uniqueCreatedOptions = currentCreatedOptions.filter((opt) => !existingValues.has(opt.value));
        return [...options, ...uniqueCreatedOptions];
    }, [options, currentCreatedOptions]);

    useEffect(() => {
        if (localCreatedOptions.length > 0 && options.length === 0) {
            setLocalCreatedOptions([]);
        }
    }, [options.length]);

    const getSelectedValue = () => {
        if (isMulti) {
            const selectedValues = Array.isArray(value) ? value : [];
            return allOptions.filter((opt) => selectedValues.includes(opt.value));
        } else {
            const foundOption = allOptions.find((opt) => opt.value === value);
            if (foundOption) {
                return foundOption;
            }
            if (value !== null && value !== undefined && value !== '') {
                const createdOption = currentCreatedOptions.find((opt) => opt.value === value);
                return {
                    value: value,
                    label: createdOption ? createdOption.label : String(value),
                };
            }
            return null;
        }
    };

    const handleCreate = (inputValue) => {
        const newOption = {
            value: inputValue,
            label: inputValue,
            isNew: true,
            originalName: inputValue,
        };

        // Update created options
        if (onCreatedOptionsChange) {
            onCreatedOptionsChange([...currentCreatedOptions, newOption]);
        } else {
            setLocalCreatedOptions((prev) => [...prev, newOption]);
        }

        // Allow parent to handle saving (pass the inputValue as name and inputValue as tempId)
        if (onCreateNew) {
            onCreateNew(inputValue, inputValue);
        }

        // Update the value
        if (isMulti) {
            const currentValues = Array.isArray(value) ? value : [];
            onChange([...currentValues, inputValue]);
        } else {
            onChange(inputValue);
        }
    };

    const handleChange = (selected) => {
        if (isMulti) {
            onChange(selected ? selected.map((s) => s.value) : []);
        } else {
            onChange(selected ? selected.value : '');
        }
    };

    return (
        <div>
            {label && <label className="mb-2 block text-sm font-medium text-gray-700">{label}</label>}
            <CreatableSelect
                isMulti={isMulti}
                options={allOptions}
                value={getSelectedValue()}
                onChange={handleChange}
                onCreateOption={handleCreate}
                placeholder={placeholder}
                className="w-full"
                classNamePrefix="react-select"
                isClearable={clearableProp !== undefined ? clearableProp : !isMulti}
                isSearchable={isSearchable}
                formatOptionLabel={formatOptionLabel}
                formatCreateLabel={(inputValue) => `Create "${inputValue}"`}
                styles={{
                    control: (base, state) => ({
                        ...base,
                        borderColor: state.isFocused ? '#3b82f6' : '#d1d5db',
                        boxShadow: state.isFocused ? '0 0 0 2px rgba(59, 130, 246, 0.5)' : 'none',
                        '&:hover': {
                            borderColor: '#3b82f6',
                        },
                    }),
                }}
            />
        </div>
    );
};
