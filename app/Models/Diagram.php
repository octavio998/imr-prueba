<?php

namespace App\Models;
use Illuminate\Database\Eloquent\SoftDeletes;

use Illuminate\Database\Eloquent\Model;

class Diagram extends Model
{
    use SoftDeletes;
    protected $fillable = ['prompt', 'xml'];
    //
}
