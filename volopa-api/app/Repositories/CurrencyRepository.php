<?php

namespace App\Repositories;

use App\Models\Currency;

/**
 * Currency Repository class
 * Holds database related functions for currency
 */
class CurrencyRepository
{
    /**
     * Retrieves all currencies from the database
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getCurrencyList()
    {
        return Currency::all();
    }

    /**
     * Validates currency code parameters
     * Calls findCurrencyRate function
     * Returns currency rates for base currency
     * Returns error array on fail
     *
     * @param string $baseCurrencyCode
     * @param string $targetCurrencyCode
     * @return array
     */
    public function findCurrencyRateByCode(string $baseCurrencyCode, string $targetCurrencyCode)
    {
        try {
            $baseCurrency = Currency::query()->where('code', '=', $baseCurrencyCode)->first();
            $targetCurrency = Currency::query()->where('code', '=', $targetCurrencyCode)->first();
            if ($baseCurrency instanceof Currency && $targetCurrency instanceof Currency) {
                return $this->findCurrencyRate($baseCurrency, $targetCurrency);
            }
            if (!$baseCurrency && !$targetCurrency) {
                $message = "{$baseCurrencyCode}, {$targetCurrencyCode}";
            } elseif (!$baseCurrency) {
                $message = $baseCurrencyCode;
            } else {
                $message = $targetCurrencyCode;
            }
            return ['message' => sprintf('Currency data does not exist for (%s)', $message)];
        } catch (\Exception $exception) {
            return ['message' => $exception->getMessage()];
        }
    }

    /**
     * Fetches currency rates for a base currency and target currency relationship in the database
     * Returns an array of the results
     *
     * @param Currency $baseCurrency
     * @param Currency $targetCurrency
     * @return array
     */
    public function findCurrencyRate(Currency $baseCurrency, Currency $targetCurrency)
    {
        return $baseCurrency->currencyRates()
            ->where('target_currency_id',  '=', $targetCurrency->id)
            ->first()->toArray();
    }
}
