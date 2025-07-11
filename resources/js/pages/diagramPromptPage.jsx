import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Textarea } from "@/components/imr/textarea";
import { Button } from "@/components/ui/button";
import BpmnViewer from '@/components/imr/BpmnViewer';
import React, { useState, useEffect } from 'react';
import { CheckCircle, Loader2 } from "lucide-react";
import axios from 'axios';

function FancyListItem({ text }) {
  return (
    <li className="flex items-center gap-3 py-2 px-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
      <CheckCircle className="w-5 h-5 min-w-[20px] min-h-[20px] text-green-600" />
      <span className="text-gray-800 font-medium">{text}</span>
    </li>
  );
}

const breadcrumbs = [
  {
    title: 'PromptUsuario',
    href: '/diagram-prompt',
  },
];

export default function DiagramPromptPage() {
  const [prompt, setPrompt] = useState('');
  const [xml, setXml] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [processing, setProcessing] = useState(false);

  // Ocultar mensaje de éxito después de 10 segundos
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 10000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMessage('');
    setErrorMessage('');
    setXml(null);
    setProcessing(true);

    try {
      const response = await axios.post('/generate-bpmn-prompt', {
        prompt: prompt
      });

      if (response.data.bpmnXml) {
        setXml(response.data.bpmnXml);
        setSuccessMessage(response.data.successMessage || '¡Diagrama generado correctamente!');
      } else {
        setErrorMessage('No se recibió un diagrama válido.');
      }
    } catch (error) {
      if (error.response?.data?.errorMessage) {
        setErrorMessage(error.response.data.errorMessage);
      } else if (error.response?.data?.errors?.prompt) {
        setErrorMessage(error.response.data.errors.prompt[0]);
      } else {
        setErrorMessage('Ocurrió un error al generar el diagrama.');
      }
    } finally {
      setProcessing(false);
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

        {errorMessage && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
            <strong>Error:</strong> {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
            <strong>{successMessage}</strong> 
          </div>
        )}

        <div className="grid auto-rows-fr gap-4 md:grid-cols-3">
          <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border col-span-2 h-full p-4 flex flex-col gap-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-full">
              <Textarea
                className="min-h-[150px] resize-y flex-1"
                placeholder="Describe tu proceso empresarial aquí para generar un diagrama BPMN..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={processing}
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  disabled={processing || !prompt.trim()}
                  className="cursor-pointer"
                >
                  {processing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generando...
                    </>
                  ) : (
                    'Enviar prompt'
                  )}
                </Button>
              </div>
            </form>
          </div>
          <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border h-full p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Instrucciones</h3>
            <ul className="space-y-3">
              <FancyListItem text="Describí en el campo de texto tu proceso empresarial para generar un diagrama BPMN. Enviá el prompt para generar uno." />
              <FancyListItem text="Editá el diagrama generado, añadí objetos a gusto." />
              <FancyListItem text="Al finalizar, podés guardarlo. Los diagramas guardados los podrás ver en el dashboard." />
            </ul>
            {processing && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 text-blue-800">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Generando diagrama BPMN...</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
          <BpmnViewer diagramXML={xml} prompt={prompt}/>
        </div>
      </div>
    </AppLayout>
  );
}
