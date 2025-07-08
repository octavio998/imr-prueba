// components/BpmnEditor.jsx
import { useEffect, useRef } from 'react';
import BpmnJS from 'bpmn-js/lib/Modeler';

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
    }

    return () => {
      bpmnModelerRef.current.destroy();
    };
  }, [diagramXML]);

  return <div className="w-full h-[600px] border" ref={containerRef}></div>;
}
