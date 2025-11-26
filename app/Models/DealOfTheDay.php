<?php
namespace App\Models;

use App\Traits\HasSingleImageMedia;
use App\Traits\SlugGenerator;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class DealOfTheDay extends Model implements HasMedia
{
    use SlugGenerator, InteractsWithMedia, HasSingleImageMedia;

    protected $table   = 'deal_of_the_days';
    protected $appends = ['image_url'];

    // Image processing options - customize these as needed
    protected string $imageFormat      = 'webp';
    protected int $imageQuality        = 85;
    protected int $imageMaxWidth       = 800;
    protected int $imageMaxHeight      = 600;
    protected string $imageAspectRatio = '4:3';
    // protected bool $imageCrop          = true;
    protected string $imageResizeMode  = 'crop';

    protected $fillable = [
        'title',
        'slug',
        'start_date',
        'end_date',
        'image',
        'discount_type',
        'discount',
        'status',
    ];
    public function registerMediaCollections(): void
    {
        $this->registerSingleImageMediaCollection();
    }

    public function dealOfTheDayProduct(){
        return $this->hasMany(DealOfTheDayProduct::class);
    }


    /**
     * Override image processing options if needed
     * You can customize this method to return different options based on model data
     */
//    public function getImageProcessingOptions(): array
//    {
//        $options = parent::getImageProcessingOptions();

//        if ($this->status === 'featured') {
//            $options['imageQuality']   = 95;
//            $options['imageMaxWidth']  = 1200;
//            $options['imageMaxHeight'] = 800;
//        }

//        return $options;
//    }
}
