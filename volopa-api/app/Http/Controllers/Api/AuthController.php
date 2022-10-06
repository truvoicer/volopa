<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

/**
 * Auth Controller class
 *
 * Holds actions for authentication related api endpoints
 */
class AuthController extends Controller
{
    /**
     * @var User
     */
    private User $user;

    /**
     * @var UserRepository
     */
    private UserRepository $userRepository;

    /**
     * Initialises required class properties
     */
    public function __construct() {
        $this->userRepository = new UserRepository();
    }

    /**
     * Login action
     * Authenticates credentials passed in request
     * Generated a new token if credentials are successfully authenticated
     *
     * Returns error on auth fail
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Auth error'
            ], Response::HTTP_UNAUTHORIZED);
        }
        return response()->json([
            'status' => 'success',
            'message' => 'Success',
            'data' => $this->userRepository->createUserAppToken($request->user())
        ]);
    }

    /**
     * Refreshes a users token
     * Authenticates token passed in header
     * Generated a new token if token is successfully authenticated
     *
     * Returns error on auth fail
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function tokenRefresh(Request $request)
    {
        $this->user = $request->user();
        return response()->json([
            'status' => 'success',
            'message' => 'Success',
            'data' => $this->userRepository->createUserAppToken($request->user())
        ]);
    }
}
