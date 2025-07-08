<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Http;

use Illuminate\Http\Request;

class GaminiAIController extends Controller
{
    //
      public function complete()
    {
        $apiKey = env('GEMINI_API_KEY'); // Asegurate de tener esta variable en .env

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'x-goog-api-key' => $apiKey,
        ])->post('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent', [
            'contents' => [
                [
                    'parts' => [
                        [
                            'text' => 'en mi empresa el cliente hace una compra, el vendedor se lo pasa a administracion y administracion confirma el pago',
                        ]
                    ]
                ]
                        ],
                        'systemInstruction' => [
                'parts' => [
                    ['text' => 'Sos un experto en procesos empresariales y automatizacion. Quiero que del prompt que se te envie contestes con el xml que tendria un archivo de diagrama bpmb']
                ]
            ]
        ]);

        return response()->json($response->json());
    }
}
