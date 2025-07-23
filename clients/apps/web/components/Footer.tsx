"use client";

import { config } from "@/config/build-config";
import { LuRss } from "react-icons/lu";
import Link from "next/link";
import { FunctionComponent } from "react";
import { DarkModeToggle } from "./DarkModeToggle";
import { Button } from "@repo/ui/components/button";

export const Footer: FunctionComponent = () => {
    return (
        <section className="mt-8 md:mt-16 mb-12">
            <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                    © {config.blog.copyright} {new Date().getFullYear()}
                </div>
                <div className="text-xs text-muted-foreground hidden lg:block">
                    <h1>
                        Blog powered by nextjs
                    </h1>
                </div>
                <div>
                    <Link href="/rss">
                        <Button variant="ghost" className="p-2">
                        <LuRss className="w-4 h-4" />
                        </Button>
                    </Link>
                    <DarkModeToggle />
                </div>
            </div>
            <div className="text-xs text-muted-foreground lg:hidden">
                <h1>
                    Blog powered by nextjs
                </h1>
            </div>
        </section>
    );
};