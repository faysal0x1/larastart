<?php

declare(strict_types=1);

namespace App\Enums;

enum CouponType: string
{
    case PERCENTAGE = 'percentage';
    case FIXED = 'fixed';

    public static function values(): array
    {
        return [
            self::PERCENTAGE,
            self::FIXED,
        ];
    }

    public static function options(): array
    {
        return [
            ['label' => 'Percentage', 'value' => self::PERCENTAGE->value],
            ['label' => 'Fixed', 'value' => self::FIXED->value],
        ];
    }
}
