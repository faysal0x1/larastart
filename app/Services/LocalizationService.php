<?php

namespace App\Services;

use App\Models\Language;
use Illuminate\Support\Facades\Session;

class LocalizationService
{
    /**
     * Get current locale
     */
    public static function getCurrentLocale(): string
    {
        return Session::get('locale', config('app.locale'));
    }

    /**
     * Set current locale
     */
    public static function setCurrentLocale(string $locale): void
    {
        Session::put('locale', $locale);
        app()->setLocale($locale);
    }

    /**
     * Get available locales
     */
    public static function getAvailableLocales(): \Illuminate\Database\Eloquent\Collection
    {
        return Language::active()->orderBy('sort_order')->get();
    }

    /**
     * Get default locale
     */
    public static function getDefaultLocale(): string
    {
        $defaultLanguage = Language::default()->first();

        return $defaultLanguage ? $defaultLanguage->code : config('app.locale');
    }

    /**
     * Check if locale is valid
     */
    public static function isValidLocale(string $locale): bool
    {
        return Language::where('code', $locale)->where('is_active', true)->exists();
    }

    /**
     * Get locale name
     */
    public static function getLocaleName(string $locale): ?string
    {
        $language = Language::where('code', $locale)->first();

        return $language ? $language->name : null;
    }

    /**
     * Get locale native name
     */
    public static function getLocaleNativeName(string $locale): ?string
    {
        $language = Language::where('code', $locale)->first();

        return $language ? $language->native_name : null;
    }
}
