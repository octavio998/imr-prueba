import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { BookOpen, MessageCircle, Settings, Eye, Edit3, Save } from "lucide-react";

const breadcrumbs = [
  {
    title: 'Documentación',
    href: '/documentacion',
  },
];

export default function Docs() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Documentación del Sistema BPMN" />
      <div className="max-w-3xl mx-auto py-10 px-6">
        <h1 className="text-3xl font-bold mb-6 text-[#80002a] dark:text-[#ffb3c6] flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-[#80002a] dark:text-[#ffb3c6]" />
          Documentación del Sistema BPMN
        </h1>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-[#80002a] dark:text-[#ffb3c6] flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-[#80002a] dark:text-[#ffb3c6]" />
            ¿Qué hace este sistema?
          </h2>
          <p className="text-black dark:text-gray-200">
            Esta aplicación permite a los usuarios describir procesos de negocio en lenguaje natural y obtener automáticamente un diagrama BPMN editable, generado por inteligencia artificial y visualizado con <span className="font-mono text-[#a8324a] dark:text-[#ffb3c6]">bpmn.io</span>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-[#80002a] dark:text-[#ffb3c6] flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#80002a] dark:text-[#ffb3c6]" />
            ¿Cómo funciona?
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-black dark:text-gray-200">
            <li>
              <span className="font-semibold">Entrada:</span> El usuario introduce un <span className="font-mono text-[#a8324a] dark:text-[#ffb3c6]">prompt</span> o consulta describiendo el proceso de negocio a modelar en notación BPMN.
            </li>
            <li>
              <span className="font-semibold">Procesamiento:</span> El prompt se envía a una API de OpenAI (u otro modelo LLM). El modelo devuelve la sintaxis BPMN generada a partir del prompt.
            </li>
            <li>
              <span className="font-semibold">Salida:</span> La respuesta del modelo se procesa y se visualiza mediante la librería <span className="font-mono text-[#a8324a] dark:text-[#ffb3c6]">bpmn.io</span> directamente en la aplicación web. El diagrama generado es claro y editable desde la interfaz.
            </li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-[#80002a] dark:text-[#ffb3c6] flex items-center gap-2">
            <Eye className="w-5 h-5 text-[#80002a] dark:text-[#ffb3c6]" />
            Características principales
          </h2>
          <ul className="list-disc list-inside space-y-2 text-black dark:text-gray-200">
            <li className="flex items-center gap-2"><MessageCircle className="w-4 h-4 text-[#a8324a] dark:text-[#ffb3c6]" />Generación automática de diagramas BPMN a partir de descripciones en lenguaje natural.</li>
            <li className="flex items-center gap-2"><Eye className="w-4 h-4 text-[#a8324a] dark:text-[#ffb3c6]" />Visualización interactiva y edición de diagramas BPMN en la web.</li>
            <li className="flex items-center gap-2"><Settings className="w-4 h-4 text-[#a8324a] dark:text-[#ffb3c6]" />Integración con modelos LLM como OpenAI para interpretación de procesos.</li>
            <li className="flex items-center gap-2"><Edit3 className="w-4 h-4 text-[#a8324a] dark:text-[#ffb3c6]" />Interfaz intuitiva y fácil de usar.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2 text-[#80002a] dark:text-[#ffb3c6] flex items-center gap-2">
            <Save className="w-5 h-5 text-[#80002a] dark:text-[#ffb3c6]" />
            ¿Cómo usar la aplicación?
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-black dark:text-gray-200">
            <li>Accede a la sección de generación de diagramas.</li>
            <li>Describe tu proceso de negocio en el campo de texto.</li>
            <li>Envía el prompt y espera la generación automática del diagrama.</li>
            <li>Edita el diagrama según tus necesidades directamente en la interfaz.</li>
            <li>Guarda el diagrama para futuras consultas o modificaciones.</li>
          </ol>
        </section>
      </div>
    </AppLayout>
  );
}