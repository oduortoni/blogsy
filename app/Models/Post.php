<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Post extends Model
{
    protected $fillable = [
        'title',
        'content',
        'slug',
        'is_published',
        'views',
        'likes',
    ];

    protected $table = 'posts';
    protected $dateFormat = 'd-m-Y H:i:s';

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
