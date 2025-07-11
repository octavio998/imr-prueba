import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import BpmnViewer from '@/components/imr/BpmnViewer';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash, Loader2, X } from "lucide-react";
const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { diagramas } = usePage().props;
    const [xmls, setXmls] = useState({});
    const [dialogOpen, setDialogOpen] = useState(false);
    const [diagramaAEliminar, setDiagramaAEliminar] = useState(null);
    const [eliminando, setEliminando] = useState(false);

    useEffect(() => {
        if (diagramas && Array.isArray(diagramas)) {
            diagramas.forEach(diagrama => {
                if (diagrama.xml && !xmls[diagrama.id]) {
                    fetch(`/${diagrama.xml}`)
                        .then(res => res.text())
                        .then(text => {
                            setXmls(prev => ({ ...prev, [diagrama.id]: text }));
                        });
                }
            });
        }
        // eslint-disable-next-line
    }, [diagramas]);

    const handleEliminarClick = (diagrama) => {
        setDiagramaAEliminar(diagrama);
        setDialogOpen(true);
    };

    const confirmarEliminacion = async () => {
        if (!diagramaAEliminar) return;
        setEliminando(true);
        try {
            await axios.post('/eliminar-diagrama', { id: diagramaAEliminar.id });
            window.location.reload(); // O puedes actualizar el estado localmente si prefieres
        } catch (error) {
            alert('Error al eliminar el diagrama');
        } finally {
            setEliminando(false);
            setDialogOpen(false);
            setDiagramaAEliminar(null);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <div className="flex h-full flex-col gap-4 p-4">
                        <h1 className="text-xl font-semibold text-gray-800">Bienvenido al Dashboard</h1>
                        <p className="text-gray-600">Aquí puedes gestionar tus diagramas BPMN y generar nuevos a través de prompts.</p>

                        {/* Dialogo de confirmación de eliminación */}
                        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>¿Eliminar diagrama?</DialogTitle>
                                    <DialogDescription>
                                    Para eliminarlo presione el icono de la papelera.
                                    </DialogDescription>
                                </DialogHeader>
                                <p className="text-sm text-gray-700">
                                   Eliminar:  {diagramaAEliminar && (diagramaAEliminar.nombre || `Diagrama #${diagramaAEliminar.id}`)}
                                </p>
                                <DialogFooter>
                                    <button
                                    onClick={confirmarEliminacion}
                                    disabled={eliminando}
                                    className="text-red-600 hover:text-red-800 disabled:opacity-50 cursor-pointer flex items-center gap-2"
                                    title="Eliminar"
                                    >
                                    {eliminando ? (
                                        <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Eliminando...
                                        </>
                                    ) : (
                                        <Trash className="w-5 h-5" />
                                    )}
                                    </button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        {/* Listado de diagramas */}
                        {diagramas && diagramas.length > 0 ? (
                            diagramas.map(diagrama => (
                                <div key={diagrama.id} className="border rounded-lg p-4 bg-white shadow mb-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <h2 className="font-bold text-lg">{diagrama.nombre || `Diagrama #${diagrama.id}`}</h2>
                                        <button
  onClick={() => handleEliminarClick(diagrama)}
  className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 hover:scale-105 active:scale-95 transition-all duration-150 ease-in-out disabled:opacity-50 cursor-pointer"
  title="Eliminar"
>
  <Trash className="w-4 h-4" />
</button>
                                    </div>
                                    <div className="mb-2 text-xs text-gray-500 break-all">{diagrama.xml}</div>
                                    {xmls[diagrama.id] ? (
                                        <div className="border rounded bg-gray-50 p-2">
                                            <BpmnViewer diagramXML={xmls[diagrama.id]} />
                                        </div>
                                    ) : (
                                        <div className="text-gray-400 text-sm">Cargando diagrama...</div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="text-gray-500">No hay diagramas disponibles.</div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
