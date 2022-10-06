<?php

namespace Tests\Unit;

use App\Models\User;
use Database\Seeders\CurrencyRateSeeder;
use Database\Seeders\CurrencySeeder;
use Database\Seeders\UserSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CurrencyTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_currency_list()
    {
        // Run the CurrencySeeder...
        $this->seed(CurrencySeeder::class);
        $this->assertDatabaseHas('currency', [
            'code' => 'GBP',
        ]);
    }

    /**
     * @depends test_can_create_currency_list
     */
    public function test_can_create_currency_rates()
    {
        // Run the CurrencySeeder...
        $this->seed(CurrencySeeder::class);
        // Run the CurrencySeeder...
        $this->seed(CurrencyRateSeeder::class);
        $this->assertDatabaseCount('currency_rate', 12);
    }

    /**
     * @depends test_can_create_currency_list
     */
    public function test_can_get_currency_list()
    {
        $this->seed(UserSeeder::class);
        $this->seed(CurrencySeeder::class);
        $response = $this->withHeader('Accepts', 'application/json')
            ->post(self::LOGIN_URL, self::LOGIN_DATA);
        $response = $this->withHeader('Authorization', "Bearer {$response['data']['token']}")
            ->get('/api/currency/list');
        $response->assertStatus(200);
    }

    /**
     * @depends test_can_create_currency_rates
     */
    public function test_can_get_currency_rates()
    {
        $this->seed(UserSeeder::class);
        $this->seed(CurrencySeeder::class);
        $this->seed(CurrencyRateSeeder::class);
        $response = $this->withHeader('Accepts', 'application/json')
            ->post(self::LOGIN_URL, self::LOGIN_DATA);
        $response = $this->withHeader('Authorization', "Bearer {$response['data']['token']}")
            ->get('/api/currency/convert?convertToCurrencyCode=GBP&convertTo=22&convertFromCurrencyCode=AUD');
        $response->assertStatus(200);
    }
}
