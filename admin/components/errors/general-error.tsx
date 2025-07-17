"use client";

import React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { useRouter } from "@bprogress/next";

interface GeneralErrorProps extends React.HTMLAttributes<HTMLDivElement> {
    minimal?: boolean;
    error?: Error & { digest?: string };
    reset?: () => void;
};

export function GeneralError({
    error,
    reset,
    minimal = true,
    className
}: GeneralErrorProps) {
    const router = useRouter();
    if (minimal == true) {
        return (
            // global-error must include html and body tags
            <html>
                <body>
                    <div className={cn("h-svh w-full", className)}>
                        <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
                            {!minimal && (
                                <h1 className="text-[7rem] leading-tight font-bold">500</h1>
                            )}
                            <span className="font-medium">Oops! Something went wrong {`:')`}</span>
                            <p className="text-muted-foreground text-center">
                                We apologize for the inconvenience. <br /> Please try again later.
                            </p>
                            {!minimal && (
                                <div className="mt-6 flex gap-4">
                                    <Button variant="outline" onClick={() => router.back()}>
                                        Go Back
                                    </Button>
                                    <Button onClick={() => router.push("/dashboard")}>
                                        Back to Home
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </body>
            </html>
        );
    } else {
        return (
            <div className={cn("h-svh w-full", className)}>
                <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
                    {!minimal && (
                        <h1 className="text-[7rem] leading-tight font-bold">500</h1>
                    )}
                    <span className="font-medium">Oops! Something went wrong {`:')`}</span>
                    <p className="text-muted-foreground text-center">
                        We apologize for the inconvenience. <br /> Please try again later.
                    </p>
                    {!minimal && (
                        <div className="mt-6 flex gap-4">
                            <Button variant="outline" onClick={() => router.back()}>
                                Go Back
                            </Button>
                            <Button onClick={() => router.push("/")}>
                                Back to Home
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        );
    };
};