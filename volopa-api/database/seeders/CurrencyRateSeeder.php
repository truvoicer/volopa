<?php

namespace Database\Seeders;

use App\Constants\CurrencyConstants;
use App\Models\Currency;
use App\Models\CurrencyRate;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Seeder;

class CurrencyRateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $getCurrencies = Currency::all();
        foreach ($getCurrencies as $baseCurrency) {
            $findRates = $this->findCurrencyRatesByCode($baseCurrency->code);
            if (!$findRates) {
                continue;
            }
            foreach ($findRates as $targetCode => $targetRate) {
                $findTargetCurrency = $this->findCurrencyByCode($targetCode, $getCurrencies);
                if (!$findTargetCurrency) {
                    continue;
                }
                $currencyRate = new CurrencyRate();
                $currencyRate->base_currency_id = $baseCurrency->id;
                $currencyRate->target_currency_id = $findTargetCurrency->id;
                $currencyRate->rate = $targetRate;
                $currencyRate->save();
            }
        }

    }

    private function findCurrencyRatesByCode(string $code)
    {
        $rates = CurrencyConstants::CURRENCY_RATES;
        return (isset($rates[$code]['rates']) && is_array($rates[$code]['rates'])) ? $rates[$code]['rates'] : false;
    }

    private function findCurrencyByCode(string $code, Collection $currencies)
    {
        foreach ($currencies as $currency) {
            if ($code === $currency->code) {
                return $currency;
            }
        }
        return false;
    }
}
