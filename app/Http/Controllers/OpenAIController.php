<?php

namespace App\Http\Controllers;
use OpenAI\Laravel\Facades\OpenAI;

use Illuminate\Http\Request;

class OpenAIController extends Controller
{
    public function complete()
    {
      $result = OpenAI::chat()->create([
    'model' => 'gpt-4.1-nano',
    'messages' => [
        ['role' => 'user', 'content' => 'Hello!'],
    ],
]);

echo $result->choices[0]->message->content; 
    }
}
