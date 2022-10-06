<?php

namespace App\Constants;
/**
 * Currency constants class
 * Contains currency data for database seeding
 */
class CurrencyConstants
{
    /**
     * Data for database seeding
     */
    public const CURRENCY_RATES = [
        'GBP' => [
            'name' => 'Great British Pound',
            'common' => true,
            'rates' => [
                'USD' => 1.14,
                'EUR' => 1.15,
                'AUD' => 1.76,
            ]
        ],
        'EUR' => [
            'name' => 'Euro',
            'common' => true,
            'rates' => [
                'GBP' => 0.88,
                'USD' => 1.00,
                'AUD' => 1.54,
            ]
        ],
        'USD' => [
            'name' => 'US Dollar',
            'rates' => [
                'GBP' => 0.87,
                'EUR' => 1.00,
                'AUD' => 1.54,
            ]
        ],
        'AUD' => [
            'name' => 'Australian Dollar',
            'rates' => [
                'GBP' => 0.57,
                'USD' => 0.65,
                'EUR' => 0.65,
            ]
        ]
    ];
}
