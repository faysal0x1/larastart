<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;

trait HasTranslations
{
    /**
     * Get all translations for this model
     */
    public function translations(): HasMany
    {
        $translationModel = $this->getTranslationModel();

        return $this->hasMany($translationModel, $this->getTranslationForeignKey());
    }

    /**
     * Get translation for specific locale
     */
    public function translation(?string $locale = null): ?object
    {
        $locale = $locale ?: app()->getLocale();

        return $this->translations()->where('locale', $locale)->first();
    }

    /**
     * Get translated attribute
     */
    public function getTranslatedAttribute(string $attribute, ?string $locale = null): ?string
    {
        $translation = $this->translation($locale);

        return $translation ? $translation->{$attribute} : null;
    }

    /**
     * Set translated attribute
     */
    public function setTranslatedAttribute(string $attribute, string $value, ?string $locale = null): void
    {
        $locale = $locale ?: app()->getLocale();
        $translation = $this->translations()->updateOrCreate(
            ['locale' => $locale],
            [$attribute => $value]
        );
    }

    /**
     * Scope to get models with translations
     */
    public function scopeWithTranslation(Builder $query, ?string $locale = null): Builder
    {
        $locale = $locale ?: app()->getLocale();
        $translationModel = $this->getTranslationModel();
        $translationTable = (new $translationModel)->getTable();

        return $query->join($translationTable, function ($join) use ($translationTable) {
            $join->on($this->getTable().'.id', '=', $translationTable.'.'.$this->getTranslationForeignKey())
                ->where($translationTable.'.locale', app()->getLocale());
        });
    }

    /**
     * Scope to filter by translated attribute
     */
    public function scopeWhereTranslated(Builder $query, string $attribute, string $value, ?string $locale = null): Builder
    {
        $locale = $locale ?: app()->getLocale();
        $translationModel = $this->getTranslationModel();
        $translationTable = (new $translationModel)->getTable();

        return $query->join($translationTable, function ($join) use ($translationTable, $locale, $attribute, $value) {
            $join->on($this->getTable().'.id', '=', $translationTable.'.'.$this->getTranslationForeignKey())
                ->where($translationTable.'.locale', $locale)
                ->where($translationTable.'.'.$attribute, 'like', "%{$value}%");
        });
    }

    /**
     * Get the translation model class name
     */
    protected function getTranslationModel(): string
    {
        $modelName = class_basename($this);

        return "App\\Models\\{$modelName}Translation";
    }

    /**
     * Get the foreign key for translations
     */
    protected function getTranslationForeignKey(): string
    {
        return strtolower(class_basename($this)).'_id';
    }

    /**
     * Get translated name (common method)
     */
    public function getTranslatedName(?string $locale = null): ?string
    {
        return $this->getTranslatedAttribute('name', $locale);
    }

    /**
     * Get translated slug (common method)
     */
    public function getTranslatedSlug(?string $locale = null): ?string
    {
        return $this->getTranslatedAttribute('slug', $locale);
    }

    /**
     * Get translated description (common method)
     */
    public function getTranslatedDescription(?string $locale = null): ?string
    {
        return $this->getTranslatedAttribute('description', $locale) ?? $this->getTranslatedAttribute('long_descp', $locale) ?? $this->getTranslatedAttribute('short_descp', $locale);
    }
}
