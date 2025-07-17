"use client";

import { Button } from "@/components/ui/button";

export function NewBlogComponent() {
    return (
        <>
            <div className="mb-2 flex flex-wrap items-center justify-between space-y-2 gap-x-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Create new blog</h2>
                    <p className="text-muted-foreground">
                        You can create and write new blog in this section.
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button>
                        Publish
                    </Button>
                </div>
            </div>
        </>
    );
};