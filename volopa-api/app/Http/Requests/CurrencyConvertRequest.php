<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CurrencyConvertRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the currency request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'convertTo' => 'nullable',
            'convertToCurrencyCode' => 'required|string',
            'convertFrom' => 'nullable',
            'convertFromCurrencyCode' => 'required|string',
        ];
    }
}
