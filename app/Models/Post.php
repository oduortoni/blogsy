<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Post extends Model
{
    protected $fillable = [
        'title',
        'content',
        'slug',
        'featured_image',
        'is_published',
        'published_at',
        'views',
        'likes',
    ];

    protected $table = 'posts';

    protected $dateFormat = 'd-m-Y H:i:s';

    protected $casts = [
        'content' => 'array',
    ];

    public function images(): MorphMany
    {
        return $this->morphMany(Image::class, 'imageable');
    }

    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->format('d-m-Y H:i:s');
    }

    public function getUpdatedAtAttribute($value)
    {
        return Carbon::parse($value)->format('d-m-Y H:i:s');
    }

    public function getIsPublishedAttribute($value)
    {
        return $value ? true : false;
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }
}
