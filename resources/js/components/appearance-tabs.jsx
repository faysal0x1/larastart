import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import { Moon, Sun } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function AppearanceToggleTab({ className = '', ...props }) {
    const { appearance, updateAppearance } = useAppearance();

    const themes = [
        { value: 'light', icon: Sun, label: 'Light' },
        { value: 'dark', icon: Moon, label: 'Dark' },
    ];

    const currentValue = themes.some((theme) => theme.value === appearance) ? appearance : 'light';

    return (
        <Select value={currentValue} onValueChange={updateAppearance} {...props}>
            <SelectTrigger className={cn('w-[140px] justify-between', className)}>
                <SelectValue aria-label={`${currentValue} theme`}>
                    <div className="flex items-center gap-2 text-sm">
                        {themes
                            .filter((theme) => theme.value === currentValue)
                            .map(({ value, icon: Icon, label }) => (
                                <span key={value} className="flex items-center gap-2">
                                    <Icon className="h-4 w-4" />
                                    {label}
                                </span>
                            ))}
                    </div>
                </SelectValue>
            </SelectTrigger>
            <SelectContent align="end">
                {themes.map(({ value, icon: Icon, label }) => (
                    <SelectItem key={value} value={value}>
                        <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4" />
                            {label}
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
