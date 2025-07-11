import { useEffect, useRef } from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import * as propertiesPanelModule from '@bpmn-io/properties-panel';
import * as bpmnPropertiesProviderModule from 'bpmn-js-properties-panel';
import axios from 'axios';

import '@bpmn-io/properties-panel/dist/assets/properties-panel.css';
import 'bpmn-js/dist/assets/bpmn-js.css';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';

import { Undo, Redo, Save } from 'lucide-react';

export default function BpmnViewer({ diagramXML, 'data-id': dataId, prompt }) {
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
      ]
    });

    return () => {
      modelerRef.current?.destroy?.();
      modelerRef.current = null;
    };
  }, []);

  // Importa el XML cada vez que cambia
  useEffect(() => {
    if (!diagramXML || !modelerRef.current) return;

    let cancelled = false;

    const loadXML = async () => {
      try {
        let xmlContent = diagramXML;

        const isUrl = typeof diagramXML === 'string' && !diagramXML.trim().startsWith('<?xml');
        if (isUrl) {
          const response = await axios.get(diagramXML);
          xmlContent = response.data;
        }

        if (!cancelled) {
          await modelerRef.current.importXML(xmlContent);
        }
      } catch (err) {
        console.error('Error al importar XML', err);
      }
    };

    loadXML();

    return () => {
      cancelled = true;
    };
  }, [diagramXML]);

  const handleSave = async () => {
    try {
      const { xml } = await modelerRef.current.saveXML({ format: true });
      const payload = { xml };

      if (dataId !== undefined && dataId !== null && dataId !== '') {
        payload.id = dataId;
      }
      if (prompt) {
        payload.prompt = prompt;
      }

      await axios.post('/guardar-xml', payload);
      alert(dataId ? 'Diagrama actualizado correctamente.' : 'Diagrama guardado correctamente.');
    } catch (err) {
      console.error('Error saving diagram:', err);
      alert('Error al guardar el diagrama.');
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
          disabled={!diagramXML}
          className={`w-full p-2 flex items-center gap-2 text-sm text-gray-900 hover:bg-gray-100 rounded border border-transparent hover:border-gray-300 font-medium ${!diagramXML ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <Save className="w-4 h-4" />
          Guardar
        </button>
      </div>

      {/* Editor + Panel de propiedades */}
      <div className="flex-1 h-full flex overflow-hidden">
        <div className="flex-1" ref={containerRef}></div>
        <div ref={propertiesPanelRef}></div>
      </div>
    </div>
  );
}
