<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\OpenAIController;
use App\Http\Controllers\GaminiAIController;
use App\Models\Diagram;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $diagramas = Diagram::whereNull('deleted_at')->get();
// Eliminar diagramas eliminados
        
        return Inertia::render('Dashboard', [
            'breadcrumbs' => [
                ['title' => 'Dashboard', 'href' => '/dashboard'],
            ],
            'diagramas' => $diagramas,
        ]);
    })->name('dashboard');
    Route::get('diagram-prompt', function () {
        return Inertia::render('DiagramPromptPage', [
            'breadcrumbs' => [
                ['title' => 'PromptUsuario', 'href' => '/diagram-prompt'],
            ],
        ]);
    })->name('diagram-prompt');
Route::get('/check', [OpenAIController::class, 'complete']);
Route::get('/check2', [GaminiAIController::class, 'complete']);
Route::post('/generate-bpmn-prompt', [OpenAIController::class, 'generateBpmnFromPrompt'])->name('generate-bpmn-prompt');

    
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
