<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    const LOGIN_URL = '/api/login';
    const LOGIN_DATA = [
        'email' => 'admin@email.com',
        'password' => 'password'
    ];
}
