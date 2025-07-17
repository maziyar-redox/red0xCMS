"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { usePathname } from "next/navigation";
import { useRouter } from "@bprogress/next";
import Link from "next/link";
import { sidebarNavItems } from "@/components/layout/data/sidebar-data";


export function SidebarNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname();
    const router = useRouter();
    const [val, setVal] = useState(pathname ?? "/settings");
    const handleSelect = (e: string) => {
        setVal(e);
        router.push(e);
    };
    return (
        <>
            <div className="p-1 md:hidden">
                <Select value={val} onValueChange={handleSelect}>
                    <SelectTrigger className="h-12 sm:w-48">
                        <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                        {sidebarNavItems.map((item) => (
                            <SelectItem key={item.href} value={item.href}>
                                <div className="flex gap-x-4 px-2 py-1">
                                    <span className="scale-125">
                                        <item.icon size={18} />
                                    </span>
                                    <span className="text-md">{item.title}</span>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <ScrollArea
                type="always"
                className="bg-background hidden w-full min-w-40 px-1 py-2 md:block"
            >
                <nav
                    className={cn(
                        "flex space-x-2 py-1 lg:flex-col lg:space-y-1 lg:space-x-0",
                        className
                    )}
                    {...props}
                >
                    {sidebarNavItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                buttonVariants({ variant: "ghost" }),
                                pathname === item.href
                                ? "bg-muted hover:bg-muted"
                                : "hover:bg-transparent hover:underline",
                                "justify-start"
                            )}
                        >
                            <span className="mr-2">
                                <item.icon />
                            </span>
                            {item.title}
                        </Link>
                    ))}
                </nav>
            </ScrollArea>
        </>
    );
};