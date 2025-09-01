<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

class ImageDownloader extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'image-downloader';
    }
}
