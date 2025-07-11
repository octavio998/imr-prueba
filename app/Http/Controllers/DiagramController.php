<?php

namespace App\Http\Controllers;

use App\Models\Diagram;
use Illuminate\Http\Request;

class DiagramController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $diagrams = Diagram::all();
        return response()->json($diagrams);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Si usas API, probablemente no necesitas esto.
        return response()->json(['message' => 'Mostrar formulario de creación'], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'prompt' => 'sometimes|string',
            'xml' => 'required|string|string',
            'id' => 'sometimes|integer|exists:diagrams,id',
        ]);
        //  Definir la ruta y guardar el archivo
        
        $fileName = 'diagram_bpmn-' . date('Y-m-d_H-i-s') . '.bpmn';
        if (isset($validated['id'])) {
            // Editar diagrama existente
            $folder = public_path('diagrams/' .$validated['id']);
            if (!is_dir($folder)) {
                mkdir($folder, 0777, true);
            }
            $diagram = Diagram::findOrFail($validated['id']);
            //$diagram->prompt = $validated['prompt'];
            $diagram->xml = $fileName;
            $diagram->save();
            $filePath = 'diagrams/' . $validated['id'] . '/' . $fileName;
            file_put_contents(public_path($filePath), $validated['xml']);
            return response()->json($diagram, 200);
        } else {
            // Crear nuevo diagrama
            // 1. Crear el registro en la base de datos (sin xml aún)
            $diagram = new Diagram();
            $diagram->prompt = $validated['prompt'];
            // Temporalmente vacío
            
            
           

            // 3. Actualizar el campo xml con la ruta
            $diagram->xml = $fileName;
            
            $diagram->save();
            $filePath = 'diagrams/' . $diagram->id . '/' . $fileName;
            $folder = public_path('diagrams/'. $diagram->id);
            if (!is_dir($folder)) {
                mkdir($folder, 0777, true);
            }
            file_put_contents(public_path($filePath), $validated['xml']);
            return response()->json($diagram, 201);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Diagram $diagram)
    {
        return response()->json($diagram);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Diagram $diagram)
    {
        // Si usas API, probablemente no necesitas esto.
        return response()->json($diagram);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Diagram $diagram)
    {
        $validated = $request->validate([
            'prompt' => 'sometimes|required|string',
            'xml' => 'sometimes|required|string|max:255',
        ]);

        $diagram->update($validated);

        return response()->json($diagram);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $request->validate([
            'id' => 'required|integer|exists:diagrams,id',
        ]);

        $diagram = Diagram::findOrFail($request->id);
        $diagram->delete(); // Soft delete (establece deleted_at)

        return response()->json(['message' => 'Diagrama eliminado (soft delete)']);
    }
}
