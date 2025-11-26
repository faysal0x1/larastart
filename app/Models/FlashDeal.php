<?php

namespace App\Models;

use App\Traits\HasSingleImageMedia;
use App\Traits\SlugGenerator;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class FlashDeal extends Model implements HasMedia
{
    use SlugGenerator, InteractsWithMedia, HasSingleImageMedia;

    protected $appends = ['image_url'];
    protected $table = 'flash_deals';

    protected string $imageFormat      = 'webp';
    protected int $imageQuality        = 85;
    protected int $imageMaxWidth       = 800;
    protected int $imageMaxHeight      = 600;
    protected string $imageAspectRatio = '4:3';
    protected bool $imageCrop          = true;
    protected string $imageResizeMode  = 'crop';

    protected $fillable = [
        'title',
        'slug',
        'start_date',
        'end_date',
        'image',
        'status'
    ];


    // Relationships
    public function flashDealProducts(): HasMany {
        return $this->hasMany(FlashDealProduct::class, 'flash_deal_id');
    }

    public function registerMediaCollections(): void
    {
        $this->registerSingleImageMediaCollection();
    }
    /**
     * Override image processing options if needed
     * You can customize this method to return different options based on model data
     */
    public function getImageProcessingOptions(): array
    {
        $options = parent::getImageProcessingOptions();

        if ($this->status === 'featured') {
            $options['imageQuality']   = 95;
            $options['imageMaxWidth']  = 1200;
            $options['imageMaxHeight'] = 800;
        }

        return $options;
    }


}
