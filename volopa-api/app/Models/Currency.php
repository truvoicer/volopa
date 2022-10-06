<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';
    protected $table = 'currency';

    /**
     * Get the currency rates for the currency.
     */
    public function currencyRates()
    {
        return $this->hasMany(CurrencyRate::class, 'base_currency_id', 'id');
    }

}
