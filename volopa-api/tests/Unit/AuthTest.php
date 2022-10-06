<?php

namespace Tests\Unit;

use App\Models\User;
use Database\Seeders\UserSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_user()
    {
        // Run the CurrencySeeder...
        $this->seed(UserSeeder::class);
        $this->assertDatabaseHas('users', [
            'email' => 'admin@email.com',
        ]);
    }

    /**
     * @depends test_can_create_user
     */
    public function test_user_can_login()
    {
        // define your $token here
        $this->seed(UserSeeder::class);
        $response = $this->withHeader('Accepts', 'application/json')
            ->post(self::LOGIN_URL, self::LOGIN_DATA);
        $response->assertStatus(200);
    }

    /**
     * @depends test_user_can_login
     */
    public function test_token_auth()
    {
        // define your $token here
        $this->seed(UserSeeder::class);
        $response = $this->withHeader('Accepts', 'application/json')
            ->post(self::LOGIN_URL, self::LOGIN_DATA);
        $token = $response['data']['token'];
        $response = $this->withHeader('Authorization', "Bearer {$token}")
            ->get('/api/token/refresh');
        $response->assertStatus(200);
    }
}
