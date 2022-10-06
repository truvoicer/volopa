<?php

namespace Database\Seeders;

use App\Constants\CurrencyConstants;
use App\Models\Currency;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CurrencySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach (CurrencyConstants::CURRENCY_RATES as $code => $currency) {
            $currencyModel = new Currency();
            $currencyModel->code = $code;
            $currencyModel->name = $currency['name'];
            $currencyModel->common = (isset($currency['common']) && $currency['common']);
            $currencyModel->save();
        }
    }
}
