import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Textarea } from "@/components/imr/textarea"
import { Button } from "@/components/ui/button"
import BpmnViewer from '@/components/imr/BpmnViewer';
import React, { useEffect, useState } from 'react';
const breadcrumbs = [
    {
        title: 'PromptUsuario',
        href: '/diagram-prompt',
    },
];

export default function DiagramPromptPage() {
      const [xml, setXml] = useState(null);
      useEffect(() => {
    fetch('/diagrams/sample.bpmn')
      .then(response => response.text())
      .then(data => {
        setXml(data);
        // Aquí podrías instanciar tu visor BPMN
        console.log('Archivo BPMN cargado:', data);
      })
      .catch(error => {
        console.error('Error al cargar el archivo BPMN:', error);
      });
  }, []);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-fr gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border col-span-2 h-full p-4 flex flex-col gap-4">
                        <Textarea className="min-h-[150px] resize-y" />
                        <div className="flex justify-end">
                            <Button variant="default" size="lg" onClick={() => console.log("Guardado")} className="cursor-pointer">
                                Enviar prompt
                            </Button>
                        </div>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border h-full">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <BpmnViewer diagramXML={xml} />
                </div>
            </div>
        </AppLayout>
    );
}
