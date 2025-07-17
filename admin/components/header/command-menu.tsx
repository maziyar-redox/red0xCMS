"use client";

import React from "react";
import { useSearch } from "@/context/search-context"
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import { sidebarData } from "@/components/layout/data/sidebar-data";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "@bprogress/next";
import {
    CornerDownRight,
    ChevronRight,
    Sun,
    Moon,
    MonitorSmartphone
} from "lucide-react";
import { useTheme } from "next-themes";

export function CommandMenu() {
    const { setTheme } = useTheme();
    const router = useRouter();
    const { open, setOpen } = useSearch();

    const runCommand = React.useCallback(
        (command: () => unknown) => {
            setOpen(false);
            command();
        },
        [setOpen]
    );

    return (
        <CommandDialog modal open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
                <ScrollArea type="hover" className="h-72 pr-1">
                    <CommandEmpty>No results found.</CommandEmpty>
                    {sidebarData.navGroups.map((group) => (
                        <CommandGroup key={group.title} heading={group.title}>
                            {group.items.map((navItem, i) => {
                                if (navItem.url)
                                return (
                                    <CommandItem
                                        key={`${navItem.url}-${i}`}
                                        value={navItem.title}
                                        onSelect={() => {
                                            runCommand(() => {
                                                const getHref = typeof(navItem.url) === "undefined" ? "/" : navItem.url.toString();
                                                router.push(getHref);
                                            });
                                        }}
                                    >
                                        <div className="mr-2 flex h-4 w-4 items-center justify-center">
                                            <CornerDownRight className="text-muted-foreground/80 size-2" />
                                        </div>
                                        {navItem.title}
                                    </CommandItem>
                                )

                                return navItem.items?.map((subItem, i) => (
                                    <CommandItem
                                        key={`${navItem.title}-${subItem.url}-${i}`}
                                        value={`${navItem.title}-${subItem.url}`}
                                        onSelect={() => {
                                            runCommand(() => {
                                                const getHref = typeof(subItem.url) === "undefined" ? "/" : subItem.url.toString();
                                                router.push(getHref);
                                            });
                                        }}
                                    >
                                        <div className="mr-2 flex h-4 w-4 items-center justify-center">
                                            <CornerDownRight className="text-muted-foreground/80 size-2" />
                                        </div>
                                        {navItem.title} <ChevronRight /> {subItem.title}
                                    </CommandItem>
                                ))
                            })}
                        </CommandGroup>
                    ))}
                    <CommandSeparator />
                    <CommandGroup heading="Theme">
                        <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
                            <Sun />
                            <span>Light</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
                            <Moon className="scale-90" />
                            <span>Dark</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
                            <MonitorSmartphone />
                            <span>System</span>
                        </CommandItem>
                    </CommandGroup>
                </ScrollArea>
            </CommandList>
        </CommandDialog>
    );
};