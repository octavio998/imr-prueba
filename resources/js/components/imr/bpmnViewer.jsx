import { useEffect, useRef } from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import * as propertiesPanelModule from '@bpmn-io/properties-panel'; // ✅ CORRECTO
import * as bpmnPropertiesProviderModule from 'bpmn-js-properties-panel'; // ✅ CORRECTO

import '@bpmn-io/properties-panel/dist/assets/properties-panel.css';
import 'bpmn-js/dist/assets/bpmn-js.css';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';

import { Undo, Redo, Save } from 'lucide-react';

export default function BpmnEditor({ diagramXML }) {
  const containerRef = useRef(null);
  const propertiesPanelRef = useRef(null);
  const modelerRef = useRef(null);

 // Inicializa el modelador solo una vez
useEffect(() => {
  modelerRef.current = new BpmnModeler({
    container: containerRef.current,
    propertiesPanel: {
      parent: propertiesPanelRef.current
    },
    additionalModules: [
      propertiesPanelModule,
      bpmnPropertiesProviderModule
    ],
    /*
    keyboard: {
      bindTo: document
    }*/
  });

  return () => {
    modelerRef.current?.destroy?.();
    modelerRef.current = null;
  };
}, []);

// Importa el XML cada vez que cambia
useEffect(() => {
  if (diagramXML && modelerRef.current) {
    modelerRef.current.importXML(diagramXML).catch(err =>
      console.error('Error al importar XML', err)
    );
  }
}, [diagramXML]);


  const handleSave = async () => {
    try {
      const { xml } = await modelerRef.current.saveXML({ format: true });
      console.log('XML:', xml);
    } catch (err) {
      console.error('Error saving diagram:', err);
    }
  };

  const handleUndo = () => {
    const commandStack = modelerRef.current.get('commandStack');
    commandStack.undo();
  };

  const handleRedo = () => {
    const commandStack = modelerRef.current.get('commandStack');
    commandStack.redo();
  };

  return (
    <div className="flex w-full h-[650px] bg-white">
      {/* Toolbar lateral */}
      <div className="w-48 border-r border-gray-200 p-3 flex flex-col gap-1 bg-white">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Acciones</h3>

        <button 
          onClick={handleUndo}
          className="w-full p-2 flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 rounded border border-transparent hover:border-gray-200"
        >
          <Undo className="w-4 h-4" />
          Deshacer
        </button>

        <button 
          onClick={handleRedo}
          className="w-full p-2 flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 rounded border border-transparent hover:border-gray-200"
        >
          <Redo className="w-4 h-4" />
          Rehacer
        </button>

        <button 
          onClick={handleSave}
          className="w-full p-2 flex items-center gap-2 text-sm text-gray-900 hover:bg-gray-100 rounded border border-transparent hover:border-gray-300 font-medium"
        >
          <Save className="w-4 h-4" />
          Guardar
        </button>
      </div>

      {/* Editor + Panel de propiedades */}
      <div className="flex-1 h-full flex overflow-hidden">
        <div className="flex-1" ref={containerRef}></div>
        <div 
          ref={propertiesPanelRef} 
          className="w-80 border-l border-gray-200 overflow-y-auto bg-white"
        ></div>
      </div>
    </div>
  );
}
