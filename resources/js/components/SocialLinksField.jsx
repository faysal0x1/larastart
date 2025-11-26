// SocialLinksField.jsx

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
    Plus,
    Trash2,
    GripVertical,
    Facebook,
    Instagram,
    Twitter,
    Youtube,
    Linkedin,
    Github,
    Link2,
    MessageCircle     // using this as a substitute for WhatsApp
} from 'lucide-react';

// If you have a custom WhatsApp SVG component:
// import { ReactComponent as WhatsAppIcon } from '/path/to/whatsapp.svg';

const PLATFORM_OPTIONS = [
    { value: 'Facebook', label: 'Facebook', icon: 'Facebook' },
    { value: 'Instagram', label: 'Instagram', icon: 'Instagram' },
    { value: 'Twitter', label: 'Twitter', icon: 'Twitter' },
    { value: 'YouTube', label: 'YouTube', icon: 'Youtube' },
    { value: 'LinkedIn', label: 'LinkedIn', icon: 'Linkedin' },
    { value: 'GitHub', label: 'GitHub', icon: 'Github' },
    { value: 'WhatsApp', label: 'WhatsApp', icon: 'WhatsApp' }
];

const IconComponents = {
    Facebook,
    Instagram,
    Twitter,
    Youtube,
    Linkedin,
    Github,
    // If using substitute:
    WhatsApp: MessageCircle,
    Link2
    // If using custom SVG: replace WhatsApp: WhatsAppIcon
};

export default function SocialLinksField({ value = [], onChange, errors = {} }) {
    const addSocialLink = () => {
        const newLink = {
            platform: '',
            url: '',
            icon: '',
            order: value.length,
            is_active: true,
        };
        onChange([...value, newLink]);
    };

    const removeSocialLink = (index) => {
        const updated = value.filter((_, i) => i !== index);
        updated.forEach((link, i) => { link.order = i; });
        onChange(updated);
    };

    const updateSocialLink = (index, field, fieldValue) => {
        const updated = [...value];
        updated[index] = {
            ...updated[index],
            [field]: fieldValue,
        };

        if (field === 'platform' && fieldValue) {
            const selectedPlatform = PLATFORM_OPTIONS.find(p => p.value === fieldValue);
            if (selectedPlatform && selectedPlatform.icon) {
                updated[index].icon = selectedPlatform.icon;
            } else if (fieldValue === 'Other') {
                updated[index].icon = '';
            }
        }

        onChange(updated);
    };

    const getPlatformIcon = (platformName) => {
        const platform = PLATFORM_OPTIONS.find(p => p.value === platformName);
        if (platform && platform.icon) {
            const IconComponent = IconComponents[platform.icon];
            if (IconComponent) {
                return <IconComponent className="h-4 w-4" />;
            }
        }
        return null;
    };

    const renderIconPreview = (iconName) => {
        if (!iconName || !IconComponents[iconName]) return null;
        const IconComponent = IconComponents[iconName];
        return (
            <div className="flex items-center justify-center w-10 h-10 border rounded-md bg-muted">
                <IconComponent className="h-5 w-5" />
            </div>
        );
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Label className="text-base font-semibold">Social Links</Label>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addSocialLink}
                    className="flex items-center gap-2"
                >
                    <Plus className="h-4 w-4" />
                    Add Social Link
                </Button>
            </div>

            {value.length === 0 && (
                <div className="text-sm text-muted-foreground p-4 border border-dashed rounded-lg text-center">
                    No social links added. Click "Add Social Link" to add one.
                </div>
            )}

            <div className="space-y-4">
                {value.map((link, index) => (
                    <div key={index} className="p-4 border rounded-lg bg-card space-y-4">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <GripVertical className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium text-muted-foreground">
                                    Social Link #{index + 1}
                                </span>
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeSocialLink(index)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor={`social_links_${index}_platform`}>
                                    Platform <span className="text-red-500">*</span>
                                </Label>
                                <Select
                                    value={link.platform || ''}
                                    onValueChange={(value) => updateSocialLink(index, 'platform', value)}
                                >
                                    <SelectTrigger
                                        id={`social_links_${index}_platform`}
                                        className={errors[`social_links.${index}.platform`] ? 'border-red-500' : ''}
                                    >
                                        <SelectValue placeholder="Select a platform">
                                            {link.platform && (
                                                <div className="flex items-center gap-2">
                                                    {getPlatformIcon(link.platform)}
                                                    <span>{link.platform}</span>
                                                </div>
                                            )}
                                        </SelectValue>
                                    </SelectTrigger>

                                    <SelectContent>
                                        {PLATFORM_OPTIONS.map((platform) => {
                                            const IconComponent = platform.icon ? IconComponents[platform.icon] : null;
                                            return (
                                                <SelectItem key={platform.value} value={platform.value}>
                                                    <div className="flex items-center gap-2">
                                                        {IconComponent && <IconComponent className="h-4 w-4" />}
                                                        <span>{platform.label}</span>
                                                    </div>
                                                </SelectItem>
                                            );
                                        })}
                                    </SelectContent>
                                </Select>
                                {errors[`social_links.${index}.platform`] && (
                                    <p className="text-sm text-red-500">{errors[`social_links.${index}.platform`]}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor={`social_links_${index}_url`}>
                                    URL <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id={`social_links_${index}_url`}
                                    type="url"
                                    value={link.url || ''}
                                    onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                                    placeholder="https://..."
                                    className={errors[`social_links.${index}.url`] ? 'border-red-500' : ''}
                                />
                                {errors[`social_links.${index}.url`] && (
                                    <p className="text-sm text-red-500">{errors[`social_links.${index}.url`]}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor={`social_links_${index}_icon`}>
                                    Icon {link.platform && link.platform !== 'Other' ? '(Auto-filled)' : '(Optional)'}
                                </Label>
                                <div className="flex items-center gap-2">
                                    <Input
                                        id={`social_links_${index}_icon`}
                                        value={link.icon || ''}
                                        onChange={(e) => updateSocialLink(index, 'icon', e.target.value)}
                                        placeholder="Icon name (e.g., Facebook, Instagram)"
                                        disabled={link.platform && link.platform !== 'Other'}
                                        className={link.platform && link.platform !== 'Other' ? 'bg-muted' : ''}
                                    />
                                    {renderIconPreview(link.icon)}
                                </div>
                                {link.platform && link.platform !== 'Other' && (
                                    <p className="text-xs text-muted-foreground">
                                        Icon is automatically set based on platform selection
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor={`social_links_${index}_order`}>
                                    Display Order
                                </Label>
                                <Input
                                    id={`social_links_${index}_order`}
                                    type="number"
                                    value={link.order ?? index}
                                    onChange={(e) => updateSocialLink(index, 'order', parseInt(e.target.value, 10) || index)}
                                    min="0"
                                />
                            </div>
                        </div>

                        <div className="flex items-center space-x-2 pt-2">
                            <Switch
                                id={`social_links_${index}_is_active`}
                                checked={link.is_active !== false}
                                onCheckedChange={(checked) => updateSocialLink(index, 'is_active', checked)}
                            />
                            <Label htmlFor={`social_links_${index}_is_active`} className="cursor-pointer">
                                Active
                            </Label>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}
