"use client";

import { cn } from "@/lib/utils";
import { SearchProvider } from "@/context/search-context"
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { useSidebarStore } from "@/store/use-sidebar";

interface Props {
    children?: React.ReactNode;
    fixed?: boolean;
};

export function AuthenticatedLayout({ children, fixed }: Props) {
    const { isOpen } = useSidebarStore();
    return (
        <SearchProvider>
            <SidebarProvider defaultOpen={isOpen}>
                <AppSidebar />
                <div
                    id="content"
                    className={cn(
                        "ml-auto w-full max-w-full",
                        "peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]",
                        "peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]",
                        "sm:transition-[width] sm:duration-200 sm:ease-linear",
                        "flex flex-col",
                        fixed && "h-svh",
                        "group-data-[scroll-locked=1]/body:h-full",
                        "has-[main.fixed-main]:group-data-[scroll-locked=1]/body:h-svh"
                    )}
                >
                    {children ? children : <></>}
                </div>
            </SidebarProvider>
        </SearchProvider>
    );
};