import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

const ModernDate = ({
    name,
    value,
    onChange,
    data,
    setData,
    required,
    disabled,
    placeholder = 'Select a date',
    className,
    id,
}) => {
    const currentValue = value !== undefined ? value : (data && name ? data[name] : null);

    const handleSelect = (date) => {
        const formatted = date ? format(date, 'yyyy-MM-dd') : null;
        if (onChange) return onChange(formatted);
        if (setData && name) setData(name, formatted);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${!currentValue ? 'text-muted-foreground' : ''} ${className || ''}`}
                    id={id}
                    disabled={disabled}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {currentValue ? format(new Date(currentValue), 'PPP') : placeholder}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={currentValue ? new Date(currentValue) : undefined}
                    onSelect={(date) => handleSelect(date)}
                    disabled={disabled}
                    required={required}
                />
            </PopoverContent>
        </Popover>
    );
};

export default ModernDate;
