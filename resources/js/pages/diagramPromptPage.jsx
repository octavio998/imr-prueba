import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Textarea } from "@/components/imr/textarea"
const breadcrumbs = [
    {
        title: 'PromptUsuario',
        href: '/diagram-prompt',
    },
];

export default function DiagramPromptPage() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-fr gap-4 md:grid-cols-3">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border col-span-2 h-full">
                    <Textarea />
                </div>

                <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border h-full">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
