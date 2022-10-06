<?php

namespace App\Service;

use App\Repositories\CurrencyRepository;

/**
 * Currency service class
 *
 * Holds functions for currency related tasks
 */
class CurrencyService
{
    /**
     * Fetches currency rates from the database and calculates the amount
     * Calculates the currency conversion both ways
     *
     * Returns array of currency conversion data
     * @param string $convertToCurrencyCode
     * @param string $convertFromCurrencyCode
     * @param float|null $convertTo
     * @param float|null $convertFrom
     * @return array
     */
    public function convertCurrency(string $convertToCurrencyCode, string $convertFromCurrencyCode, ?float $convertTo, ?float $convertFrom) {
        if ($convertToCurrencyCode === $convertFromCurrencyCode) {
            return $this->buildMatchingCurrencyCodeData(
                $convertToCurrencyCode,
                $convertFromCurrencyCode,
                $convertTo,
                $convertFrom
            );
        }

        $currencyRepo = new CurrencyRepository();
        $rates = [];    //Initialise rates array
        if ($convertTo) {   //If convert to amount is set
            //Fetch conversion rates for 'to' currency code 'to' from currency codes
            $rates['convert_to'] = $currencyRepo->findCurrencyRateByCode($convertToCurrencyCode, $convertFromCurrencyCode);
            //Calculate the currency amount/value
            $rates['convert_to']['amount'] =  number_format(($convertTo * $rates['convert_to']['rate']), 2);
        }
        if ($convertFrom) {     //If convert from amount is set
            //Fetch conversion rates for 'from' currency code to 'to' currency codes
            $rates['convert_from'] = $currencyRepo->findCurrencyRateByCode($convertFromCurrencyCode, $convertToCurrencyCode);
            //Calculate the currency amount/value
            $rates['convert_from']['amount'] = number_format(($convertFrom * $rates['convert_from']['rate']), 2);
        }
        return $rates;
    }

    private function buildMatchingCurrencyCodeData(string $convertToCurrencyCode, string $convertFromCurrencyCode, ?float $convertTo, ?float $convertFrom) {
        $rates = [];
        if ($convertTo) {
            $rates['convert_to'] = [
                'rate' => 0,
                'amount' => $convertTo
            ];
        }
        if ($convertFrom) {
            $rates['convert_from'] = [
                'rate' => 0,
                'amount' => $convertFrom
            ];
        }
        return $rates;
    }
}
