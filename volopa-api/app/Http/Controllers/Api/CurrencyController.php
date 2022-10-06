<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CurrencyConvertRequest;
use App\Repositories\CurrencyRepository;
use App\Repositories\UserRepository;
use App\Service\CurrencyService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Currency Controller class
 *
 * Holds actions for currency related api endpoints
 */
class CurrencyController extends Controller
{

    /**
     * Currency list action
     *
     * Returns currency list from database
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function currencyList(CurrencyRepository $currencyRepository)
    {
        return response()->json([
            'status' => 'success',
            'message' => 'Currency list fetch',
            'data' => $currencyRepository->getCurrencyList()
        ]);
    }

    /**
     * Currency converter action
     *
     * Returns currency conversion and rate data.
     *
     * @param CurrencyConvertRequest $request
     * @param CurrencyService $currencyService
     * @return JsonResponse
     */
    public function currencyConverter(CurrencyConvertRequest $request, CurrencyService $currencyService)
    {
        return response()->json([
            'status' => 'success',
            'message' => 'Currency conversion fetch',
            'data' => $currencyService->convertCurrency(
                $request->get('convertToCurrencyCode'),
                $request->get('convertFromCurrencyCode'),
                $request->get('convertTo'),
                $request->get('convertFrom'),
            )
        ]);
    }
}
