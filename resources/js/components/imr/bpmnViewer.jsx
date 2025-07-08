import { useEffect, useRef } from 'react';
import BpmnJS from 'bpmn-js/lib/Modeler';
import { Undo, Redo, Save } from 'lucide-react';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';

export default function BpmnEditor({ diagramXML }) {
  const containerRef = useRef(null);
  const bpmnModelerRef = useRef(null);

  useEffect(() => {
    bpmnModelerRef.current = new BpmnJS({
      container: containerRef.current,
    });

    if (diagramXML) {
      bpmnModelerRef.current.importXML(diagramXML).catch(err =>
        console.error('Error loading BPMN diagram', err)
      );
    } else {
      bpmnModelerRef.current.createDiagram();
    }

    return () => {
      bpmnModelerRef.current.destroy();
    };
  }, [diagramXML]);

  const handleSave = async () => {
    try {
      const { xml } = await bpmnModelerRef.current.saveXML({ format: true });
      console.log('BPMN XML:', xml);
    } catch (err) {
      console.error('Error saving:', err);
    }
  };

  const handleUndo = () => {
    const commandStack = bpmnModelerRef.current.get('commandStack');
    commandStack.undo();
  };

  const handleRedo = () => {
    const commandStack = bpmnModelerRef.current.get('commandStack');
    commandStack.redo();
  };

  return (
    <div className="flex w-full h-[650px] bg-white">
      {/* Toolbar minimalista */}
      <div className="w-48 bg-white border-r border-gray-200 p-3 flex flex-col gap-1">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Acciones</h3>
        
        <div className="space-y-1">
          <button 
            onClick={handleUndo}
            className="w-full p-2 flex items-center gap-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded border border-transparent hover:border-gray-200 transition-colors"
          >
            <Undo className="w-4 h-4" />
            Deshacer
          </button>
          
          <button 
            onClick={handleRedo}
            className="w-full p-2 flex items-center gap-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded border border-transparent hover:border-gray-200 transition-colors"
          >
            <Redo className="w-4 h-4" />
            Rehacer
          </button>
          
          <button 
            onClick={handleSave}
            className="w-full p-2 flex items-center gap-2 text-left text-sm text-gray-900 hover:bg-gray-100 rounded border border-transparent hover:border-gray-300 transition-colors font-medium"
          >
            <Save className="w-4 h-4" />
            Guardar
          </button>
        </div>
      </div>
      
      {/* Canvas del editor con paleta nativa de BPMN.js */}
      <div className="flex-1 h-full" ref={containerRef}></div>
    </div>
  );
}
