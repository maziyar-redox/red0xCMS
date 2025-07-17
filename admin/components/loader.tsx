"use client";

import { LuCircleDashed } from "react-icons/lu";
import { useIsClient } from "usehooks-ts";

export function Loader({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const isMounted = useIsClient();
    if (isMounted) {
        return (
            <>
                {children}
            </>
        );
    } else {
        return (
            <div className="flex flex-col items-center justify-center h-screen gap-y-2">
                <LuCircleDashed size={36} className="animate-spin text-primary" />
                <h1 className="text-foreground text-xl">Loading...</h1>
            </div>
        );
    };
};