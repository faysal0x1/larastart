<?php

declare(strict_types=1);

namespace App\Enums;

enum BusinessInfoType: string
{
    case TERMS_AND_CONDITIONS = 'terms_and_conditions';
    case PRIVACY_POLICY = 'privacy_policy';
    case REFUND_POLICY = 'refund_policy';
    case RETURN_POLICY = 'return_policy';
    case CANCELLATION_POLICY = 'cancellation_policy';
    case ABOUT_US = 'about_us';
    case FAQ = 'faq';
    case COMPANY_RELIABILITY = 'company_reliability';
}
