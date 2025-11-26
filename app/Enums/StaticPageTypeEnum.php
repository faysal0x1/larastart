<?php

declare(strict_types=1);

namespace App\Enums;

enum StaticPageTypeEnum: string
{
    case RETURN_POLICY         = 'return-policy';
    case PRIVACY_POLICY        = 'privacy-policy';
    case TERMS_AND_CONDITIONS  = 'terms-and-conditions';

    public function label(): string
    {
        return match ($this) {
            self::RETURN_POLICY        => 'Return Policy',
            self::PRIVACY_POLICY       => 'Privacy & Security',
            self::TERMS_AND_CONDITIONS => 'Terms & Conditions',
        };
    }

    public static function options(): array
    {
        return array_map(
            fn (self $case) => [
                'value' => $case->value,
                'label' => $case->label(),
            ],
            self::cases()
        );
    }
}
