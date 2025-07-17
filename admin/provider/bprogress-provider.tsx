"use client";

import React, { useEffect } from "react";
import { useIsClient } from "usehooks-ts";

import { ProgressProvider } from "@bprogress/next/app";
import { useProgress } from "@bprogress/next";

function ProgressHookProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const isClient = useIsClient();
    const {
        start
    } = useProgress();
    useEffect(() => {
        if (isClient) {
            start(0, 0, false);
        };
        return;
    }, [isClient, start]);
    return (
        <>
            {children}
        </>
    );
};

export function BprogressProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ProgressProvider 
            height="2px"
            color="var(--primary)"
            options={{ showSpinner: false }}
            shallowRouting={false}
            disableSameURL={false}
        >
            <ProgressHookProvider>
                {children}
            </ProgressHookProvider>
        </ProgressProvider>
    );
};