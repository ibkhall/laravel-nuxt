<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class System extends Model
{
    use HasFactory, LogsActivity;
    public $timestamps = false;

    protected $fillable = ['name', 'logo', 'address', 'telephone1', 'telephone2', 'telephone3', 'telephone4'];

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults();
    }

    public function setLogoAttribute($value) {
        if($value instanceof UploadedFile) {
            $this->attributes['logo'] = 'storage/'.$value->storePublicly('img', ['disk' => 'public']);

        }else {
            $this->attributes['logo'] = $value;
        }
    }
}
