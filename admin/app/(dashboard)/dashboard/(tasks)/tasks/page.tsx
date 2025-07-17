import { columns } from "@/app/(dashboard)/_components/tasks/columns";
import { TasksProvider } from "@/app/(dashboard)/_components/tasks/context/tasks-context";
import { DataTable } from "@/app/(dashboard)/_components/tasks/data-table";
import { tasks } from "@/app/(dashboard)/_components/tasks/data/tasks";
import { TasksDialogs } from "@/app/(dashboard)/_components/tasks/tasks-dialogs";
import { TasksPrimaryButtons } from "@/app/(dashboard)/_components/tasks/tasks-primary-buttons";
import { Main } from "@/components/layout/main";

export default function TasksPage() {
    return (
        <TasksProvider>
            <Main>
                <div className="mb-2 flex flex-wrap items-center justify-between space-y-2 gap-x-4">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Tasks</h2>
                        <p className="text-muted-foreground">
                            Here&apos;s a list of your tasks for this month!
                        </p>
                    </div>
                    <TasksPrimaryButtons />
                </div>
                <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
                    <DataTable data={tasks} columns={columns} />
                </div>
            </Main>
            <TasksDialogs />
        </TasksProvider>
    );
};