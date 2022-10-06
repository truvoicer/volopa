<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Support\Carbon;

/**
 * User repository class
 * Holds database functions relating to users
 */
class UserRepository
{
    /**
     * Creates an app token for the passed user which expires after one day
     *  Deletes existing app tokens before creation
     *
     * Returns array with token data
     *
     * @param User $user
     * @return array
     */
    public function createUserAppToken(User $user)
    {
        //Delete existing app tokens
        $user->tokens()->where('name', 'app')->delete();

        //Issue a new app token with an expiry date of one day
        $token = $user->createToken(
            'app',
            ['*'],
            Carbon::now()->addDay()
        );

        return [
            'token' => $token->plainTextToken,
            'expires_at' => $token->accessToken->expires_at->getTimestamp(),
            'created_at' => $token->accessToken->created_at->getTimestamp(),
            'updated_at' => $token->accessToken->updated_at->getTimestamp(),
        ];
    }
}
