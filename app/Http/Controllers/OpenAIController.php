<?php

namespace App\Http\Controllers;
use OpenAI\Laravel\Facades\OpenAI;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Diagram; // Agrega este use al inicio

class OpenAIController extends Controller
{
    public function generateBpmnFromPrompt(Request $request)
    {
        $request->validate([
            'prompt' => 'required|string|max:2000'
        ]);

        $prompt = $request->input('prompt');

        $systemPrompt = "You are an expert in business process modeling and BPMN 2.0. Convert the following business process description into valid BPMN 2.0 XML format.
            Requirements:
            - Return ONLY the XML content, no explanations or additional text
            - Use proper BPMN 2.0 namespaces and structure
            - Include start events, tasks, gateways, and end events as appropriate
            - Use meaningful IDs and names for all elements
            - Ensure the XML is well-formed and valid
            - Include proper sequence flows between elements
            - Use appropriate BPMN symbols (tasks, gateways, events)
            Business Process Description: {$prompt}
            Return only the BPMN 2.0 XML:
            Use correct BPMN 2.0 namespaces and structure.

            Include <bpmn:definitions>, <bpmn:process>, and all required elements.

            Always include the <bpmndi:BPMNDiagram>, <bpmndi:BPMNPlane>, <bpmndi:BPMNShape>, and <bpmndi:BPMNEdge> elements to ensure visual rendering in bpmn.io.

            Define minimal layout (x, y, width, height) for all shapes and edges.

            Avoid invalid sequence flows (e.g., from endEvent to startEvent).

            Use clear and consistent IDs and element names.

            Return only the XML, no explanations or extra text.
            example of valid BPMN XML:

            
            {$prompt}\n
            Return only the BPMN 2.0 XML:\n
            example of valid BPMN XML:\n\n
            <?xml version=\"1.0\" encoding=\"UTF-8\"?>\n
            <bpmn:definitions xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:bpmn=\"http://www.omg.org/spec/BPMN/20100524/MODEL\" xmlns:bpmndi=\"http://www.omg.org/spec/BPMN/20100524/DI\" xmlns:dc=\"http://www.omg.org/spec/DD/20100524/DC\" xmlns:di=\"http://www.omg.org/spec/DD/20100524/DI\" targetNamespace=\"http://bpmn.io/schema/bpmn\">\n
            <bpmn:process id=\"Process_1\" isExecutable=\"false\">\n
                <bpmn:startEvent id=\"StartEvent_1\" name=\"Start\" />\n
                <bpmn:task id=\"Task_1\" name=\"Do something\" />\n
                <bpmn:endEvent id=\"EndEvent_1\" name=\"End\" />\n
                <bpmn:sequenceFlow id=\"Flow_1\" sourceRef=\"StartEvent_1\" targetRef=\"Task_1\" />\n
                <bpmn:sequenceFlow id=\"Flow_2\" sourceRef=\"Task_1\" targetRef=\"EndEvent_1\" />\n
                <bpmn:intermediateThrowEvent id=\"Event_0mb9tuk\" />\n
            </bpmn:process>\n
            <bpmndi:BPMNDiagram id=\"BPMNDiagram_1\">\n
                <bpmndi:BPMNPlane id=\"BPMNPlane_1\" bpmnElement=\"Process_1\">\n
                <bpmndi:BPMNShape id=\"StartEvent_1_di\" bpmnElement=\"StartEvent_1\">\n
                    <dc:Bounds x=\"100\" y=\"100\" width=\"36\" height=\"36\" />\n
                </bpmndi:BPMNShape>\n
                <bpmndi:BPMNShape id=\"Task_1_di\" bpmnElement=\"Task_1\">\n
                    <dc:Bounds x=\"210\" y=\"180\" width=\"100\" height=\"80\" />\n
                </bpmndi:BPMNShape>\n
                <bpmndi:BPMNShape id=\"EndEvent_1_di\" bpmnElement=\"EndEvent_1\">\n
                    <dc:Bounds x=\"522\" y=\"112\" width=\"36\" height=\"36\" />\n
                    <bpmndi:BPMNLabel>\n
                    <dc:Bounds x=\"530\" y=\"88\" width=\"20\" height=\"14\" />\n
                    </bpmndi:BPMNLabel>\n
                </bpmndi:BPMNShape>\n
                <bpmndi:BPMNShape id=\"Event_0mb9tuk_di\" bpmnElement=\"Event_0mb9tuk\">\n
                    <dc:Bounds x=\"422\" y=\"252\" width=\"36\" height=\"36\" />\n
                </bpmndi:BPMNShape>\n
                <bpmndi:BPMNEdge id=\"Flow_1_di\" bpmnElement=\"Flow_1\">\n
                    <di:waypoint x=\"136\" y=\"118\" />\n
                    <di:waypoint x=\"173\" y=\"118\" />\n
                    <di:waypoint x=\"173\" y=\"218\" />\n
                    <di:waypoint x=\"210\" y=\"218\" />\n
                </bpmndi:BPMNEdge>\n
                <bpmndi:BPMNEdge id=\"Flow_2_di\" bpmnElement=\"Flow_2\">\n
                    <di:waypoint x=\"260\" y=\"180\" />\n
                    <di:waypoint x=\"260\" y=\"130\" />\n
                    <di:waypoint x=\"522\" y=\"130\" />\n
                </bpmndi:BPMNEdge>\n
                </bpmndi:BPMNPlane>\n
            </bpmndi:BPMNDiagram>\n
            </bpmn:definitions>\n";
            
            
            
         
            
        try {
            $result = OpenAI::chat()->create([
                'model' => 'gpt-4.1-nano',
                'messages' => [
                    ['role' => 'system', 'content' => $systemPrompt],
                    ['role' => 'user', 'content' => $prompt]
                ],
                'max_tokens' => 2000,
                'temperature' => 0.3
            ]);
            
            $bpmnXml = $result->choices[0]->message->content;
            if (!$this->isValidXml($bpmnXml)) {
                return response()->json([
                    'errorMessage' => 'Error generating valid BPMN XML'
                ], 422);
            }

            // 1. Crear el registro en la base de datos (sin xml aún)
            $diagram = new Diagram();
            $diagram->prompt = $prompt;
            $diagram->xml = ''; // Temporalmente vacío
            $diagram->save();

            // 2. Definir la ruta y guardar el archivo
            $folder = public_path('diagrams/' . $diagram->id);
            if (!is_dir($folder)) {
                mkdir($folder, 0777, true);
            }
            $fileName = 'diagram_bpmn.xsl';
            $filePath = 'diagrams/' . $diagram->id . '/' . $fileName;
            file_put_contents(public_path($filePath), $bpmnXml);

            // 3. Actualizar el campo xml con la ruta
            $diagram->xml = $filePath;
            $diagram->save();

            return response()->json([
                'bpmnXml' => $bpmnXml,
                'successMessage' => '¡Éxito! Se ha generado tu diagrama BPMN.',
                'diagramId' => $diagram->id,
                'xmlPath' => $filePath,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'errorMessage' => 'Error connecting to OpenAI: ' . $e->getMessage()
            ], 500);
        }
      
    }

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

    private function isValidXml($xml)
    {
        $previousValue = libxml_use_internal_errors(true);
        libxml_clear_errors();
        
        $doc = simplexml_load_string($xml);
        $errors = libxml_get_errors();
        
        libxml_use_internal_errors($previousValue);
        
        return $doc !== false && empty($errors);
    }
}
